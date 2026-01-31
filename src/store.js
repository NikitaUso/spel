import { defineStore } from 'pinia'

let ws = null

function randomLobbyId() {
  return Math.random().toString(36).substring(2, 8)
}

export const usePlayerStore = defineStore('player', {
  state: () => ({
    name: '',
    players: [],
    wsConnected: false,
    isHost: false,
    lobbyId: '',
    error: ''
  }),
  actions: {
    setName(newName) {
      this.name = newName
    },
    hostLobby() {
      this.isHost = true
      this.lobbyId = randomLobbyId()
      this.connectWebSocket()
    },
    joinLobby(lobbyId) {
      this.isHost = false
      this.lobbyId = lobbyId
      this.connectWebSocket()
    },
    connectWebSocket() {
      if (ws) return
      // Byt till rätt ws-url för produktion om det behövs
      let wsUrl = 'wss://spel-k5sq.onrender.com'
      if (window.location.hostname.endsWith('github.io')) {
        wsUrl = 'wss://DIN-PRODUKTIONS-WS-URL-HÄR'
      }
      ws = new window.WebSocket(wsUrl)
      ws.onopen = () => {
        this.wsConnected = true
        ws.send(JSON.stringify({ type: 'join', name: this.name, lobbyId: this.lobbyId, isHost: this.isHost }))
      }
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'players') {
            this.players = data.players
          }
          if (data.type === 'error') {
            this.error = data.message
          }
        } catch (e) {}
      }
      ws.onclose = () => {
        this.wsConnected = false
        ws = null
      }
    },
    leaveLobby() {
      if (ws && this.name) {
        ws.send(JSON.stringify({ type: 'leave', name: this.name, lobbyId: this.lobbyId }))
        ws.close()
      }
      this.players = []
      this.lobbyId = ''
      this.isHost = false
    }
  }
})