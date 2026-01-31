<template>
  <div class="name-picker">
    <h2>Välj ditt namn</h2>
    <input v-model="name" placeholder="Skriv ditt namn" @keyup.enter="joinLobby" />
    <button class="main-btn" @click="joinLobby" :disabled="!name.trim()">Gå med i lobbyn</button>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { usePlayerStore } from '../store'

const name = ref('')
const error = ref('')
const emit = defineEmits(['name-selected'])
const playerStore = usePlayerStore()

function joinLobby() {
  if (!name.value.trim()) return
  playerStore.setName(name.value)
  playerStore.hostLobby() // alla går med i samma lobby
  emit('name-selected', name.value)
}
</script>
.error {
  color: #ff4f7a;
  margin-top: 10px;
  font-weight: 700;
}

<style scoped>
h2 {
  text-align: center;
  width: 100%;
}
.name-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0;
  width: 100%;
  gap: 18px;
}
input {
  margin-bottom: 0;
}
.main-btn {
  margin-top: 0;
  width: 100%;
  max-width: 260px;
  padding: 14px 0;
  font-size: 1.1em;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg, #b84cff 60%, #ff6f91 100%);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px #b84cff22;
  transition: background 0.2s, transform 0.1s;
  text-align: center;
}
.main-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
h2 {
  color: #b84cff;
  font-size: 1.3rem;
  margin-bottom: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
input {
  padding: 12px 16px;
  font-size: 1.1em;
  margin-bottom: 16px;
  width: 90%;
  max-width: 260px;
  border: 2px solid #b84cff33;
  border-radius: 16px;
  outline: none;
  background: #fff8ff;
  transition: border 0.2s;
}
input:focus {
  border: 2px solid #b84cff;
}
button {
  padding: 12px 32px;
  font-size: 1.1em;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(90deg, #b84cff 60%, #ff6f91 100%);
  border: none;
  border-radius: 16px;
  cursor: pointer;
  box-shadow: 0 2px 8px #b84cff22;
  transition: background 0.2s, transform 0.1s;
}
button:hover {
  background: linear-gradient(90deg, #a13be0 60%, #ff4f7a 100%);
  transform: scale(1.04);
}
@media (max-width: 600px) {
  h2 {
    font-size: 1.05rem;
  }
  input, button {
    font-size: 1em;
    max-width: 99vw;
  }
}
</style>
