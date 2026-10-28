// Renders the home-screen icons into hub/icons/ (the menu's yellow dotted wall with its big round play button)
const { chromium } = require('playwright');
const path = require('path');
const ROOT = path.resolve(__dirname, '..');
// Everything important stays inside the middle 80%, so Android can crop it to any shape ("maskable").
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <defs><pattern id="d" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="5" fill="#ffc021"/></pattern></defs>
  <rect width="512" height="512" fill="#ffcf4a"/><rect width="512" height="512" fill="url(#d)"/>
  <circle cx="256" cy="268" r="150" fill="#3b2340"/>
  <circle cx="256" cy="252" r="150" fill="#ff7a59" stroke="#3b2340" stroke-width="16"/>
  <path d="M222 182v140l112-70z" fill="#fff8ec" stroke="#3b2340" stroke-width="16" stroke-linejoin="round"/>
  <path d="M150 196a120 120 0 0 1 60-62" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="16" stroke-linecap="round"/>
  <path d="M398 92l9 20 22 3-16 15 4 22-19-11-19 11 4-22-16-15 22-3z" fill="#fff8ec" stroke="#3b2340" stroke-width="7" stroke-linejoin="round"/>
  <path d="M106 384l6 13 15 2-11 10 3 15-13-8-13 8 3-15-11-10 15-2z" fill="#fff8ec" stroke="#3b2340" stroke-width="6" stroke-linejoin="round"/>
</svg>`;
(async()=>{const b=await chromium.launch();
for(const [name,size] of [['icon-512',512],['icon-192',192],['apple-touch-icon',180]]){
  const p=await b.newPage({viewport:{width:size,height:size}});
  await p.setContent(`<style>html,body{margin:0}svg{display:block;width:${size}px;height:${size}px}</style>${SVG}`);
  await p.screenshot({path:path.join(ROOT,'hub/icons',name+'.png')}); await p.close();
}
await b.close();})();
