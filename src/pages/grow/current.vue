<script setup lang=ts>
import type { order } from '~/types'
import { getMoneyInvestmentOrderList, prolongMoneyInvestment, quitMoneyInvestment } from '~/api'

const { t, locale } = useI18n()

const loading = ref(false)
const isDone = ref(false)
const finished = ref(false)
const page = ref(1)
const list = ref<order[]>([])

function margin() {
  switch (locale.value) {
    case 'zh-CN':
    case 'zh-TW':
    case 'ja-JP':
      return 'mt2'
    default:
      return ''
  }
}

async function terminate(id: number) {
  const { data } = await quitMoneyInvestment({ id })
  showToast({
    message: data.value.msg,
    duration: 1500,
  })

  await onLoad()
}

async function renew(id: number) {
  const { data } = await prolongMoneyInvestment({ id })
  showToast({
    message: data.value.msg,
  })

  await onLoad()
}

async function onLoad() {
  loading.value = true
  if (isDone.value) {
    finished.value = true
    loading.value = false
    return
  }
  const { data } = await getMoneyInvestmentOrderList(0, page.value)
  if (data.value.data.data.length < 1) {
    isDone.value = true
    finished.value = true
    loading.value = false
    return
  }
  list.value.push(...data.value.data.data)
  loading.value = false
  page.value++
}

onMounted(async () => onLoad())
</script>

<template>
  <div flex="~ wrap" justify-center>
    <TheInfo :current="1" />
    <TheEmpty v-if="list.length <= 0" />
    <div mx5 mt2 wfull text-sm>
      <van-list
        v-model:loading="loading" h="25%" wfull overflow-y-auto loading-text=" " finished-text=" " :offset="100"
        @load="onLoad"
      >
        <div v-for="(item, key) in list" :key mt4 h20 border rounded-lg pl2>
          <div flex="~" mt2 justify-between text-sm>
            <div w="1/3">
              {{ item.money_investment_name }}
            </div>
            <div w="1/3" />
            <div w="1/3">
              {{ item.price }}
            </div>
          </div>
          <div flex="~" :class="margin()" items-center justify-between text-xs class="text-#707070">
            <div w="1/3">
              {{ t('fortune.state') }}: {{ t('fortune.state_type.underway') }}
            </div>
            <div w="1/3">
              {{ t('fortune.current_yield') }}: {{ item.now_earnings_money }}
            </div>
            <div w="1/3">
              {{ t('fortune.projected_revenue') }}: {{ item.rate_price }}
            </div>
          </div>
          <div flex="~" :class="margin()" justify-between text-xs>
            <div w="1/2" class="text-#707070">
              {{ item.over_time }}
            </div>
            <div w="1/2" text-center text-black>
              <span class="text-#673BF6" @click="terminate(item.id)">
                {{ t('fortune.termination') }}
              </span>
              |
              <span class="text-#673BF6" @click="renew(item.id)">
                {{ t('fortune.renewal') }}
              </span>
            </div>
          </div>
        </div>
        <div h30 />
      </van-list>
    </div>
  </div>
  <TheFooter :index="3" />
</template>
