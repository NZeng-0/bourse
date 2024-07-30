<script setup lang="ts">
import pop from '~/components/popup'
import { getIndexMsg, getIndexNoticeList } from '~/api'

// const router = useRouter()
const { t } = useI18n()

async function getPopMsg() {
  const { data } = await getIndexMsg()
  const temp = data.value.data.pop_window_message
  for (const e of temp) {
    pop({
      message: e.value,
      title: e.remark,
      submit: t('popup.confrim'),
    })
  }
}

async function init() {
  Promise.all([getPopMsg()])
}

onMounted(async () => {
  await init()
  const { data } = await getIndexNoticeList()
  // eslint-disable-next-line no-console
  console.log(data.value)
})
</script>

<template>
  <div p="x-4 y-10">
    <TheCard />
    <div flex="~" mt1 items-center>
      <img src="../assets/images/inform.png" h8 w8>
      <div class="banner_textscroll" ml4 overflow-hidden text-sm>
        <div>
          英伟达将推出其最新人工智能芯片的中国特...
        </div>
      </div>
    </div>
    <ThePortfolio />
    <TheFooter :index="0" />
    <!-- 加载中组件 -->
    <!-- <div v-if="loading">
      <TheLoading :done />
    </div> -->
  </div>
</template>

<style scoped>
/* 文字滚动 */
@keyframes scrolltext {
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(-100%);
  }
}

.banner_textscroll>div {
  white-space: nowrap;
  animation: 10s scrolltext linear infinite;
}
</style>
