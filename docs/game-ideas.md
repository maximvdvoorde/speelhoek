# Game ideas

Backlog of games for Speelhoek. Each entry has the idea and a prompt to start a Claude Code session with. The general rules (tech, design for a 5-year-old, checklist) are in `CLAUDE.md`, so the prompts only describe what is specific to each game.

Status: ⬜ idea · 🟨 in progress · ✅ in Speelhoek (published)

When a game is done, set its status to ✅ here. The prompts of finished games stay as a record of what was asked.

| Game | Style | Status |
|---|---|---|
| Monster Kitchen | vector | ✅ |
| Plassen Springer | pixel art | ✅ |
| Meteorietenregen | vector (space) | ✅ |
| Plasticsoep Opruimer | vector | ✅ |
| Fruit Fabriek | vector | ✅ |
| Eendjes Vissen | vector | ✅ |
| Vogelnestje | vector | ✅ |
| Klankenjacht | paper cut-out | ✅ |
| Patronentrein | wooden toy | ✅ |

---

## 1. Meteorietenregen

**Idea:** a 3D scroller in space with the perspective of the Star Wars opening text: the playing field is a plane tilted back that disappears toward the horizon. The player is a rocket at the bottom of the screen that dodges meteorites coming from far away, by swiping left or right.

**Prompt:**

```
Read CLAUDE.md, then build a new game: games/meteorietenregen.html, Dutch title "Meteorietenregen".

Concept: a space game with the perspective of the Star Wars opening crawl. The playing field is a plane tilted back toward a horizon high on the screen, over a starry space background. A cute cartoon rocket sits near the bottom. Meteorites appear tiny at the horizon and come toward the player, growing as they approach, along that tilted plane.

Controls: swipe left/right on touch, arrow keys or A/D on keyboard, click-and-drag with the mouse. Use 3 lanes (the rocket hops smoothly between them), because that is easier for a 5-year-old than free steering.

Rules:
- No game over. Hitting a meteorite makes the rocket wobble with a "bonk", a shield bubble flashes and the meteorite crumbles into pebbles. No lives, no penalty.
- Add collectible shiny stars in the lanes as the positive goal. A star counter (icon + number) only goes up.
- Start slow, speed up very gently over time, and cap the maximum speed low.

Visual style: vector cartoon (see CLAUDE.md), dark blue/purple space, colorful planets drifting far away, flame flicker on the rocket, speed lines. Do the perspective projection yourself in Canvas 2D (no libraries): world z maps to screen y and scale, with lane lines converging at a vanishing point.

Sound: soft space hum, whoosh on lane change, cheerful "pling" for a star, a soft bonk on a hit.

Follow the "Adding a new game" checklist in CLAUDE.md.
```

---

## 2. Plasticsoep Opruimer

**Idea:** mechanics like Flappy Bird. The player is a garbage-collecting submarine that catches plastic floating through the ocean. Every piece of plastic is a point, and the player can't die.

**Prompt:**

```
Read CLAUDE.md, then build a new game: games/plasticsoep-opruimer.html, Dutch title "Plasticsoep Opruimer".

Concept: side-scrolling ocean. The player is a friendly yellow garbage-collecting submarine with a big net or grabber at the front. Tap / click / space gives it an upward push; otherwise it slowly sinks (Flappy Bird mechanics, but much more forgiving: gentle gravity, gentle push, heavy water damping).

Plastic floats in from the right at different depths: bottles, bags, straws, cans, a lost flip-flop. Touching one with the submarine catches it: it gets sucked into the net with a pop, and the counter (icon + number, top center) goes up by one.

Rules:
- The player cannot die. The sea floor and the surface are soft bounces, with bubbles and a giggle.
- Sea creatures (fish, turtle, jellyfish, octopus) also swim by. They are never caught: they wiggle out of the way, or swim around the submarine with a happy sound. This teaches the difference without punishment.
- Make the ocean visibly cleaner as the count rises: murky green-gray water slowly turns clear blue, and more fish and coral appear. Celebrate every 10 pieces with a small fanfare and bubbles.

Visual style: vector cartoon (or pixel art if that turns out nicer, show me one screenshot of each first). Parallax layers: light rays from the surface, distant rocks, seaweed swaying, sandy floor.

Sound: bubbly underwater ambience, "blub" on each push, satisfying "slurp-pop" when catching plastic, fanfare at milestones.

Follow the "Adding a new game" checklist in CLAUDE.md.
```

