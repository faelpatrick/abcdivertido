<template>
  <div class="animais" :style="{ background: tema.fundo, fontFamily: tema.fonte }">
    <h2 :style="{ color: tema.corTitulo }">🐾 Escreve o nome!</h2>

    <div class="jogo">
      <div class="letra-inicial">{{ palavraAtual[0] }}</div>

      <div class="letras-faltantes">
        <span
          v-for="(letra, i) in letrasFaltando"
          :key="i"
          :class="{ correta: inputUsuario[i] === letra, ajuda: ajudaLigada }"
        >
          {{ ajudaLigada ? letra : inputUsuario[i] || "_" }}
        </span>
      </div>

      <div class="alfabeto">
        <button v-for="letra in alfabeto" :key="letra" @click="adicionarLetra(letra)">
          {{ letra }}
        </button>
      </div>

      <div class="acoes">
        <button @click="limpar">🗑️ Limpar</button>
        <button @click="ajudaLigada = !ajudaLigada">
          {{ ajudaLigada ? '❌ Tirar Ajuda' : '💡 Ver Ajuda' }}
        </button>
      </div>

      <div class="imagem" v-if="palavraCompleta">
        <img :src="imagemAtual" alt="animal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTema } from '../stores/theme'

const { tema } = useTema()

// Exemplo com 2 palavras
const dados = [
  { palavra: 'ABELHA', imagem: '/assets/abelha.png' },
  { palavra: 'BALEIA', imagem: '/assets/baleia.png' }
]

const indexAtual = ref(0)
const ajudaLigada = ref(false)
const inputUsuario = ref([])

const palavraAtual = computed(() => dados[indexAtual.value].palavra)
const letrasFaltando = computed(() => palavraAtual.value.slice(1).split(''))
const imagemAtual = computed(() => dados[indexAtual.value].imagem)

const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

function adicionarLetra(letra) {
  if (inputUsuario.value.length < letrasFaltando.value.length) {
    inputUsuario.value.push(letra)
  }
}

function limpar() {
  inputUsuario.value = []
}

const palavraCompleta = computed(() =>
  inputUsuario.value.join('') === letrasFaltando.value.join('')
)
</script>

<style scoped>
.animais {
  text-align: center;
  padding: 2rem;
  min-height: 100vh;
}

h2 {
  font-size: 2rem;
}

.jogo {
  margin-top: 2rem;
}

.letra-inicial {
  font-size: 4rem;
  font-weight: bold;
  color: #ff4081;
}

.letras-faltantes {
  margin: 1rem 0;
  font-size: 2rem;
}

.letras-faltantes span {
  display: inline-block;
  width: 2rem;
  margin: 0 0.2rem;
  border-bottom: 2px dashed #999;
}

.letras-faltantes span.correta {
  color: green;
  border-color: green;
  font-weight: bold;
}

.letras-faltantes span.ajuda {
  color: #999;
}

.alfabeto {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.4rem;
  margin-top: 1rem;
}

.alfabeto button {
  background: #ffe0b2;
  border: 2px solid #ff9800;
  border-radius: 8px;
  padding: 0.6rem;
  font-size: 1.3rem;
  cursor: pointer;
}

.alfabeto button:hover {
  background: #ffcc80;
}

.acoes {
  margin-top: 1rem;
  display: flex;
  justify-content: center;
  gap: 1rem;
}

.acoes button {
  padding: 0.5rem 1rem;
  background-color: #d1c4e9;
  border: 2px solid #9575cd;
  border-radius: 10px;
  cursor: pointer;
}

.imagem {
  margin-top: 2rem;
}

.imagem img {
  max-width: 200px;
  animation: piscar 0.8s infinite alternate;
}

@keyframes piscar {
  from { filter: brightness(0.8); }
  to { filter: brightness(1.2); }
}
</style>
