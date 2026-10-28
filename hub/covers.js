// Renders a cover screenshot of each game (UI hidden) into hub/covers/
const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
(async()=>{const b=await chromium.launch();
const jobs=[
 ['monster',path.join(ROOT,'games/monster-kitchen.html'),'.topbar{display:none!important}',1400],
 ['plassen',path.join(ROOT,'games/plassen-springer.html'),'.title,.hud{display:none!important}',2600],
 ['meteorieten',path.join(ROOT,'games/meteorietenregen.html'),'.title,.hud{display:none!important}',5200],
 ['eendjes',path.join(ROOT,'games/eendjes-vissen.html'),'.title,.hud{display:none!important}',1500],
 ['plasticsoep',path.join(ROOT,'games/plasticsoep-opruimer.html'),'.title,.hud,.count{display:none!important}',4500],
 // optional 5th item: taps to play before the screenshot
 ['fruit',path.join(ROOT,'games/fruit-fabriek.html'),'.title,.hud{display:none!important}',2000,
  async p=>{ // start, then fill the box with as many fruits as its number (read from the canvas label), up to 4
    await p.mouse.click(520,90);
    const n=Math.min(4,Number(((await p.getAttribute('#game','aria-label')).match(/\((\d+)\)\./)||[])[1]||3));
    for(let i=0;i<n;i++){ await p.mouse.click(520,90); await p.waitForTimeout(200); }
    await p.waitForTimeout(500); }],
];
for(const [id,file,css,wait,act] of jobs){
  const p=await b.newPage({viewport:{width:640,height:480}});
  await p.goto('file://'+file); await p.addStyleTag({content:css}); await p.waitForTimeout(wait);
  if(act) await act(p);
  await p.screenshot({path:path.join(ROOT,'hub/covers',id+'.jpg'),type:'jpeg',quality:82}); await p.close();
}
await b.close();})();
