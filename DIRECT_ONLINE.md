# Direct Online Multiplayer — No Local Server Needed

SpellShape Arena now has a direct online room option using a public internet relay.

## How to use

1. Open `index.html` in a normal browser with internet access.
2. Go to **Menu → Realtime Online**.
3. Keep the relay field as:

```text
https://ntfy.sh
```

4. Host clicks **Create Room**.
5. Host sends the room code to the friend. Codes are now longer to avoid old relay messages. Do not send/open an ntfy.sh URL — ntfy.sh is only the relay, not the game page.
6. Friend opens the same game file/page, goes to **Realtime Online**, enters the room code, and clicks **Join Room**. The friend must open the game HTML/page, not `https://ntfy.sh/...`.
7. Host selects a mode and clicks **Start Online Match**.

## Modes

- **Turn-by-turn**: one player draws at a time.
- **Rapid simultaneous**: both players draw; attacks resolve together.
- **Continuous realtime**: both players can cast whenever cooldown is ready.

## Important notes

- This uses a public relay, so it does not need same LAN or local setup.
- Messages are not private/secure. Good for prototype/testing, not ranked production.
- If a school/company network blocks `ntfy.sh`, online mode may fail on that network.
- For a production game, use your own hosted backend instead of the public relay.

## Common mistake

If you open a URL like `https://ntfy.sh/...?...room=CODE`, you will only see the relay service, not the game. That is expected. Use `https://ntfy.sh` only in the Relay field inside the game. Share the room code, then both players join from the actual game page/file.

## Fixed lobby behavior

The host lobby now shows Player 1 and Player 2 status. When the friend joins, the host sees “Friend connected” and can start the match. The guest lobby shows that they joined and should wait for the host to start.
