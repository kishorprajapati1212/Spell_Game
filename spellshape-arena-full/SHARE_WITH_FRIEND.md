# How to play SpellShape Arena with a friend on another PC

## Easiest way — direct online, no local server

The game now uses a public internet relay for prototype multiplayer, so you do **not** need same LAN and you do **not** need to run `npm start`.

1. Both players open the game in a normal browser with internet access.
2. Host opens **Menu → Realtime Online**.
3. Keep relay/server field as:

```text
https://ntfy.sh
```

4. Host clicks **Create Room**.
5. Host sends the room code to friend. Do not send/open an ntfy.sh URL; ntfy.sh is only the relay.
6. Friend opens **Menu → Realtime Online**, enters room code, and clicks **Join Room**.
7. Host selects:
   - Turn-by-turn
   - Rapid simultaneous
   - Continuous realtime
8. Host clicks **Start Online Match**.

## If direct online fails

Some school/company networks may block the public relay. Try:

- another internet connection,
- a VPN/mobile hotspot,
- or deploy/run the optional private server.

## Optional private server

If you want your own relay instead of the public one:

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

For internet play with a private server, deploy the full Node project to Render/Railway/Fly.io/VPS.

## Modes

- **Turn-by-turn**: only one player can draw. UI says YOUR ACTION or OPPONENT ACTION.
- **Rapid simultaneous**: both players draw, then both spells fire together.
- **Continuous realtime**: both players can cast whenever cooldown is ready.

## Privacy note

The no-setup mode uses a public relay topic. It is fine for a prototype, but not secure/private enough for a production ranked game.

## Do not open ntfy.sh as the game

`https://ntfy.sh/...` is not the game website. It is only a public message relay used internally by the game. Both players must open the same `index.html` game file or the same hosted game page, then enter the same room code.
