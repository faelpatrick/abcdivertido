<template>
  <div :style="{ position: 'relative', minHeight: '100vh' }">
    <!-- Botão de Voltar à Home, aparece em todas as rotas exceto na raiz ("/") -->
    <button
      v-if="mostrarBotao"
      class="btn-voltar"
      @click="router.push('/')"
    >
      ⬅️ Voltar à Home
    </button>

    <!-- Roteador principal -->
    <router-view />
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

const mostrarBotao = computed(() => route.path !== '/')
</script>

<style scoped>
.btn-voltar {
  position: fixed;
  top: 10px;
  left: 10px;
  background: #fff;
  border: 2px solid #888;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
  z-index: 999;
}
</style>