---

## 3. Fruit Fabriek

**Idea:** a conveyor belt carries boxes. Each box stops in the middle of the screen with a number from 1 to 10 on it. The player fills the box with the right number of fruits by tapping the screen, then pushes a "next" button on the machine. Visual feedback shows whether the number was right.

**Prompt:**

```
Read CLAUDE.md, then build a new game: games/fruit-fabriek.html, Dutch title "Fruit Fabriek". This is a counting game for a 5-year-old.

Concept: a cheerful fruit factory. A conveyor belt runs across the screen. A cardboard box rides in from the left and stops in the middle, under a fruit machine with a chute. Each box shows a number from 1 to 10, both as a big digit and as a dot pattern (like dice / ten-frame), because the player may not read numbers reliably yet.

Controls:
- Tap anywhere on the play area (or space): the machine drops one fruit into the box, with a nice falling and bouncing animation. Use mixed fruits (apple, pear, banana, strawberry, orange, cherries).
- Tap a fruit in the box to take it out again, so mistakes can be fixed.
- A big green "klaar" (done) button on the machine sends the box on its way. Use an icon (check mark / arrow), no text needed.

Feedback:
- Count out loud as fruits drop, using the Web Speech API in Dutch (prefer an nl-BE voice, fall back to nl-NL, and if no voice exists just show the count). Also show the current count big on the box.
- Correct: the box closes its flaps, gets a star sticker, confetti, a happy jingle, and rolls off to the right. A shelf at the top collects a small trophy box for each correct one.
- Not correct: no buzzer and no red X. The machine shows a friendly face and gently helps: "too many" shows the extra fruits wobbling, "too few" shows empty ghost slots blinking. The box stays so the player can fix it and press done again.

Difficulty: start with numbers 1 to 5. After a run of correct boxes, slowly include up to 10. Never go back to a harder level after a mistake streak; instead drift easier.

Visual style: vector cartoon, factory with pipes, gauges, little lights that blink when fruit drops, belt rollers turning.

Sound: machine whirr, "plop" per fruit, counting voice, success jingle, gentle "hmm?" when not correct.

Follow the "Adding a new game" checklist in CLAUDE.md.
```

---

## 4. Eendjes Vissen

**Idea:** like the duck-fishing stall at the kermis (funfair). Little ducks with hooks on their heads float past, and the player catches them with a fishing rod (stick, rope and hook).

**Prompt:**

```
Read CLAUDE.md, then build a new game: games/eendjes-vissen.html, Dutch title "Eendjes Vissen".

Concept: the classic kermis duck-fishing stall. Seen from the front: a colorful stall with a striped roof, light bulbs that blink, a water channel where yellow rubber ducks (and a few special colored ones) float past from left to right in a loop. Each duck has a small ring on top of its head.

Controls (must work for a 5-year-old):
- The fishing rod (a wooden stick with a rope and hook) follows the finger or mouse horizontally across the top of the water.
- Touch-down / click / space: the hook drops down. Release or the next tap: it pulls up.
- If the hook is near a duck's ring when it goes down, it catches it. Be generous with the catch zone.
- Keyboard: arrow keys move the rod, space drops/raises the hook.

Rules and feedback:
- A caught duck dangles from the hook while being lifted, quacks, and flips over to reveal a symbol on its bottom (star, heart, moon, flower, or a color). The symbol decides the prize: a toy appears on the prize shelf at the back of the stall (teddy, ball, balloon, pinwheel, plastic sword...). The shelf fills up over time.
- Missing does nothing bad: the hook splashes a little and the ducks paddle on.
- After catching, the duck is put back into the water further upstream, so the stream never runs out.

Visual style: vector cartoon, warm funfair evening colors with string lights, water ripples, ducks bobbing.

Sound: fairground organ loop (simple synthesized melody, quiet, with its own mute via the sound button), water splash when the hook drops, quack when caught, prize "ta-da".

Follow the "Adding a new game" checklist in CLAUDE.md.
```

---

## 5. Vogelnestje

**Idea (from my son):** the player collects twigs for a little bird that wants to build its nest. When the nest is finished, eggs appear. When the chicks have hatched, the player collects worms to feed them. The game mechanics are still open.

Possible mechanics to discuss with him:

