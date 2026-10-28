# Game ideas

Backlog of games for Speelhoek. Each entry has the idea and a prompt to start a Claude Code session with. The general rules (tech, design for a 5-year-old, checklist) are in `CLAUDE.md`, so the prompts only describe what is specific to each game.

Status: ⬜ idea · 🟨 in progress · ✅ in Speelhoek (published)

When a game is done, set its status to ✅ here. The prompts of finished games stay as a record of what was asked.

| Game | Style | Status |
|---|---|---|
| Monster Kitchen | vector | ✅ |
| Plassen Springer | pixel art | ✅ |
| Meteorietenregen | vector (space) | ✅ |
| Plasticsoep Opruimer | vector or pixel art | ⬜ |
| Fruit Fabriek | vector | ⬜ |
| Eendjes Vissen | vector | ✅ |
| Vogelnestje | to decide | ⬜ (mechanics still open) |

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

Phases: (1) twigs, with the nest visibly growing per twig, (2) eggs appear and must be kept warm or hatch with a tap-tap-crack, (3) hungry chicks open their beaks and the player brings worms that wiggle out of the ground after a tap on a molehill or puddle. Then (4) a new day with a new nest in another tree? Or the chicks grow up and fly away?

**Prompt (plan first, because the mechanics are open):**

```
Read CLAUDE.md. I want to make a new game with my son: games/vogelnestje.html, Dutch title "Vogelnestje". It is his own idea and the mechanics are not decided yet, so don't build anything yet.

His idea: the player collects twigs for a little bird that wants to build a nest. When the nest is finished, eggs appear in it. When the chicks have hatched, the player has to collect worms to feed them.

First, propose 2-3 concrete ways to play it for a 5-year-old, each in a few lines (controls, what happens per phase, what makes it fun, how it ends or loops). Some starting points are in docs/game-ideas.md under "Vogelnestje". Also suggest a visual style (vector or pixel art). Keep the choices simple enough that I can read them aloud to him. He may also draw the bird; if I attach a drawing, use it as the character design.

After we choose, build it and follow the "Adding a new game" checklist in CLAUDE.md.
```

---

## Template for a new idea

Add new ideas as a numbered section above this one (idea + prompt), and a row in the table at the top.

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

## Template for changing an existing game

```
Read CLAUDE.md, then change games/<id>.html ("<title>"):
<what should change, and why: what my son did or didn't like>

Then test, rebuild and publish (steps 3–7 of the "Adding a new game" checklist in CLAUDE.md).
```
