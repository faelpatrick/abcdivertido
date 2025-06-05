<template>
  <div class="texto-livre" :style="{ background: tema.fundo, fontFamily: tema.fonte }">
    <h2 :style="{ color: tema.corTitulo }">✏️ Escreve o que quiser!</h2>

    <div class="display">
      <p>{{ textoDigitado || 'Clique ou pressione letras para começar!' }}</p>
    </div>

    <div class="alfabeto">
      <button v-for="letra in alfabeto" :key="letra" @click="adicionarLetra(letra)">
        {{ letra }}
      </button>
    </div>

    <div class="acoes">
      <button @click="apagar">⌫ Apagar</button>
      <button @click="limpar">🗑️ Limpar Tudo</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useTema } from '../stores/theme'

const { tema } = useTema()
const textoDigitado = ref("")
const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

function adicionarLetra(letra) {
  textoDigitado.value += letra.toUpperCase()
}

function apagar() {
  textoDigitado.value = textoDigitado.value.slice(0, -1)
}

function limpar() {
  textoDigitado.value = ""
}

// Captura teclas do teclado físico
function handleKeydown(e) {
  const key = e.key.toUpperCase()
  if (alfabeto.includes(key)) {
    adicionarLetra(key)
  } else if (e.key === 'Backspace') {
    apagar()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.texto-livre {
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
}

h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.display {
  background: white;
  border: 2px dashed #aaa;
  margin: 1rem auto;
  padding: 1rem 2rem;
  width: 90%;
  max-width: 600px;
  min-height: 80px;
  font-size: 2rem;
  border-radius: 12px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.1);
}

.alfabeto {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin: 2rem 0;
}

.alfabeto button {
  background: #fce4ec;
  border: 2px solid #f48fb1;
  border-radius: 10px;
  padding: 0.7rem 1.2rem;
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.2s;
}

.alfabeto button:hover {
  background: #f8bbd0;
  transform: scale(1.05);
}

.acoes {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.acoes button {
  background: #dcedc8;
  border: 2px solid #8bc34a;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: 0.2s;
}

.acoes button:hover {
  background: #c5e1a5;
}
</style>
