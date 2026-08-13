import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    meta: { title: 'Nativa | El trabajo de software, unido' },
  },
  {
    path: '/content',
    name: 'content',
    component: () => import('../views/ContentView.vue'),
    meta: { title: 'Content | Nativa' },
  },
  {
    path: '/content/vision',
    name: 'vision-deck',
    component: () => import('../views/VisionDeckView.vue'),
    meta: { title: 'La visión de Nativa' },
  },
  {
    path: '/content/business-model',
    name: 'business-model-deck',
    component: () => import('../views/BusinessModelDeckView.vue'),
    meta: { title: 'Business model | Nativa' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  if (to.meta?.title) {
    document.title = to.meta.title
  }
})

export default router
