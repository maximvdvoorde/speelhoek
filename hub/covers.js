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
 ['vogelnestje',path.join(ROOT,'games/vogelnestje.html'),'.title,.hud,.count{display:none!important}',800,
  async p=>{ // start, then sweep the mouse along the grass and up to the nest a few times, so the nest grows; end with a twig in the beak
    await p.mouse.click(320,240); await p.waitForTimeout(400);
    for(let r=0;r<4;r++){
      for(let x=40;x<=600;x+=28){ await p.mouse.move(x,395); await p.waitForTimeout(45); }
      await p.mouse.move(r<3?407:300,r<3?221:250,{steps:8}); await p.waitForTimeout(r<3?900:350);
    } }],
 ['klankenjacht',path.join(ROOT,'games/klankenjacht.html'),'.title,.hud,.listen{display:none!important}',500,
  async p=>{ await p.mouse.click(320,460); await p.waitForTimeout(1500); }], // start; the cards pop in
 ['patronentrein',path.join(ROOT,'games/patronentrein.html'),'.title,.hud{display:none!important}',3600], // the train arrives and the blocks pop into the toy box
];
for(const [id,file,css,wait,act] of jobs){
  const p=await b.newPage({viewport:{width:640,height:480}});
  await p.goto('file://'+file); await p.addStyleTag({content:css}); await p.waitForTimeout(wait);
  if(act) await act(p);
  await p.screenshot({path:path.join(ROOT,'hub/covers',id+'.jpg'),type:'jpeg',quality:82}); await p.close();
}
await b.close();})();
