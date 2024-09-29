<script setup lang="ts">
import pop from '~/components/popup'
import { getConfigList, getIndexMsg, getIndexSlideshowMessage } from '~/api'
import loading from '~/components/loading'
import { useCompnay } from '~/store/useCompany'
import type { IndexMsg, messageTypes, withdrawMethodType } from '~/types'
import { useConf } from '~/store/useConf'
import { useLocalCache } from '~/hook'

const { getCache } = useLocalCache()
const company = useCompnay()

const { t } = useI18n()
const conf = useConf()

const left_icon = new URL('../assets/images/inform.png', import.meta.url).href
const broad = new URL('../assets/images/broadcast.png', import.meta.url).href

const messages = ref<IndexMsg[]>()
const slide = ref<messageTypes[]>()
const min = ref<number>(0)
const max = ref<number>(1)
const store = ref<number>(0)

async function getPopMsg() {
  const { data } = await getIndexMsg()
  messages.value = data.value.data.pop_window_message
  company.data = data.value.data.company_explain
}

async function getSlide() {
  const { data } = await getIndexSlideshowMessage()
  slide.value = data.value.data
}

async function init() {
  Promise.all([getPopMsg(), getSlide()])
}

function showNextMessage(index = 0) {
  const storeDate = getCache('popups')
  const now = new Date(Date.now()).toISOString().split('T')[0]

  if (messages.value === undefined)
    return
  if (index < messages.value!.length) {
    if (now <= storeDate)
      return
    const e = messages.value![index]
    pop({
      message: e.value,
      title: e.remark,
      submit: t('popup.confrim'),
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
  setInterval(() => {
    min.value += 1
    if (min.value >= max.value) {
      min.value = max.value
      const timer = setTimeout(() => {
        min.value = store.value
        clearTimeout(timer)
      }, 1000)
    }
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
  if (conf.data === undefined) {
    const { data } = await getConfigList()
    conf.data = data.value.data

    getNum()
  }
  else {
    getNum()
  }

  setTimeout(() => {
    loading.close()
    showNextMessage()
  }, 1200)
  animateNumber()
})
</script>

<template>
  <div p="x-4 y-10">
    <TheCard />
    <van-notice-bar :scrollable="true" :left-icon="left_icon" color="#000000" background="white">
      <div v-for="(item, key) in slide" :key v-html="item?.value" />
    </van-notice-bar>
    <div class="person-num">
      <img :src="broad" alt="broad" class="broad">
      <div class="b-text">
        当前在线人数：
        {{ min }}
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
