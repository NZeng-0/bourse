<script setup lang="ts">
import pop from '~/components/popup'
import {
  getConfigList,
  getIndexMsg,
  getIndexSlideshowMessage,
} from '~/api'
import loading from '~/components/loading'
import { useCompnay } from '~/store/useCompany'
import type {
  IndexMsg,
  messageTypes,
  swipeType,
  withdrawMethodType,
} from '~/types'
import { useConf } from '~/store/useConf'
import { usePopup } from '~/store/usePopupDay'

const company = useCompnay()
const proup = usePopup()

const { t } = useI18n()
const conf = useConf()

const left_icon = new URL('../assets/images/inform.png', import.meta.url).href
const broad = new URL('../assets/images/broadcast.png', import.meta.url).href

const messages = ref<IndexMsg[]>()
const slide = ref<messageTypes[]>()
const min = ref<number>(0)
const max = ref<number>(1)
const store = ref<number>(0)
const onlineShow = ref<boolean>(true)
const swipe = ref<swipeType[]>([
  {
    id: 13,
    key: 'lbt',
    condition: null,
    value: new URL('../assets/images/swipe/1.png', import.meta.url).href,
    link: 'www.baidu.com',
    remark: '轮播图',
    status: 1,
    sort: 0,
    type: 0,
    start_time: null,
    end_time: null,
    create_time: '2024-07-07 16:04:24',
  },
])

async function getPopMsg() {
  const { data } = await getIndexMsg()
  swipe.value = data.value.data.lbt
  messages.value = data.value.data.pop_window_message
  company.data = data.value.data.company_explain
}

async function getSlide() {
  const { data } = await getIndexSlideshowMessage()
  slide.value = data.value.data
}

async function init() {
  await Promise.all([getPopMsg(), getSlide()])
}

function showNextMessage(index = 0) {
  const storeDate = proup.day
  const now = new Date(Date.now()).toISOString().split('T')[0]

  if (now <= storeDate)
    return

  if (messages.value === undefined)
    return
  if (index < messages.value!.length) {
    const e = messages.value![index]
    pop({
      message: e.value,
      title: e.remark,
      submit: t('popup.confrim'),
      notShow: t('notShow'),
      onClose: () => showNextMessage(index + 1),
    })
  }
}

function getNum() {
  if (conf.data === undefined)
    return
  conf.data!.forEach((e: withdrawMethodType) => {
    if (e.key === 'persion_number_section') {
      if (e.status === 1) {
        min.value = useToNumber(e.value.split(',')[0]).value
        max.value = useToNumber(e.value.split(',')[1]).value
        store.value = useToNumber(e.value.split(',')[0]).value
      }
    }
  })
}

function animateNumber() {
  const online = conf.data.find((item: withdrawMethodType) => item.key === 'online_number_show').value
  online === '0' ? onlineShow.value = false : onlineShow.value = true
  if (online === '0')
    return

  setInterval(() => {
    const range = Math.floor(Math.random() * ((max.value - min.value) * 0.05))
    const adjustment = Math.floor(Math.random() * (2 * range + 1)) - range
    min.value = store.value + adjustment
  }, 1000)
}

onMounted(async () => {
  if (window.name === '') {
    window.name = 'refresh'
  }
  else if (window.name === 'refresh') {
    loading.show()
    setTimeout(() => {
      loading.close()
    }, 1200)
  }

  loading.show()
  await init()
  const { data } = await getConfigList()
  conf.data = data.value.data
  getNum()

  setTimeout(() => {
    loading.close()
    showNextMessage()
  }, 1200)
  animateNumber()
})
</script>

<template>
  <div h-screen overflow-y-scroll p="x-4 y-10">
    <TheCard :swipe />
    <van-notice-bar :scrollable="true" :left-icon="left_icon" color="#000000" background="white">
      <div v-for="(item, key) in slide" :key v-html="item?.value" />
    </van-notice-bar>
    <div v-if="onlineShow" class="person-num">
      <img :src="broad" alt="broad" class="broad">
      <div class="b-text">
        {{ t('current_online') }}: {{ min }}
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
  height: 2.857rem;
  border-radius: 0.429rem;
  opacity: 1;
  background: rgba(119, 81, 241, 0.14);
  margin: 0.714rem auto;
  display: flex;
  align-items: center;
  padding-left: 0.929rem;
}

.b-text {
  margin-left: 0.571rem;
  font-size: 1.143rem;
  font-weight: normal;
  line-height: 1.143rem;
  letter-spacing: 0em;
  color: #6945DC;
}

.broad {
  width: 1.929rem;
  height: 1.929rem;
}
</style>
