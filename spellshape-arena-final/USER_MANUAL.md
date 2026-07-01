# SpellShape Arena — User Manual

## Game modes

### VS AI
You control Player 1 and fight the AI Warlock.

### Local 2 Players
Two people play on the same device. Player 1 draws on their turn, then Player 2 draws on their turn.

### AI vs AI
Both fighters are AI. This is useful for watching the battle and checking balance.

> Note: True online multiplayer needs a backend server/WebSocket system. This current build is a complete single-file browser game with local multiplayer and AI.

## How to play

1. Open the game menu.
2. Choose a mode.
3. On your turn, draw a rune in the casting circle.
4. Release mouse/finger/stylus to cast.
5. If you do not have enough mana, press **Rest / Skip**.
6. Reduce the opponent HP to zero to win.

## Rune spellbook

| Rune | Draw shape | Spell | Effect |
|---|---|---|---|
| ○ | Circle | Fireball | Damage + burn |
| △ | Triangle | Thunder Lance | Damage + stun chance |
| 〰 | Zigzag | Wind Slash | Damage + evade |
| □ | Square | Stone Guard | Shield + counter |
| │ | Vertical line | Life Stream | Heal + regen chance |
| ◎ | Spiral | Frost Coil | Damage + slow |
| ∨ | V shape | Shadow Fang | Lifesteal |
| ╱ | Diagonal slash | Solar Cut | Pierces shield |
| ≈ | Wave | Tide Wave | Damage + mana drain |
| ↄ | Hook/C shape | Void Hook | Breaks shield |

## Drawing tips

- Draw one continuous stroke.
- Draw large and clean shapes inside the circle.
- Release only after finishing the rune.
- Accuracy affects spell power and mana efficiency.

## Performance choices

The game uses a single optimized arena canvas, capped device pixel ratio, capped particle count, and lightweight vector art so it runs smoother than the earlier version.
