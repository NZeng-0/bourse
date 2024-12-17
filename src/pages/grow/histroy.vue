<script setup lang=ts>
import type { order } from '~/types'
import { getMoneyInvestmentOrderList } from '~/api'

const { t, locale } = useI18n()

const loading = ref(false)
const isDone = ref(false)
const finished = ref(false)
const page = ref(1)
const list = ref<order[]>([])

function width() {
  switch (locale.value) {
    case 'zh-CN':
    case 'zh-TW':
    case 'ja-JP':
      return true
    default:
      return false
  }
}

async function onLoad() {
  loading.value = true
  if (isDone.value) {
    finished.value = true
    loading.value = false
    return
  }
  const { data } = await getMoneyInvestmentOrderList(1, page.value)
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

// onMounted(async () => onLoad())
</script>

<template>
  <TheInfo :current="2" />
  <div flex="~ wrap" justify-center>
    <TheEmpty v-if="list.length <= 0" />
    <div mx5 mt2 wfull text-sm>
      <van-list
        v-model:loading="loading" h-screen wfull overflow-y-auto loading-text=" " finished-text=" " :offset="100"
        pb-120
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
          <div flex="~" mt2 justify-between text-xs class="text-#707070">
            <div :class="width() ? 'w1/3' : 'w1/2'">
              {{ t('fortune.state') }}: {{ t('fortune.state_type.failed') }}
            </div>
            <div v-if="width()" w="1/3" />
            <div :class="width() ? 'w1/3' : 'w1/2'">
              {{ t('fortune.accumulated_earnings') }}: {{ item.now_earnings_money }}
            </div>
          </div>
          <div mt2 flex="~" justify-between text-xs>
            <div w="2/3" class="text-#707070">
              {{ item.create_time }} / {{ item.over_time }}
            </div>
            <div w="1/3" class="text-#673BF6">
              {{ t('fortune.repurchase') }}
            </div>
          </div>
        </div>
        <div h30 />
      </van-list>
    </div>
  </div>
  <TheFooter :index="3" />
</template>
