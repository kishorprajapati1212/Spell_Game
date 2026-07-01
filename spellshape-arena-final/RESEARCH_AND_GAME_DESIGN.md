# Rune Duel Arena — Updated Research & Game Design Notes

## Revised direction
The first version was too much like a flat drawing UI. The revised version is now a **2.5D versus duel**: two mages stand in an arena, spells travel between them, and the drawing circle is the casting input rather than the whole game screen.

## Inspiration / reference area
The closest design family is gesture/rune-based magic combat, similar in spirit to games that use drawn symbols or runes for spell casting. Instead of copying one specific game, this build uses the core idea: **recognize a drawn rune, convert it into a spell, and show that spell in a versus battle scene.**

## Core design

### Modes
- **VS AI**: Player 1 fights an AI mage.
- **2 Players**: Local same-device duel. Player 1 and Player 2 alternate drawing/casting.
- **AI vs AI**: Spectator/debug mode to test balancing and animation flow.

### Visual style
- 2.5D pseudo-perspective arena.
- Two mages placed left and right, facing each other.
- Projectiles travel across the field with simple particle effects.
- HUD bars remain on top for HP, mana, shields, and statuses.

### Rune spell map
| Rune | Spell | Role |
|---|---|---|
| Circle | Fireball | Damage + burn |
| Triangle | Thunder Lance | Damage + stun chance |
| Zigzag | Wind Slash | Fast damage + evade |
| Square | Stone Guard | Shield + counter |
| Vertical line | Life Stream | Heal + possible regen |
| Spiral | Frost Coil | Damage + slow |
| V / Chevron | Shadow Fang | Cheap lifesteal |

## Optimization changes
The rebuilt `index.html` was optimized for smoother rendering:

1. **One main arena canvas** instead of many animated DOM effects.
2. **Capped device pixel ratio** so very high-DPI screens do not render huge canvases.
3. **Capped particle count** to avoid runaway effects.
4. **No heavy CSS blur/backdrop animations** in the gameplay area.
5. **Simple vector rendering** for mages, arena, projectiles, and floating text.
6. **UI updates only on turn/spell changes**, not every animation frame.

## MVP limitations
- Online multiplayer is not included because that requires a backend server and sockets.
- Local 2-player works by taking turns on the same device.
- The mage art is procedural/vector, so it loads instantly and has no external assets.

## Future upgrades
- Online WebSocket multiplayer.
- Character selection and unlockable spell schools.
- Better rune training/calibration per player.
- Sound effects and screen shake options.
- Boss fights and campaign mode.
