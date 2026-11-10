// Genera el CV en PDF con Chrome headless.
// Uso (con un servidor local en la carpeta del proyecto, p. ej. `python3 -m http.server 8000`):
//   node tools/generate-pdf.mjs "http://localhost:8000/cv-print.html?lang=es" assets/docs/Yeffry-Rodriguez-CV-ES.pdf
//   node tools/generate-pdf.mjs "http://localhost:8000/cv-print.html?lang=en" assets/docs/Yeffry-Rodriguez-CV-EN.pdf
import { spawn } from 'node:child_process'; import fs from 'node:fs';
const [,, url, out] = process.argv; const port = 9471;
const prof = out + '.prof';
const c = spawn('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',['--headless=new','--disable-gpu',`--remote-debugging-port=${port}`,`--user-data-dir=${prof}`,'about:blank']);
await new Promise(r=>setTimeout(r,3000));
const t=(await (await fetch(`http://127.0.0.1:${port}/json`)).json()).find(x=>x.type==='page');
const ws=new WebSocket(t.webSocketDebuggerUrl); await new Promise(r=>ws.onopen=r);
let id=0;const p={};const errs=[];ws.onmessage=e=>{const m=JSON.parse(e.data);if(m.id&&p[m.id]){p[m.id](m);delete p[m.id];}if(m.method==='Runtime.exceptionThrown')errs.push(m.params.exceptionDetails.exception?.description);};
const send=(method,params={})=>new Promise(r=>{const i=++id;p[i]=r;ws.send(JSON.stringify({id:i,method,params}));});
await send('Runtime.enable'); await send('Page.enable');
await send('Page.navigate',{url}); await new Promise(r=>setTimeout(r,3500));
await send('Runtime.evaluate',{expression:'document.fonts.ready',awaitPromise:true});
const r = await send('Page.printToPDF',{printBackground:true,preferCSSPageSize:true,marginTop:0,marginBottom:0,marginLeft:0,marginRight:0});
if (!r.result) { console.log('print error', JSON.stringify(r.error)); } else fs.writeFileSync(out, Buffer.from(r.result.data,'base64'));
console.log("OK:", out, errs.length ? errs : "");
fs.rmSync(prof, { recursive: true, force: true, maxRetries: 5 });
ws.close(); c.kill();
