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
];
for(const [id,file,css,wait] of jobs){
  const p=await b.newPage({viewport:{width:640,height:480}});
  await p.goto('file://'+file); await p.addStyleTag({content:css}); await p.waitForTimeout(wait);
  await p.screenshot({path:path.join(ROOT,'hub/covers',id+'.jpg'),type:'jpeg',quality:82}); await p.close();
}
await b.close();})();
