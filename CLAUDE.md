# Speelhoek – kids' minigames

Small browser games for my kids (around 5 years old, Flemish), bundled in one menu page called **Speelhoek**. My son sometimes draws the characters himself; those drawings are the spec for how a character looks.

Game ideas with ready-made prompts live in `docs/game-ideas.md`. When I ask for a game from that list, read its entry there first.

## Project layout

- `games/<id>.html` – one game per file, fully self-contained
- `hub/speelhoek.template.html` – the menu page (`__GAMES__` is filled in by the build)
- `hub/build.py` – bundles all games + covers + embedded fonts into the web app in `site/` (`index.html`, manifest, service worker, icons)
- `hub/covers.js` – Playwright script that screenshots each game (UI hidden) into `hub/covers/<id>.jpg`
- `hub/icons.js` – Playwright script that renders the home-screen icons into `hub/icons/`
- `hub/sw.js`, `hub/manifest.webmanifest` – service worker (offline copy) and web app manifest, copied into `site/` by the build
- `hub/fonts/` – the font files (+ OFL licenses) that the build embeds, so the hub needs no Google Fonts
- `site/` – the built web app (generated, git-ignored, don't edit by hand)
- `.github/workflows/pages.yml` – on every push to `main`, GitHub Actions runs the build and publishes `site/` to GitHub Pages
- `docs/game-ideas.md` – backlog of game ideas and their prompts

## Tech rules (keep these unless I say otherwise)

- One self-contained HTML file per game: HTML + CSS + plain JavaScript. No frameworks, no build step, no npm packages in the games.
- Graphics are drawn in code: Canvas 2D (or WebGL only if a game truly needs it). No image or audio files.
- Sounds are synthesized with the Web Audio API (oscillators, filtered noise, gain envelopes).
- Only external resource allowed: Google Fonts (with a fallback font stack).
- Use a `requestAnimationFrame` loop with `dt` capped at 0.05 s, so a backgrounded tab doesn't make things jump.
- Must work with touch, mouse and keyboard, on an iPhone (portrait), an iPad (both orientations) and a laptop. Resize live.
- Respect `prefers-reduced-motion` (tone down shaking and wobbling).

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

Every game has a sound on/off button (top-right).

## Design rules for a 5-year-old

- **No game over, no losing, no timers that punish.** Mistakes get a funny or gentle reaction, never a fail screen.
- **No reading required.** Use icons, numbers, dots, sounds and animation. Any on-screen text is short and in Dutch (Flemish), for the parent.
- Big tap targets (at least 60 px), simple gestures (tap, swipe, drag). No precise timing, no two-finger gestures.
- Constant, playful feedback: every tap does something visible and audible.
- A score or counter is fine if the game asks for it, but it only ever goes up.
- No ads, no links out of the game, no in-app anything.
- Short title card on start ("Tik om te beginnen"), which fades out on the first input.
- **Keep the top-left corner free (about 76 × 70 px):** the Speelhoek menu puts its round home button there.

## Visual style

Pick one per game (the game idea usually says which):

1. **Vector cartoon** (like `monster-kitchen.html`): thick dark ink outlines (`#3b2340`), flat bright fills, soft highlights, wobbly idle animation, round buttons with an ink border and a hard drop shadow, font Baloo 2.
2. **Pixel art** (like `plassen-springer.html`): draw into a small low-res canvas and scale it up with smoothing off. Hand-typed sprite grids (one letter = one color), outline `#2b1d2e`, square buttons with a hard shadow, font Press Start 2P.

Turning a child's drawing into a character: copy its features faithfully (number of eyes, horns, mouth shape, proportions) and the colors I give. Redraw it cleanly in the chosen style, and keep it animatable (blinking, expressions, moving parts).

## Adding a new game – checklist

1. Create `games/<id>.html` as a full HTML document (`<!doctype html>`, `<head>` with charset, viewport `width=device-width,initial-scale=1,viewport-fit=cover`, `<title>`, `<body>`).
2. Register it in `hub/build.py` (`games` list: id, Dutch title, file, optional extra CSS) and in `hub/covers.js` (`jobs` list, with CSS that hides the title card and buttons for the cover shot).
3. Test with Playwright (headless Chromium) at 390×844 (phone portrait), 1024×768 (tablet) and 1280×800 (laptop): take screenshots, simulate a few taps/keys, and check there are no console errors. Look at the screenshots before calling it done.
4. Run `node hub/covers.js` and then `python3 hub/build.py` (on this Windows machine: `python`). Playwright comes from `npm install` (see `package.json`).
5. Tell me in a few lines what the game does and what I should try on the iPad.

## Known housekeeping

- Speelhoek is an installable offline web app on GitHub Pages. Publishing = commit + push to `main`; the iPad picks up the new version the next time the app opens with internet.
