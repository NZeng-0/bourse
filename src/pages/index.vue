<script setup lang="ts">
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

const messages = ref<IndexMsg[]>()

async function getPopMsg() {
  const { data } = await getIndexMsg()
  messages.value = data.value.data.pop_window_message
}

async function init() {
  // eslint-disable-next-line no-console
  console.log('test')
  Promise.all([getPopMsg()])
}

function showNextMessage(index = 0) {
  // eslint-disable-next-line no-console
  console.log(messages.value)

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
    <ThePortfolio />
    <div h30 />
  </div>
  <TheFooter :index="0" />
</template>
