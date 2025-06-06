<template>
  <div class="home" :style="{ background: tema.fundo, fontFamily: tema.fonte }">
    <h1 :style="{ color: tema.corTitulo }">🎉 Bem-vinda ao ABC Divertido!</h1>

    <div class="tema-select">
      <p>🎨 Escolhe um tema:</p>
      <div class="tema-botoes">
        <button
          :class="{ ativo: temaAtual === 'padrao' }"
          @click="selecionarTema('padrao')"
        >
          🌈 Colorido Fofo
        </button>
        <button
          :class="{ ativo: temaAtual === 'aventura' }"
          @click="selecionarTema('aventura')"
        >
          🧢 Aventura Azul
        </button>
      </div>
    </div>

    <div class="menu">
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
const { setTema, temaAtual } = useTema()
import { temas } from '../themes'
const tema = computed(() => temas[temaAtual.value])


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
  margin-bottom: 1rem;
}

.tema-select {
  margin-bottom: 2rem;
}

.tema-select p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.tema-botoes {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.tema-botoes button {
  padding: 0.8rem 1.5rem;
  border-radius: 10px;
  border: 2px solid #aaa;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.2s;
  background-color: #fff;
}

.tema-botoes button.ativo {
  font-weight: bold;
  border-color: #333;
  background-color: #e0f7fa;
}

.menu {
  display: flex;
  flex-direction: column;
	justify-content: center;
	align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.menu button {
  padding: 1rem 2rem;
  font-size: 1.5rem;
  border-radius: 12px;
  border: 2px solid;
  cursor: pointer;
  transition: 0.2s;
}
</style>
