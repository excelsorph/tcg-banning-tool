# TCG Banning Tool

A lightweight deck declaration + simultaneous ban tool built for competitive TCGs.

## Features
- 2 players join using a room code
- Each player selects 3 deck colors (Blue, Red, Yellow, Black, Green)
- Players simultaneously choose 1 ban from opponent’s 3 decks
- Ban results reveal automatically when both players lock in

## How to Use
1. Replace the Firebase config in `index.html`.
2. Push repo to GitHub.
3. Enable GitHub Pages (Settings → Pages → Deploy from Branch → `main`).
4. Open your public URL and use the tool!

## Notes
- No backend needed, only Firebase Realtime DB.
- Works embedded in Notion using an iframe embed.
