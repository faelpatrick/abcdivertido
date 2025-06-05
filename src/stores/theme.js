import { ref, computed, watch } from 'vue'
import { temas } from '../themes'

const temaSalvo = localStorage.getItem('temaSelecionado') || 'padrao'
const temaAtual = ref(temaSalvo)

watch(temaAtual, (novoTema) => {
  localStorage.setItem('temaSelecionado', novoTema)
})

export function useTema() {
  return {
    temaAtual,
    tema: computed(() => temas[temaAtual.value]),
    setTema(novo) {
      temaAtual.value = novo
    }
  }
}
