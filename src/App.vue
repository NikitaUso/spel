
<script setup>
import { ref } from 'vue'
import { usePlayerStore } from './store'
import NamePicker from './components/NamePicker.vue'
import Lobby from './components/Lobby.vue'

const playerStore = usePlayerStore()
const nameChosen = ref(!!playerStore.name)

function handleNameSelected(name) {
  playerStore.setName(name)
  nameChosen.value = true
}
</script>



<template>
  <div class="party-bg">
    <div class="party-container">
      <h1 class="party-title">🎉 Partyspel 🎉</h1>
      <NamePicker v-if="!nameChosen" @name-selected="handleNameSelected" />
      <Lobby v-else />
    </div>
  </div>
</template>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
  font-family: 'Quicksand', 'Segoe UI', Arial, sans-serif;
  background: #f7e8ff;
}
.party-bg {
  min-height: 100vh;
  min-width: 100vw;
  background: linear-gradient(135deg, #f7e8ff 0%, #ffe8e8 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
}
.party-container {
  background: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  max-width: 370px;
  width: 100vw;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}
.party-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #b84cff;
  margin-bottom: 18px;
  letter-spacing: 1px;
  text-shadow: 0 2px 8px #fff2, 0 1px 0 #fff;
}
@media (max-width: 600px) {
  .party-container {
    padding: 18px 4vw 16px 4vw;
    max-width: 99vw;
  }
  .party-title {
    font-size: 1.4rem;
  }
}
</style>


