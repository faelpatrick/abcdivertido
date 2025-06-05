<template>
  <div class="animais" :style="{ background: tema.fundo, fontFamily: tema.fonte }">
    <h2 :style="{ color: tema.corTitulo }">🐾 Escreve o nome!</h2>

    <div v-if="palavraAtual" class="jogo">
      <div class="palavra-display">
        <span :class="{ correta: letraInicialOk }">
          {{ palavraAtual[0] }}
        </span>
        <span
          v-for="(letra, i) in letrasFaltando"
          :key="i"
          :class="{ correta: inputUsuario[i] === letra, ajuda: ajudaLigada }"
        >
          {{ ajudaLigada ? letra : inputUsuario[i] || "_" }}
        </span>
      </div>

      <div class="alfabeto">
        <button
          v-for="letra in alfabeto"
          :key="letra"
          @click="handleLetra(letra)"
        >
          {{ letra }}
        </button>
      </div>

      <div class="acoes">
        <button @click="limpar">🗑️ Limpar</button>
        <button @click="ajudaLigada = !ajudaLigada">
          {{ ajudaLigada ? '❌ Tirar Ajuda' : '💡 Ver Ajuda' }}
        </button>
        <button v-if="palavraCompleta" @click="proximaPalavra">➡️ Próximo</button>
      </div>

      <div class="imagem" v-if="palavraCompleta">
        <img :src="imagemAtual" alt="animal" />
      </div>
    </div>

    <p v-else>🔄 A carregar palavras...</p>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import { useTema } from '../stores/theme'

const { tema } = useTema()

const lista = ref([])
const indexAtual = ref(0)
const ajudaLigada = ref(false)
const inputUsuario = ref([])
const letraInicialDigitada = ref("")

const palavraAtual = computed(() => lista.value[indexAtual.value]?.palavra || "")
const letrasFaltando = computed(() => palavraAtual.value.slice(1).split(''))
const imagemAtual = computed(() => lista.value[indexAtual.value]?.imagem || "")
const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')

const letraInicialOk = computed(() => letraInicialDigitada.value === palavraAtual.value[0])

function handleLetra(letra) {
  const upper = letra.toUpperCase()
  if (!letraInicialOk.value) {
    if (upper === palavraAtual.value[0]) {
      letraInicialDigitada.value = upper
    }
    return
  }

  if (inputUsuario.value.length < letrasFaltando.value.length) {
    inputUsuario.value.push(upper)
  }
}

function limpar() {
  letraInicialDigitada.value = ""
  inputUsuario.value = []
}

const palavraCompleta = computed(() =>
  letraInicialOk.value &&
  inputUsuario.value.join('') === letrasFaltando.value.join('')
)

function proximaPalavra() {
  ajudaLigada.value = false
  limpar()
  const letraAtual = palavraAtual.value[0]
  const proximaIndex = lista.value.findIndex(p => p.palavra[0] > letraAtual)
  indexAtual.value = proximaIndex !== -1 ? proximaIndex : 0
}

async function carregarPalavras() {
  const res = await fetch('/data/palavras.json')
  const dados = await res.json()
  lista.value = dados.sort((a, b) => a.palavra.localeCompare(b.palavra))
}

function handleKeydown(e) {
  const key = e.key.toUpperCase()
  if (alfabeto.includes(key)) {
    handleLetra(key)
  } else if (e.key === 'Backspace') {
    if (inputUsuario.value.length > 0) {
      inputUsuario.value.pop()
    } else {
      letraInicialDigitada.value = ""
    }
  }
}

onMounted(() => {
  carregarPalavras()
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
})

watch(palavraCompleta, (val) => {
  if (val) setTimeout(() => proximaPalavra(), 1500)
})
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

.palavra-display {
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.palavra-display span {
  border-bottom: 2px dashed #999;
  min-width: 2rem;
  display: inline-block;
  color: #999;
}

.palavra-display span.correta {
  color: green;
  font-weight: bold;
  border-color: green;
}

.palavra-display span.ajuda {
  color: #bbb;
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
