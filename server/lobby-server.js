// Enkel WebSocket-server för lobby
const WebSocket = require('ws')
const PORT = process.env.PORT || 3001

const wss = new WebSocket.Server({ port: PORT })

let players = []

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    try {
      const data = JSON.parse(message)
      if (data.type === 'join') {
        if (!players.includes(data.name)) {
          players.push(data.name)
        }
        broadcastPlayers()
      }
      if (data.type === 'leave') {
        players = players.filter(n => n !== data.name)
        broadcastPlayers()
      }
    } catch (e) {}
  })

  ws.on('close', function() {
    // Ingen automatisk borttagning av namn på disconnect (kan förbättras)
  })

  // Skicka nuvarande spelare direkt
  ws.send(JSON.stringify({ type: 'players', players }))
})

function broadcastPlayers() {
  const msg = JSON.stringify({ type: 'players', players })
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg)
    }
  })
}

console.log('WebSocket-server körs på ws://localhost:' + PORT)
