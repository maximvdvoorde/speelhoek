# Speelhoek – kids' minigames

Small browser games for my kids (around 5 years old, Flemish), bundled in one menu page called **Speelhoek**. It is published as an installable offline web app at https://maximvdvoorde.github.io/speelhoek/ (repo: https://github.com/maximvdvoorde/speelhoek) and lives on the iPad home screen. My son sometimes draws the characters himself; those drawings are the spec for how a character looks.

Game ideas with ready-made prompts live in `docs/game-ideas.md`. When I ask for a game from that list, read its entry there first.

## Project layout

- `games/<id>.html` – one game per file, fully self-contained (a full HTML document)
- `hub/speelhoek.template.html` – the menu page (`__FONT_CSS__` and `__GAMES__` are filled in by the build)
- `hub/build.py` – bundles all games + covers + embedded fonts into the web app in `site/` (`index.html`, manifest, service worker, icons). The `games` list here is the menu.
- `hub/covers.js` – Playwright script that screenshots each game (UI hidden) into `hub/covers/<id>.jpg`
- `hub/icons.js` – Playwright script that renders the home-screen icons into `hub/icons/` (only rerun if the icon design changes)
- `hub/sw.js`, `hub/manifest.webmanifest` – service worker (offline copy) and web app manifest, copied into `site/` by the build
- `hub/fonts/` – Baloo 2 and Press Start 2P (+ OFL licenses), embedded by the build so the hub needs no Google Fonts
- `site/` – the built web app (generated, git-ignored, don't edit by hand)
- `.github/workflows/pages.yml` – on every push to `main`, GitHub Actions runs `python3 hub/build.py` and publishes `site/` to GitHub Pages
- `package.json` – tooling only (Playwright for covers/icons/tests); the games use no packages
- `docs/game-ideas.md` – backlog of game ideas and their prompts

## Tech rules (keep these unless I say otherwise)

- One self-contained HTML file per game: HTML + CSS + plain JavaScript. No frameworks, no build step, no npm packages in the games.
- Graphics are drawn in code: Canvas 2D (or WebGL only if a game truly needs it). No image or audio files.
- Sounds are synthesized with the Web Audio API (oscillators, filtered noise, gain envelopes).
- Only external resource allowed: Google Fonts (with a fallback font stack). Use **Baloo 2** (weights 700–800) or **Press Start 2P**: those are embedded in the hub, so they work offline. A game opened on its own still loads them from Google Fonts; the build strips those `<link>` tags. Any other font would also need its woff2 in `hub/fonts/` and an entry in `font_css` in `build.py`, otherwise it falls back to a system font offline.
- Use a `requestAnimationFrame` loop with `dt` capped at 0.05 s, so a backgrounded tab doesn't make things jump.
- Must work with touch, mouse and keyboard, on an iPhone (portrait), an iPad (both orientations) and a laptop. Resize live.
- Respect `prefers-reduced-motion` (tone down shaking and wobbling).
- Good structure to start from: `games/eendjes-vissen.html` or `games/meteorietenregen.html` (full document head, title card, round sound button, sound helpers with a master gain, game loop, pointer + keyboard input).

### iPhone audio (copy into every game)

The silent switch and iOS autoplay rules otherwise mute the game:

```js
let AC=null;
function ac(){
  if(!AC){
    try{ if(navigator.audioSession) navigator.audioSession.type='playback'; }catch(e){}
    try{ AC=new (window.AudioContext||window.webkitAudioContext)(); }catch(e){ return null; }
    try{ const b=AC.createBuffer(1,1,22050), s=AC.createBufferSource(); s.buffer=b; s.connect(AC.destination); s.start(0); }catch(e){}
  }
  if(AC.state!=='running') AC.resume().catch(()=>{});
  return AC;
}
['touchend','click'].forEach(ev=>document.addEventListener(ev,()=>ac(),{passive:true}));
```

Every game has a sound on/off button (top-right, 60 px round). Route all sounds through one master gain node, so the button also silences looping sounds (music, hum), and turn the master down on `visibilitychange` when the page is hidden. Start background loops on the first input (title card tap), not on page load.

## Design rules for a 5-year-old

- **No game over, no losing, no timers that punish.** Mistakes get a funny or gentle reaction, never a fail screen.
- **No reading required.** Use icons, numbers, dots, sounds and animation. Any on-screen text is short and in Dutch (Flemish), for the parent.
- Big tap targets (at least 60 px), simple gestures (tap, swipe, drag). No precise timing, no two-finger gestures. Be generous with hit zones.
- Constant, playful feedback: every tap does something visible and audible.
- A score or counter is fine if the game asks for it, but it only ever goes up.
- No ads, no links out of the game, no in-app anything.
- Short title card on start ("Tik om te beginnen"), which fades out on the first input. The first input only starts the game; it doesn't also count as a move.
- **Keep the top-left corner free (about 76 × 70 px):** the Speelhoek menu puts its round home button there.

## Visual style

Pick one per game (the game idea usually says which):

1. **Vector cartoon** (like `monster-kitchen.html`, `meteorietenregen.html`, `eendjes-vissen.html`): thick dark ink outlines (`#3b2340`), flat bright fills, soft highlights, wobbly idle animation, round buttons with an ink border and a hard drop shadow, font Baloo 2.
2. **Pixel art** (like `plassen-springer.html`): draw into a small low-res canvas and scale it up with smoothing off. Hand-typed sprite grids (one letter = one color), outline `#2b1d2e`, square buttons with a hard shadow, font Press Start 2P.

Turning a child's drawing into a character: copy its features faithfully (number of eyes, horns, mouth shape, proportions) and the colors I give. Redraw it cleanly in the chosen style, and keep it animatable (blinking, expressions, moving parts).

## Adding a new game – checklist

1. Create `games/<id>.html` as a full HTML document (`<!doctype html>`, `<html lang="nl">`, `<head>` with charset, viewport `width=device-width,initial-scale=1,viewport-fit=cover`, `<title>`, `<body>`).
2. Register it in `hub/build.py` (`games` list: id, Dutch title, file, optional extra CSS) and in `hub/covers.js` (`jobs` list: CSS that hides the title card and buttons, and a wait in ms long enough for the scene to look lively). Menu titles longer than 14 characters get a smaller font automatically; a single long word also needs a soft hyphen in `build.py`, like `'Meteorieten­regen'`.
3. Test with Playwright (headless Chromium) at 390×844 (phone portrait), 1024×768 (tablet) and 1280×800 (laptop): open the game file directly, take screenshots, simulate taps/drags/keys, and check there are no console errors. To screenshot a specific moment (a hit, a catch, a prize), test a copy in the scratchpad that exposes internals on `window` via `sed`; never put test hooks in the real game. Look at the screenshots before calling it done.
4. Build: `npm install` (once per clone), `node hub/covers.js`, then `python3 hub/build.py`. Look at the new cover, and check the game opens from the menu in `site/index.html`.
5. Update the docs: the game list in `README.md`, and the status (✅) in the table in `docs/game-ideas.md`.
6. Publish: commit and push to `main`. GitHub Actions builds and deploys in about a minute. Check that the run succeeded (`curl -s https://api.github.com/repos/maximvdvoorde/speelhoek/actions/runs?per_page=1`) and that the live site loads.
7. Tell me in a few lines what the game does and what I should try on the iPad.

Changing an existing game: edit `games/<id>.html`, then do steps 3–7 (regenerate the cover only if the look changed).

## Publishing and environment

- Publishing = commit + push to `main`. The iPad picks up the new version the next time the app opens with internet; offline it keeps the last version. The service worker's cache version is a hash of the built page, so nothing has to be bumped by hand.
- Offline is tested by serving `site/` under a subfolder (like GitHub Pages: `python -m http.server` in a folder that contains `speelhoek/`), loading it once, then `context.setOffline(true)` in Playwright and reloading.
- This repo uses my personal git identity (`maximvdvoorde`, `maximvdvoorde@gmail.com`), set in the repo's local git config. Don't change it, and never use the global (work) identity here.
- Windows machine: `python3` is only the Microsoft Store stub, so use `python`. The `gh` CLI isn't installed; use the GitHub REST API with `curl` for read-only checks.
