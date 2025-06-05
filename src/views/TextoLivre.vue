<template>
  <div class="texto-livre">
    <h2>✏️ Escreve o que quiser!</h2>

    <div class="display">
      <p>{{ textoDigitado }}</p>
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
import { ref } from 'vue'

const textoDigitado = ref("")
const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

function adicionarLetra(letra) {
  textoDigitado.value += letra
}

function apagar() {
  textoDigitado.value = textoDigitado.value.slice(0, -1)
}

function limpar() {
  textoDigitado.value = ""
}
</script>

<style scoped>
.texto-livre {
  text-align: center;
  padding: 2rem;
  background: linear-gradient(to bottom, #ffe0f0, #e0f7fa);
  min-height: 100vh;
  font-family: 'Comic Sans MS', cursive;
}

.display {
  font-size: 2rem;
  background: white;
  margin: 1rem auto;
  padding: 1rem 2rem;
  width: 90%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 0 5px #ccc;
  min-height: 80px;
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
  transform: scale(1.1);
}

.acoes {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.acoes button {
  background: #ffccbc;
  border: 2px solid #ff8a65;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  font-size: 1.2rem;
  cursor: pointer;
}

.acoes button:hover {
  background: #ffab91;
}
</style>
