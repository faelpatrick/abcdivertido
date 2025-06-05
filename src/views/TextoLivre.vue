<script setup>
import { ref } from 'vue'
import { useTema } from '../stores/theme'

const { tema } = useTema()
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

<template>
  <div class="texto-livre" :style="{ background: tema.fundo, fontFamily: tema.fonte }">
    <h2 :style="{ color: tema.corTitulo }">✏️ Escreve o que quiser!</h2>

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

<style scoped>
/* reaproveita o mesmo estilo de antes */
</style>
