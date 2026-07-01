# SpellShape Arena

2.5D rune drawing multiplayer duel game with direct online room play, AI battles, rapid mode, continuous mode, and unique spell combos.

## Direct online multiplayer

This version can work from a static host like **GitHub Pages** because it uses `https://ntfy.sh` as a public browser relay.

1. Both players open the same game page, for example your GitHub Pages URL.
2. Menu → Realtime Online.
3. Keep relay as `https://ntfy.sh`.
4. Host creates a room and sends the room code.
5. Friend enters the room code and joins.
6. Host starts Turn, Rapid, or Continuous mode.

Do **not** open `https://ntfy.sh/...` as the game. It is only the relay.

## New combo system

Cast matching rune pairs back-to-back with the same fighter to trigger bonus combo magic:

- Circle + Zigzag = Flame Tornado
- Line + Square = Sanctuary Wall
- Spiral + Triangle = Storm Blizzard
- Chevron + Hook = Void Reaper
- Wave + Slash = Tsunami Blade

Combos work in both orders.

## Included files

- `index.html` — full browser game, direct online client, UI, spells, animations, combos
- `DIRECT_ONLINE.md` — no-setup online guide
- `GITHUB_PAGES_DEPLOY.md` — GitHub Pages instructions
- `SHARE_WITH_FRIEND.md` — sharing guide
- `server.js` — optional private room server if you want to host your own relay later
- `package.json` — optional Node start script
- `render.yaml` — optional Render deployment config

## Optional private server

If you do not want to use the public relay, run your own server:

```bash
npm install
npm start
```

Open:

```text
http://localhost:3000
```
