<template>
  <div class="animais">
    <h2>🐾 Escreve o nome!</h2>

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

      <div class="imagem">
        <img v-if="palavraCompleta" :src="imagemAtual" alt="animal" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Dados de exemplo, depois será dinâmico
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
  font-family: 'Comic Sans MS', cursive;
  background: linear-gradient(to bottom, #fffde7, #e1f5fe);
  min-height: 100vh;
}

.letra-inicial {
  font-size: 4rem;
  color: #ff4081;
  font-weight: bold;
}

.letras-faltantes {
  font-size: 2rem;
  margin: 1rem;
}

.letras-faltantes span {
  display: inline-block;
  width: 2rem;
  border-bottom: 2px dashed #ccc;
  margin: 0 0.2rem;
}

.letras-faltantes span.correta {
  color: green;
  font-weight: bold;
  border-color: green;
}

.letras-faltantes span.ajuda {
  color: #aaa;
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

.imagem img {
  margin-top: 2rem;
  max-width: 200px;
  transition: transform 0.5s;
  animation: piscar 1s infinite alternate;
}

@keyframes piscar {
  from { filter: brightness(0.7); }
  to { filter: brightness(1.1); }
}
</style>
