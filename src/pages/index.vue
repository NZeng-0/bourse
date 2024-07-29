<script setup lang="ts" generic="T extends any, O extends any">
import { getIndexList } from '~/api'

const router = useRouter()
const done = ref(false)
const loading = ref(true)
let hideLoadingTimer: NodeJS.Timeout

setTimeout(() => {
  done.value = true
  hideLoadingTimer = setTimeout(() => {
    loading.value = false
    if (hideLoadingTimer)
      clearTimeout(hideLoadingTimer)
  }, 1200)
}, 2500)

async function init() {
  const { data } = await getIndexList()
  if (data.value.code)
    router.push('/login')
}

onMounted(async () => {
  await init()
})

onUnmounted(() => {
  if (hideLoadingTimer)
    clearTimeout(hideLoadingTimer)
})
</script>

<template>
  <div p="x-4 y-10">
    <TheCard />
    <div flex="~" mt1 items-center>
      <img src="../assets/images/inform.png" h8 w8>
      <div ml4 text-sm>
        <p>
          英伟达将推出其最新人工智能芯片的中国特...
        </p>
      </div>
    </div>
    <ThePortfolio />
    <TheFooter :index="0" />
    <!-- 加载中组件 -->
    <!-- <div v-if="loading">
      <TheLoading :done />
    </div> -->
    <!-- 弹窗组件 -->
    <ThePopup />
  </div>
</template>

<style scoped>
p {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 1;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
</style>
