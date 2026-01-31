import { defineStore } from 'pinia'

let ws = null

export const usePlayerStore = defineStore('player', {
  state: () => ({
    name: '',
    players: [],
    wsConnected: false
  }),
  actions: {
    setName(newName) {
      this.name = newName
      this.connectWebSocket()
    },
    connectWebSocket() {
      if (ws) return
      ws = new window.WebSocket('ws://localhost:3001')
      ws.onopen = () => {
        this.wsConnected = true
        ws.send(JSON.stringify({ type: 'join', name: this.name }))
      }
      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'players') {
            this.players = data.players
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
        ws.send(JSON.stringify({ type: 'leave', name: this.name }))
        ws.close()
      }
    }
  }
})