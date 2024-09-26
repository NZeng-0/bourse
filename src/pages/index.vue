<script setup lang="ts">
import { CountTo } from 'vue3-count-to'
import pop from '~/components/popup'
import { getIndexMsg } from '~/api'
import loading from '~/components/loading'

interface IndexMsg {
  id: number
  key: string
  condition: string
  value: string
  link: string
  remark: string
  status: number
  sort: number
  start_time: string
  end_time: string
  create_time: string
}

const { t } = useI18n()

const left_icon = new URL('../assets/images/inform.png', import.meta.url).href
const broad = new URL('../assets/images/broadcast.png', import.meta.url).href

const messages = ref<IndexMsg[]>()

async function getPopMsg() {
  const { data } = await getIndexMsg()
  messages.value = data.value.data.pop_window_message
}

async function init() {
  Promise.all([getPopMsg()])
}

function showNextMessage(index = 0) {
  if (messages.value === undefined)
    return
  if (index < messages.value!.length) {
    const e = messages.value![index]
    pop({
      message: e.value,
      title: e.remark,
      submit: t('popup.confrim'),
      onClose: () => showNextMessage(index + 1),
    })
  }
}

onMounted(async () => {
  if (window.name === '') {
    window.name = 'refresh'
  }
  else if (window.name === 'refresh') {
    loading.show()
    return setTimeout(() => {
      loading.close()
    }, 1200)
  }

  loading.show()
  await init()
  setTimeout(() => {
    loading.close()
    showNextMessage()
  }, 1200)
})
</script>

<template>
  <div p="x-4 y-10">
    <TheCard />
    <van-notice-bar
      :left-icon="left_icon" scrollable color="#000000" background="white"
      text="英伟达将推出其最新人工智能芯片的中国特..."
    />
    <div class="person-num">
      <img :src="broad" alt="broad" class="broad">
      <div class="b-text">
        当前在线人数：
        <CountTo :start-val="0" :end-val="1567" :decimals="0" :duration="5000" :use-easing="true" />
      </div>
    </div>
    <ThePortfolio />
    <div h30 />
  </div>
  <TheFooter :index="0" />
</template>

<style scoped>
.person-num {
  width: 100%;
  height: 40px;
  border-radius: 6px;
  opacity: 1;
  background: rgba(119, 81, 241, 0.14);
  margin: 10px auto;
  display: flex;
  align-items: center;
  padding-left: 13px;
}

.b-text {
  margin-left: 8px;
  font-size: 16px;
  font-weight: normal;
  line-height: 16px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #6945DC;
}

.broad {
  width: 27px;
  height: 27px;
}
</style>
