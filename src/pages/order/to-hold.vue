<script setup lang="ts">
import { getProductOrderList } from '~/api'

const route = useRouter()
const { t } = useI18n()

const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
const down = new URL('~/assets/images/order/down.png', import.meta.url).href
const up = new URL('~/assets/images/order/up.png', import.meta.url).href

interface dataType {
  id: number
  order_sn: string
  product_id: number
  uid: number
  status: number
  type: number
  jcdw: string
  pcdw: string | null
  time: string
  wtye: string
  wxwtye: string
  yxwtye: string
  earnings_money: string
  predict_earnings_money: string
  profit_loss_rate: string
  settle_time: string | null
  create_time: string
  product_name: string
  price: string
}

const list = ref<dataType[]>()

function getMinute(time: number) {
  const minute = Math.floor(time / 60)
  const rest_seconds = time % 60
  return `00:${minute.toString().padStart(2, '0')}:${rest_seconds.toString().padStart(2, '0')}`
}

function getCurrent(current: number) {
  return current === 1 ? 'text-#DF2040' : 'text-#38B781'
}

function prospectiveStyle(prospective: number) {
  return prospective > 0 ? 'text-#DF2040' : 'text-#38B781'
}

function go(uri: string) {
  route.push(`/order/${uri}`)
}
function back() {
  route.back()
}

onMounted(async () => {
  const { data } = await getProductOrderList(1)
  list.value = data.value.data
})
</script>

<template>
  <div bg-trading>
    <div flex="~" h27 items-center justify-between rounded-b-2xl bg-white px4>
      <img :src="backUrl" h10 w10 @click="back()">
      <div text-xl text-trading-title>
        {{ t('order.title') }}
      </div>
      <div h10 w10 />
    </div>
    <div flex="~" mt2.8 justify-center px6>
      <div flex="~" h12 wfull items-center rounded-2xl bg-white p1.3 text-base>
        <button w="1/2" class="rounded-14" hfull bg-btn-select text-white leading-4 @click="go('to-hold')">
          {{ t('order.hold_order') }}
        </button>
        <button w="1/2" hfull leading-5 @click="go('history')">
          {{ t('order.history') }}
        </button>
      </div>
    </div>
    <div h-screen overflow-y-scroll px2>
      <div v-for="(item, key) in list" :key mt2.8 min-h50 rounded-lg bg-white px2 py2.3>
        <div flex="~">
          <div text-lg leading-5>
            {{ item.product_name }}
          </div>
          <div ml2>
            <img :src="item.type === 1 ? up : down" mt1.05 h4.5 w4.5>
          </div>
          <div ml1.1 mt0.35 text-sm font-normal class="text-#030319">
            {{ item.type === 1 ? '买涨' : '买跌' }}
          </div>
        </div>
        <div flex="~" mt2.5 justify-between>
          <div w="1/3">
            <div h="1/2">
              <div pr4>
                <p>
                  {{ t('order.purchase_amount') }}
                </p>
              </div>
              <div>
                {{ item.wtye }}
              </div>
            </div>
            <div h="1/2" mt2>
              <div pr4>
                <p>
                  {{ t('order.order_time') }}
                </p>
              </div>
              <div>
                {{ item.time }}秒
              </div>
            </div>
          </div>
          <div w="1/3">
            <div h="1/2">
              <div flex="~" justify-center>
                <div px4 text-center>
                  <p>
                    {{ t('order.buying_price') }}
                  </p>
                </div>
              </div>
              <div flex="~" justify-center>
                {{ item.jcdw }}
              </div>
            </div>
            <div h="1/2" mt2>
              <div flex="~" justify-center text-center>
                <div px4 text-center>
                  <p>
                    {{ t('order.remaining_time') }}
                  </p>
                </div>
              </div>
              <div flex="~" justify-center>
                {{ getMinute(Number.parseInt(item.time)) }}
              </div>
            </div>
          </div>
          <div w="1/3">
            <div h="1/2">
              <div flex="~" justify-center>
                <div text-center>
                  <p>
                    {{ t('order.current_price') }}
                  </p>
                </div>
              </div>
              <div flex="~" justify-center :class="getCurrent(item.type)">
                {{ item.price }}
              </div>
            </div>
            <div h="1/2" mt2>
              <div flex="~" justify-center>
                <div text-center>
                  <p>
                    {{ t('order.expected_income') }}
                  </p>
                </div>
              </div>
              <div flex="~" justify-center :class="prospectiveStyle(Number.parseInt(item.predict_earnings_money))">
                {{ item.predict_earnings_money }}
              </div>
            </div>
          </div>
        </div>
        <div mt2.5 border border-white text-sm font-normal>
          <div>
            {{ t('order.buying_time') }}: {{ item.create_time }}
          </div>
          <div>
            {{ t('order.settlement_time') }}: {{ item.settle_time }}
          </div>
        </div>
      </div>
      <div h60 />
    </div>
  </div>
  <TheFooter :index="2" />
</template>
