<template>
  <div class="lobby">
    <h2>Lobby</h2>
    <p>Välkommen, {{ name }}!</p>
    <h3>Spelare i lobbyn:</h3>
    <ul>
      <li v-for="player in players" :key="player">{{ player }}</li>
    </ul>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { usePlayerStore } from '../store'

const playerStore = usePlayerStore()
const { name, players } = storeToRefs(playerStore)
</script>

<style scoped>
.lobby {
  width: 100%;
  max-width: 370px;
  margin: 0 auto;
  padding: 0;
  background: none;
  border-radius: 0;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  align-items: center;
}
h2 {
  color: #ff6f91;
  font-size: 1.4rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}
h3 {
  color: #b84cff;
  font-size: 1.1rem;
  margin: 18px 0 8px 0;
  font-weight: 700;
}
p {
  color: #333;
  font-size: 1.1rem;
  margin-bottom: 8px;
}
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
li {
  background: linear-gradient(90deg, #ffe8e8 60%, #f7e8ff 100%);
  color: #b84cff;
  font-weight: 700;
  padding: 10px 0;
  border-radius: 14px;
  text-align: center;
  font-size: 1.08em;
  box-shadow: 0 1px 4px #b84cff11;
}
@media (max-width: 600px) {
  h2 {
    font-size: 1.1rem;
  }
  h3 {
    font-size: 1rem;
  }
  li {
    font-size: 1em;
    padding: 8px 0;
  }
}
</style>
