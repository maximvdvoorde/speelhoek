# Speelhoek

Small browser games for the kids, bundled in one menu page.

- Play: https://maximvdvoorde.github.io/speelhoek/ (installable, works offline)
- How we build games (rules, style, checklist): `CLAUDE.md`
- Backlog of game ideas with ready-made prompts: `docs/game-ideas.md`

## Folder layout

- `games/` – each game as one self-contained HTML file (HTML + CSS + plain JavaScript, Canvas 2D graphics, Web Audio sounds; no libraries)
  - `monster-kitchen.html` – feed hand-drawn monsters in a cooking pot (3 monsters, switch button)
  - `plassen-springer.html` – pixel-art puddle jumping on an endless rainy street
  - `meteorietenregen.html` – a rocket hops between 3 lanes on a tilted space plane, dodging meteorites and catching stars
  - `eendjes-vissen.html` – kermis duck fishing: hook rubber ducks, flip them over, and fill the prize shelves
  - `plasticsoep-opruimer.html` – a yellow submarine-garbage-truck swims up with each tap and gobbles up floating plastic with its mechanical mouth; the sea turns clear blue and fills with fish and coral as the count rises
  - `fruit-fabriek.html` – counting game: tap to drop fruit from a machine into the box on the conveyor belt until it matches the number, then press the green button (Dutch counting voice); after a run of right boxes, small sums and subtractions (up to 10) appear on the boxes; buttons top-right turn the voice and the sums off (remembered on the device)
  - `vogelnestje.html` – the bird follows your finger: fly twigs to the nest, sit on the eggs until they hatch, pull worms out of molehills to feed the chicks; then they fly away and a new nest starts in the next season
  - `klankenjacht.html` – first sounds (beginklank): in a paper forest at dusk, an owl says an example word ("Ik zoek woorden die beginnen zoals maan") while a sign under its branch shows the letter (capital, small and school script), and you tap the 2-3 picture cards that start with the same sound; holdable sounds (m, s, v, r, l, f, n, z) first, then k, p, t, b. Words and sounds are in the `SOUNDS` table at the top of the file
- `hub/speelhoek.template.html` – the menu page; `__FONT_CSS__` and `__GAMES__` are replaced by the build
- `hub/build.py` – bundles every game (plus covers and embedded fonts) into the web app in `site/`
- `hub/covers.js` – takes a cover screenshot of each game (needs Node + Playwright: `npm install`)
- `hub/icons.js` – renders the home-screen icons into `hub/icons/`
- `hub/sw.js`, `hub/manifest.webmanifest` – service worker and manifest that make it an installable offline app
- `hub/fonts/` – Baloo 2, Press Start 2P and Playwrite BE VLG (Flemish school script) (SIL Open Font License, see the OFL files)
- `hub/covers/` – the current cover images
- `.github/workflows/pages.yml` – builds and publishes `site/` to GitHub Pages on every push to `main`
- `docs/game-ideas.md` – game ideas and prompts
- `site/` – the built web app (git-ignored; GitHub Actions builds and publishes it to GitHub Pages)

## Notes

- Every game file is a full HTML document. The menu page passes it through unchanged, only injecting the embedded fonts and the game's extra CSS (from `build.py`) before `</head>` (see `SHELL` in the template).
- The game files load their fonts from Google Fonts when opened on their own. Inside the hub the build strips those links and embeds the fonts instead, so everything works offline.
- Offline: a service worker keeps the whole hub on the device after the first visit. When online, it checks for a new version for up to 3 seconds when the app opens.
- iPhone sound: the games set `navigator.audioSession.type = 'playback'` and unlock audio on the first tap, so the silent switch doesn't mute them.

## Adding a game

Start a Claude Code session with a prompt from `docs/game-ideas.md` (or its template); the full checklist is in `CLAUDE.md`. In short:

1. Put the new game in `games/`.
2. Add an entry to the `games` list in `hub/build.py` (id, title, file, optional extra CSS) and to the `jobs` list in `hub/covers.js`.
3. `npm install` (once), `node hub/covers.js`, then `python3 hub/build.py` (`python` on Windows) to rebuild `site/`.
4. Commit and push to `main`: GitHub Actions publishes it in about a minute.

## On the iPad

Open the GitHub Pages address in Safari, tap Share → Zet op beginscherm, and start it once while online. After that it works without internet.
