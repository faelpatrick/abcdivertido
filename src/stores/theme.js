import { ref } from 'vue'
import { temas } from '../themes'

const temaAtual = ref('padrao')

export function useTema() {
  return {
    temaAtual,
    tema: temas[temaAtual.value],
    setTema(novo) {
      temaAtual.value = novo
    }
  }
}
