# SpellShape Arena — Realtime Multiplayer Setup

The browser file alone can do VS AI and local 2-player. For a friend to play with you in real time from another browser/device, you need the included WebSocket server.

## Local same Wi-Fi test

1. Install Node.js.
2. Open this project folder in a terminal.
3. Run:

```bash
npm install
npm start
```

4. Open this on your computer:

```text
http://localhost:3000
```

5. To let a friend on the same Wi-Fi join, find your local IP address, for example `192.168.1.25`, and ask them to open:

```text
http://192.168.1.25:3000
```

6. In the game:
   - Host opens **Menu → Realtime Online → Create Room**.
   - Host shares the room code.
   - Friend opens **Join friend**, enters the room code, and joins.
   - Host selects the flow mode and clicks **Host Start Online Match**.

## Online over the internet

You must deploy the project to a Node.js host that supports WebSockets, for example Render, Railway, Fly.io, a VPS, or similar.

After deployment, use:

```text
https://your-domain.com
```

And in the WebSocket URL field use:

```text
wss://your-domain.com
```

Use `ws://` for local/non-secure testing and `wss://` for HTTPS deployment.

## Flow modes

### Turn-by-turn
Only the active player can draw. The center HUD says **YOUR ACTION** or **OPPONENT ACTION** online.

### Rapid simultaneous
Both players draw one spell. When both are ready, both attacks fire together.

### Continuous realtime
No strict turns. Each player can draw as soon as their cooldown is ready. This is the most realtime-feeling mode.

## Important notes

- Host is authoritative: the host browser resolves combat and syncs the state.
- Guest sends spell actions to the host.
- If the host disconnects, the room ends.
- This is a lightweight prototype server, not a ranked production backend.
