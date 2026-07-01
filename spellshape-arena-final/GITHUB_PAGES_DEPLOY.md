# GitHub Pages deployment

Yes — this version can work from GitHub Pages because online multiplayer uses the public relay `https://ntfy.sh` from inside the browser.

## Steps

1. Create a GitHub repository.
2. Upload at least these files:
   - `index.html`
   - `README.md`
   - `DIRECT_ONLINE.md`
   - `SHARE_WITH_FRIEND.md`
3. Go to repository **Settings → Pages**.
4. Set source to your main branch and root folder.
5. Open the GitHub Pages URL, for example:

```text
https://your-username.github.io/your-repo/
```

6. Your friend opens the same GitHub Pages URL.
7. Host: **Menu → Realtime Online → Create Room**.
8. Friend: **Menu → Realtime Online → Join Room** with the code.

## Important

Do not send an `ntfy.sh/...` URL as the game link. `ntfy.sh` is only the relay. Send either:

- the GitHub Pages game URL, and
- the room code.

Example:

```text
Game: https://your-username.github.io/spellshape-arena/
Room: 3GAG
```

## Privacy note

The public relay is fine for prototype testing but not for a production ranked game. For production, use your own backend server.

## Online lobby checklist

After hosting on GitHub Pages:

1. Host creates room and sees a room code.
2. Friend opens the same GitHub Pages URL, not ntfy.sh.
3. Friend joins using only the code.
4. Host should see Player 2 connected in Lobby Status.
5. Host starts the match.

If host does not see Player 2, create a fresh room code and make sure both players are using the newest deployed page.
