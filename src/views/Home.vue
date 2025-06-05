<template>
  <div class="home" :style="{ background: tema.fundo, fontFamily: tema.fonte }">
    <h1 :style="{ color: tema.corTitulo }">🎉 Bem-vinda ao ABC Divertido!</h1>

    <div v-if="!temaSelecionado" class="tema-select">
      <p>Escolhe um tema:</p>
      <button @click="selecionarTema('padrao')">🌈 Colorido Fofo</button>
      <button @click="selecionarTema('aventura')">🧢 Aventura Azul</button>
    </div>

    <div v-else class="menu">
      <p>Escolhe uma brincadeira para começar:</p>
      <button @click="goTo('texto-livre')">✏️ Texto Livre</button>
      <button @click="goTo('animais')">🐾 Animais e Objetos</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useTema } from '../stores/theme'
import { computed } from 'vue'

const router = useRouter()
const { setTema, temaAtual, tema } = useTema()
const temaSelecionado = computed(() => !!temaAtual.value)

function selecionarTema(nome) {
  setTema(nome)
}

function goTo(route) {
  router.push(`/${route}`)
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
}

h1 {
  font-size: 2.5rem;
}

.tema-select,
.menu {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border-radius: 12px;
  border: 2px solid;
  cursor: pointer;
  transition: 0.2s;
}

.tema-select button:nth-child(2) {
  border-color: #66ccff;
  background: #fff;
}

.tema-select button:nth-child(3) {
  border-color: #43a047;
  background: #e3f2fd;
}

button:hover {
  transform: scale(1.05);
}
</style>