- **A. Tap where the bird should fly:** twigs lie in the grass and the bushes. Tap one, the bird flies there, picks it up and brings it to the nest. The easiest option for a 5-year-old.
- **B. Steer the bird yourself:** drag your finger and the bird follows it. Fly over a twig to grab it, and fly back to the nest to drop it. More of a "flying" feeling, but harder.
- **C. Flappy-style flight:** tap to flap, like Plasticsoep Opruimer. Probably too similar to that game.

**Chosen: B** (the bird follows the finger), with the bird's colours in one palette (`PAL`) so a drawing can replace it later. Round: 8 twigs, sit on 3 eggs to hatch them, 2 worms per chick, the chicks fly away (the counter goes up), night, then a new nest in the next season with the tree on the other side.

Phases: (1) twigs, with the nest visibly growing per twig, (2) eggs appear and must be kept warm or hatch with a tap-tap-crack, (3) hungry chicks open their beaks and the player brings worms that wiggle out of the ground after a tap on a molehill or puddle. Then (4) a new day with a new nest in another tree? Or the chicks grow up and fly away?

**Prompt (plan first, because the mechanics are open):**

```
Read CLAUDE.md. I want to make a new game with my son: games/vogelnestje.html, Dutch title "Vogelnestje". It is his own idea and the mechanics are not decided yet, so don't build anything yet.

His idea: the player collects twigs for a little bird that wants to build a nest. When the nest is finished, eggs appear in it. When the chicks have hatched, the player has to collect worms to feed them.

First, propose 2-3 concrete ways to play it for a 5-year-old, each in a few lines (controls, what happens per phase, what makes it fun, how it ends or loops). Some starting points are in docs/game-ideas.md under "Vogelnestje". Also suggest a visual style (vector or pixel art). Keep the choices simple enough that I can read them aloud to him. He may also draw the bird; if I attach a drawing, use it as the character design.

After we choose, build it and follow the "Adding a new game" checklist in CLAUDE.md.
```

---
 
## 6. Klankenjacht
 
**Idea:** a friendly owl says a sound, and the kid taps the pictures that start with that sound. This trains first-sound awareness, the step before learning to read.
**Style:** paper cut-out (see CLAUDE.md). The pictures must be instantly recognizable, so this needs clear, simple shapes rather than chunky pixels.
 
**Prompt:**
 
```
Read CLAUDE.md, then build a new educational game: games/klankenjacht.html, Dutch title "Klankenjacht". It trains first-sound awareness (beginklank) for a 5-year-old in Flanders.
 
Concept: an owl sits on a branch in a forest at dusk. Around it, 6 picture cards hang on strings or lie on mossy stones. The owl says a sound and an example word, then the kid taps every picture that starts with that sound. 2 or 3 of the 6 cards are correct.
 
Speech: use the Web Speech API in Dutch (prefer an nl-BE voice, fall back to nl-NL). Isolated consonants are hard for speech engines, so let the owl say a stretched example instead: "Ik zoek woorden met mmm... zoals mmmaan!". Tapping any card says its word out loud. Add a big "luister nog eens" (owl/ear icon) button to repeat. If no Dutch voice is available, show the letter big next to the owl as a fallback, and tell me in your summary.
 
Word lists: start with sounds you can hold ("zingende klanken"), because they are easiest: m, s, v, r, l, f, n, z. Later add k, p, t, b. Use only nouns that are easy to draw and unambiguous in Flemish Dutch, for example:
- m: maan, muis, mes, melk
- s: sok, ster, slak, sla
- v: vis, vos, vlag, voet
- r: raket, ring, roos, regen
- k: kat, koe, kip, kaas
Make a data table so I can add words easily. Avoid words with confusing first sounds (no "sch", "ch", "g/ch").
 
Rules: a correct tap makes the card flutter into the owl's basket with a hoot and a sparkle. A wrong tap makes the card wiggle while the owl says the word slowly ("vvvis... begint met vvv"). No penalty. When all correct cards are found, the owl does a happy dance and a new round starts with a new sound.
 
Visual style: paper cut-out (see CLAUDE.md): layered paper trees, a paper moon, a slightly torn-edge look, soft drop shadows between layers, and gently swaying paper leaves. The picture cards are drawn in code in the same paper style.
 
Sound: soft forest ambience, owl hoot, paper rustle on taps, happy jingle per round.
 
Follow the "Adding a new game" checklist in CLAUDE.md.
```
 
---
 
## 7. Patronentrein
 
