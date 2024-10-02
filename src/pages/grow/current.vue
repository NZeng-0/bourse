<script setup lang=ts>
import type { order } from '~/types'
import { getMoneyInvestmentOrderList, prolongMoneyInvestment, quitMoneyInvestment } from '~/api'

const { t, locale } = useI18n()

const isLoading = ref(false)
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

  await init()
}

async function renew(id: number) {
  const { data } = await prolongMoneyInvestment({ id })
  showToast({
    message: data.value.msg,
  })

  await init()
}

async function init() {
  const { data } = await getMoneyInvestmentOrderList(0)
  list.value = data.value.data.data
}

onMounted(async () => {
  isLoading.value = true
  await init()
  isLoading.value = false
})
</script>

<template>
  <div>
    <div flex="~ wrap" justify-center>
      <TheInfo :current="1" />
      <div mx5 mt2 h-screen wfull overflow-x-scroll text-sm>
        <TheEmpty v-if="isLoading" />
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
        <div h140 />
      </div>
    </div>
    <TheFooter :index="3" />
  </div>
</template>
