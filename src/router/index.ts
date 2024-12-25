// import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { createRouter, createWebHistory } from 'vue-router/auto'
import { useLocalCache } from '~/hook'

const { getCache } = useLocalCache()

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !getCache('token'))
    next('/login')
  else
    next()
})

export default router