**Idea:** a train with wagons in a pattern (red-blue-red-blue-?), and the kid drags the right wagon into the gap. This trains logical thinking.
**Style:** wooden toy, like painted wooden train sets. Pixel art would also work, but the wooden look suits a "toy" logic game and gives variation.
 
**Prompt:**
 
```
Read CLAUDE.md, then build a new educational game: games/patronentrein.html, Dutch title "Patronentrein". It trains recognizing and continuing patterns for a 5-year-old.
 
Concept: a wooden toy train stands on a wooden track across the screen. Its wagons carry blocks that form a pattern, with one or two wagons empty (shown as a dashed outline). Below, a toy box offers 3-4 candidate blocks. The kid drags the right block onto the empty wagon. When the pattern is complete, the train toots, the wheels turn and it chugs off screen, and a new train arrives.
 
Difficulty, increasing slowly and dropping back after a few mistakes:
1. AB patterns with color only (red-blue-red-blue-?)
2. AB with shape only (circle-square-circle-?)
3. AAB and ABB patterns
4. ABC patterns
5. Patterns where both color and shape matter
6. The gap in the middle instead of at the end
 
Rules: dropping the wrong block makes it bounce back to the toy box with a wooden "tok" and a short wobble. No penalty. Tapping the empty wagon gives a hint: the pattern blocks light up one by one with a little note each (do-re-do-re-...), so the kid can hear the pattern too.
 
Dragging: works with touch and mouse, with big blocks. The block snaps into the wagon when dropped close enough (generous snap zone). Keyboard: arrow keys to choose a candidate, space to place it.
 
Visual style: wooden toy (see CLAUDE.md): painted wood with visible grain, rounded edges, slightly worn paint, bright primary colors, chunky wheels with wooden pegs, a play mat or wooden floor background.
 
Sound: wooden clacks, a "choo-choo" toot, a short melody that matches the pattern.
 
Follow the "Adding a new game" checklist in CLAUDE.md.
```
 
---
 
## 8. Krokodil Smikkel
 
**Idea:** two piles of fish, and the crocodile always wants the bigger pile. The kid turns its mouth toward the pile with more. This trains comparing amounts ("more or less") and number sense.
**Style:** chalkboard, like a drawing on the school blackboard. It makes a nice "school" link, and counting objects stays clear in colored chalk.
 
**Prompt:**
 
```
Read CLAUDE.md, then build a new educational game: games/krokodil-smikkel.html, Dutch title "Krokodil Smikkel". It trains comparing quantities (meer / minder / evenveel) for a 5-year-old.
 
Concept: a big green crocodile sits in the middle of a chalkboard. On the left and right are two piles of fish (1 to 10 each). The crocodile is greedy and always wants the bigger pile. The kid taps or swipes to turn its open mouth toward the side with more fish, then it chomps the whole pile with a big "SMIKKEL!".
 
Levels:
1. Small amounts (1-5) with a big difference
2. Amounts 1-10, with the difference getting smaller
3. Fish arranged messily, so the kid really has to count instead of comparing pile size
4. One side shows a number instead of fish (a digit plus a dot pattern), then both sides are digits
5. Sometimes both piles are equal: then the kid presses the middle button (a "=" sign / two equal fish icon), and the crocodile gets confused and eats both politely
 
Rules: choosing the smaller pile makes the crocodile pause, count both piles out loud slowly (speech in Dutch, nl-BE preferred, plus the fish lighting up one by one), and then turn by itself to the right side. No penalty. A tummy meter fills up; when full, the crocodile takes a nap with snoring "Zzz" and a new round begins.
 
Visual style: chalkboard (see CLAUDE.md): dark green-black board, colored chalk lines with slightly rough edges, chalk dust when things appear, a wooden frame around the board, chalk numbers drawn by hand (no font).
 
Sound: chalk squeak (very soft), crunchy chomp, burp, counting voice.
 
Follow the "Adding a new game" checklist in CLAUDE.md.
```
 
---
 
## 9. Afvalheld
 
**Idea:** trash falls onto a kitchen table and the kid drags each item to the right bin. Each bin "eats" what fits and spits out what doesn't. These are the real Belgian sorting rules, so the kid can help at home.
**Style:** vector cartoon. Items like a milk carton, a can and a banana peel have to be recognizable at a glance, which is harder in pixel art.
 
**Prompt:**
 
