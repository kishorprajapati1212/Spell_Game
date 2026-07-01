// SpellShape Arena realtime room server
// Run: npm install && npm start
// Open http://localhost:3000, create a room, share the room code/link.
// Supports both WebSocket and HTTP polling fallback, so the game works even
// when WebSocket is blocked by a network/proxy.

const http = require('http');
const fs = require('fs');
const path = require('path');
let WebSocket;
try { WebSocket = require('ws'); } catch { WebSocket = null; }

const PORT = process.env.PORT || 3000;
const rooms = new Map();
let nextSeq = 1;

function id() { return Math.random().toString(36).slice(2, 6).toUpperCase(); }
function sendWS(ws, msg) { if (ws && ws.readyState === 1) ws.send(JSON.stringify(msg)); }
function roomState(code) {
  const r = rooms.get(code);
  if (!r) return null;
  return { code, players: r.players.map(p => p ? p.name : null) };
}
function pushEvent(room, to, msg) {
  const r = rooms.get(room);
  if (!r) return;
  const event = { seq: nextSeq++, to, msg };
  r.events.push(event);
  if (r.events.length > 300) r.events.splice(0, r.events.length - 300);
  const p = r.players[to];
  if (p && p.ws) sendWS(p.ws, msg);
}
function other(i) { return i === 0 ? 1 : 0; }
function json(res, code, obj) {
  res.writeHead(code, { 'content-type': 'application/json', 'access-control-allow-origin': '*' });
  res.end(JSON.stringify(obj));
}
function readBody(req) {
  return new Promise(resolve => {
    let body = '';
    req.on('data', c => body += c);
    req.on('end', () => { try { resolve(JSON.parse(body || '{}')); } catch { resolve({}); } });
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET,POST,OPTIONS',
      'access-control-allow-headers': 'content-type'
    });
    return res.end();
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // HTTP polling API fallback
  if (url.pathname === '/api/create' && req.method === 'POST') {
    const body = await readBody(req);
    let code; do code = id(); while (rooms.has(code));
    const name = body.name || 'Player 1';
    rooms.set(code, { players: [{ name, ws: null }, null], events: [] });
    return json(res, 200, { type: 'created', room: code, player: 0, roomState: roomState(code) });
  }
  if (url.pathname === '/api/join' && req.method === 'POST') {
    const body = await readBody(req);
    const code = String(body.room || '').toUpperCase();
    const r = rooms.get(code);
    if (!r) return json(res, 404, { type: 'error', message: 'Room not found' });
    if (r.players[1]) return json(res, 409, { type: 'error', message: 'Room is full' });
    r.players[1] = { name: body.name || 'Player 2', ws: null };
    pushEvent(code, 0, { type: 'peerJoined', roomState: roomState(code) });
    return json(res, 200, { type: 'joined', room: code, player: 1, roomState: roomState(code) });
  }
  if (url.pathname === '/api/send' && req.method === 'POST') {
    const body = await readBody(req);
    const code = String(body.room || '').toUpperCase();
    const player = Number(body.player);
    const r = rooms.get(code);
    if (!r || !r.players[player]) return json(res, 404, { type: 'error', message: 'Room/session not found' });
    const msg = Object.assign({}, body.msg || {}, { from: player });
    pushEvent(code, other(player), msg);
    return json(res, 200, { ok: true });
  }
  if (url.pathname === '/api/poll' && req.method === 'GET') {
    const code = String(url.searchParams.get('room') || '').toUpperCase();
    const player = Number(url.searchParams.get('player'));
    const since = Number(url.searchParams.get('since') || 0);
    const r = rooms.get(code);
    if (!r || !r.players[player]) return json(res, 404, { type: 'error', message: 'Room/session not found' });
    const events = r.events.filter(e => e.to === player && e.seq > since);
    return json(res, 200, { events });
  }

  // Static files
  let file = url.pathname === '/' ? '/index.html' : url.pathname;
  file = path.normalize(path.join(__dirname, file));
  if (!file.startsWith(__dirname)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found'); }
    const ext = path.extname(file).toLowerCase();
    const type = ext === '.html' ? 'text/html' : ext === '.js' ? 'text/javascript' : ext === '.css' ? 'text/css' : 'application/octet-stream';
    res.writeHead(200, { 'content-type': type });
    res.end(data);
  });
});

if (WebSocket) {
  const wss = new WebSocket.Server({ server });
  wss.on('connection', ws => {
    ws.room = null; ws.player = null; ws.name = 'Player';
    ws.on('message', raw => {
      let msg; try { msg = JSON.parse(raw); } catch { return; }
      if (msg.type === 'create') {
        let code; do code = id(); while (rooms.has(code));
        ws.room = code; ws.player = 0; ws.name = msg.name || 'Player 1';
        rooms.set(code, { players: [{ ws, name: ws.name }, null], events: [] });
        sendWS(ws, { type: 'created', room: code, player: 0, roomState: roomState(code) });
        return;
      }
      if (msg.type === 'join') {
        const code = String(msg.room || '').toUpperCase();
        const r = rooms.get(code);
        if (!r) return sendWS(ws, { type: 'error', message: 'Room not found' });
        if (r.players[1]) return sendWS(ws, { type: 'error', message: 'Room is full' });
        ws.room = code; ws.player = 1; ws.name = msg.name || 'Player 2';
        r.players[1] = { ws, name: ws.name };
        sendWS(ws, { type: 'joined', room: code, player: 1, roomState: roomState(code) });
        pushEvent(code, 0, { type: 'peerJoined', roomState: roomState(code) });
        return;
      }
      if (!ws.room || ws.player == null) return;
      pushEvent(ws.room, other(ws.player), Object.assign({}, msg, { from: ws.player }));
    });
    ws.on('close', () => {
      const code = ws.room;
      if (!code) return;
      const r = rooms.get(code);
      if (!r) return;
      pushEvent(code, other(ws.player), { type: 'peerLeft' });
      // Keep HTTP polling rooms alive if the other player exists; otherwise remove.
      if (!r.players[other(ws.player)]) rooms.delete(code);
    });
  });
}

server.listen(PORT, () => {
  console.log(`SpellShape Arena server running: http://localhost:${PORT}`);
  console.log('Open that URL in the browser. Do not open index.html directly for online multiplayer.');
});
