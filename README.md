# Snake

A small, self-contained Snake game that runs in the browser. No build step, no dependencies,
no network assets — everything lives in a single `index.html`.

## How to play

Open `index.html` in any modern browser (double-click it, or drag it into a browser window).
If you prefer serving it over HTTP, any static server works, for example:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

Press <kbd>Space</kbd> (or click **Play**) to start.

## Controls

| Keys | Action |
| --- | --- |
| Arrow keys or <kbd>W</kbd> <kbd>A</kbd> <kbd>S</kbd> <kbd>D</kbd> | Steer |
| <kbd>P</kbd> or <kbd>Esc</kbd> | Pause / resume |
| <kbd>Space</kbd> or <kbd>Enter</kbd> | Start, resume, restart |

## Rules

- Eat the glowing food to score 10 points and grow by one segment.
- Running into a wall or into your own body ends the game.
- Reversing straight back into yourself is ignored, so a mistimed key press won't kill you.
- The snake speeds up a little with every piece of food, up to a cap.
- Your high score is saved in `localStorage` and shown as **Best**.
