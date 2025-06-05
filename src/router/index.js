import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import TextoLivre from '../views/TextoLivre.vue'
import Animais from '../views/Animais.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/texto-livre', component: TextoLivre },
  { path: '/animais', component: Animais },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
