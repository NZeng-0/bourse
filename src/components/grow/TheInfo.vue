<script setup lang="ts">
import { getTotalMoneyAndYesterdayMoney } from '~/api'
import type { userTypes } from '~/store/useUser'
import { useUser } from '~/store/useUser'
import { useMoney } from '~/store/useMoney'

const props = defineProps<{
  current: number
}>()

const userStore = useUser()
const user = shallowRef<userTypes>()
const moneyStore = useMoney()

const { t } = useI18n()
const route = useRouter()

const index = ref(0)

const bg = new URL('../../assets/images/grow/cardd.png', import.meta.url).href

function selected(index: number) {
  return props.current === index ? 'text-#673BF6' : 'text-#121826'
}

function changeCurrent(current: number, to: string) {
  index.value = current
  route.push({
    path: `/${to}`,
  })
}

async function init() {
  const { data } = await getTotalMoneyAndYesterdayMoney()
  moneyStore.money = data.value.data
}

onMounted(async () => {
  user.value = userStore.data
  await init()
})
</script>

<template>
  <div mt6 wfull text-center text-3xl>
    {{ t('fortune.title') }}
  </div>
  <div class="bg" relative mx7 mt5.5 h68 w80 overflow-hidden rounded-2xl text-white>
    <div ml6 mt8 text-base>
      {{ t('fortune.balance') }}
    </div>
    <div flex="~" ml6 mt2.8 items-center justify-between text-3xl>
      {{ moneyStore.money?.total_money }}
      <div>
        <img :src="bg" mr6.5 h7>
      </div>
    </div>
    <div flex="~" h31 items-center justify-between>
      <div ml6 text-sm>
        <div text-center>
          {{ t('fortune.yesterdays_earnings') }}
        </div>
        <div mt3.5 text-center>
          {{ moneyStore.money?.yesterday_earnings_money }}
        </div>
      </div>
      <div text-sm>
        <div text-center>
          {{ t('fortune.accumulated_earnings') }}
        </div>
        <div mt3.5 text-center>
          100
        </div>
      </div>
      <div mr7 text-sm>
        <div text-center>
          {{ t('fortune.yesterdays_balance') }}
        </div>
        <div mt3.5 text-center>
          {{ user?.now_money }}
        </div>
      </div>
    </div>
    <div flex="~" justify-around>
      <RouterLink to="/YuEBao/transfer-in">
        <div flex="~" h8.8 min-w25.6 items-center justify-center border rounded-lg px1>
          {{ t('fortune.transfer_in.title') }}
        </div>
      </RouterLink>
      <RouterLink to="/YuEBao/transfer-out">
        <div flex="~" h8.8 min-w25.6 items-center justify-center border rounded-lg px1>
          {{ t('fortune.transfer_out.title') }}
        </div>
      </RouterLink>
    </div>
  </div>
  <div mx8 wfull>
    <div flex="~" mt5 items-center justify-between>
      <b :class="selected(0)" w="1/3" px2 text-center text-base @click="changeCurrent(0, 'grow/solution')">
        <p>
          {{ t('fortune.fixture_plan') }}
        </p>
      </b>
      <b :class="selected(1)" w="1/3" px2 text-center text-base @click="changeCurrent(1, 'grow/current')">
        <p>
          {{ t('fortune.current_yield') }}
        </p>
      </b>
      <b :class="selected(2)" w="1/3" px2 text-center text-base @click="changeCurrent(2, 'grow/histroy')">
        <p>
          {{ t('fortune.historical_yield') }}
        </p>
      </b>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background: url(../../assets/images/grow/bg.png);
  background-size: cover;
}
</style>
