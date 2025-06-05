<template>
  <div class="home">
    <h1>🎉 Bem-vinda ao ABC Divertido!</h1>
    <p>Escolhe uma brincadeira para começar:</p>

    <div class="menu">
      <button @click="goTo('texto-livre')">✏️ Texto Livre</button>
      <button @click="goTo('animais')">🐾 Animais e Objetos</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function goTo(route) {
  router.push(`/${route}`)
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(180deg, #ffcccc, #ccffcc, #ccccff);
  min-height: 100vh;
  font-family: 'Comic Sans MS', cursive;
}

h1 {
  font-size: 2.5rem;
  color: #ff66cc;
}

p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.menu {
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
}

button {
  background-color: #fff;
  border: 3px solid #66ccff;
  border-radius: 15px;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

button:hover {
  transform: scale(1.1);
  background-color: #e6f7ff;
}
</style>