```
Read CLAUDE.md, then build a new educational game: games/afvalheld.html, Dutch title "Afvalheld". It teaches sorting household waste the way we do it in Flanders.
 
Concept: a cosy kitchen. Along the bottom stand 4 bins with faces, each recognizable by color and icon (no reading needed):
- PMD: the blue bag (plastic bottles and flasks, cans, drink cartons, yogurt pots, plastic foil)
- Papier en karton: a paper bin / cardboard box (newspaper, cardboard box, egg carton, drawing paper)
- GFT: the green bin (banana peel, apple core, egg shells, potato peel, coffee grounds, leaves)
- Restafval: the grey bin (diaper, broken toy, chips bag, vacuum cleaner bag)
Put all the item rules in one data table, because the rules differ a bit between municipalities and I may want to adjust them.
 
Gameplay: one item at a time drops onto the table with a little bounce. The kid drags it to a bin. Big items, generous drop zones, and keyboard support (arrow keys to choose a bin, space to throw).
 
Rules:
- Right bin: the bin opens its lid, gobbles the item with a happy "nom", and a heart floats up. A counter (a little hero medal icon plus a number) goes up.
- Wrong bin: the bin makes a funny face, spits the item back onto the table with a "bleh" and points with its eyes at the right bin. No penalty.
- Every 10 items, the bins dance and a garbage truck drives by to empty them with a honk.
- Optional later: a glass bottle bank and a "kringloop" (second-hand) box for toys that still work.
 
Visual style: vector cartoon (see CLAUDE.md), like Monster Kitchen: thick outlines, cheerful kitchen, the bins as characters.
 
Sound: lid creak, nom sounds, "bleh", the garbage truck engine and honk.
 
Follow the "Adding a new game" checklist in CLAUDE.md.
```
 
---
 
## 10. Mol zoekt huis
 
**Idea:** a mole is underground and has to get home. The kid draws a path with a finger around rocks and roots, and the mole follows it. This trains planning and fine motor skills.
**Style:** pixel art. An underground world made of tiles suits pixel art well, and drawing a path from tile to tile keeps it simple and clear.
 
**Prompt:**
 
```
Read CLAUDE.md, then build a new educational game: games/mol-zoekt-huis.html, Dutch title "Mol zoekt huis". It trains planning a route and fine motor control for a 5-year-old.
 
Concept: a side view of the underground, made of pixel-art tiles: soft brown soil, grey rocks, tree roots, a few buried treasures (a button, a marble, an old key). On top: grass, flowers and a sky. The mole pops out of a molehill on one side. Its cozy home (a little round door with a lamp) is somewhere else underground.
 
Gameplay: the kid draws a tunnel with a finger or mouse, starting at the mole. The path snaps to the tile grid, so each touched soil tile is dug out (with a crumbly dig animation). Rocks and roots can't be dug: the path just doesn't continue through them, and they shake a little. When the tunnel connects to the home, the mole walks through it, waving, and goes inside. The lamp turns on and there is a little celebration.
- Worms sit in some soil tiles: digging through them lets the mole collect them on the way (a bonus, not required).
- An "undo" button removes the last part of the tunnel, and a "new" button starts the level over. No timer, no failing.
- Keyboard: arrow keys dig tile by tile from the mole.
 
Levels: start with an almost straight path, then add rocks to go around, then dead ends and choices, then two homes (pick one) or a friend to visit on the way. Generate levels randomly, but always make sure a path exists (check with a flood fill/BFS).
 
Visual style: pixel art (see CLAUDE.md), like Plassen Springer: low-res canvas scaled up crisp, hand-typed sprite grids for the mole (with tiny glasses), worms and the home door.
 
Sound: soft digging scrunch per tile, worm "slurp", little footsteps, a door creak and a cozy jingle when the mole gets home.
 
Follow the "Adding a new game" checklist in CLAUDE.md.
```
 
---
 
## Template for a new idea
 
```
Read CLAUDE.md, then build a new game: games/<id>.html, Dutch title "<title>".
 
Concept: <what you see, who the player is, what the goal is>
Controls: <tap / swipe / drag / keys>
Rules: <what happens on success, what happens on a "mistake" (always gentle), what goes up>
Visual style: <vector cartoon or pixel art, colors, setting>
Sound: <key sounds>
<Attach a drawing if my son made one: copy its features faithfully.>
 
Follow the "Adding a new game" checklist in CLAUDE.md.
```
 