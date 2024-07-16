<script setup lang="ts">
const route = useRouter()
const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
const down = new URL('~/assets/images/order/down.png', import.meta.url).href
const up = new URL('~/assets/images/order/up.png', import.meta.url).href

const { t } = useI18n()

const data = ref([
  {
    title: t('order.product_1'),
    method: t('order.buy_of_fall'),
    amount: 1000,
    buy: 104.6288,
    presentValue: 104.4688,
    time: 300,
    profitAndLoss: 8,
    prospective: 18.562,
    buyTime: '2022-08-08 10:10',
    expireTime: '2022-08-13 10:10',
  },
])

function getCurrent(current: number) {
  return current < 0 ? 'text-#DF2040' : 'text-#38B781'
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
    <div mt2.8 flex="~" justify-center px6>
      <div flex="~" h12 wfull items-center rounded-2xl bg-white p1.3 text-base>
        <button w="1/2" hfull leading-5 @click="go('to-hold')">
          {{ t('order.hold_order') }}
        </button>
        <button w="1/2" class="rounded-14" hfull bg-btn-select text-white leading-4 @click="go('history')">
          {{ t('order.history') }}
        </button>
      </div>
    </div>
    <div h-screen overflow-y-scroll px2>
      <div v-for="(item, key) in data" :key mt2.8 min-h50 rounded-lg bg-white px2 py2.3>
        <div flex="~">
          <div text-lg leading-5>
            {{ item.title }}
          </div>
          <div ml2>
            <img :src="item.method === t('order.buy_of_fall') ? down : up" mt1.05 h4.5 w4.5>
          </div>
          <div ml1.1 mt0.35 text-sm font-normal class="text-#030319">
            {{ item.method }}
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
                {{ item.amount }}
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
                {{ item.buy }}
              </div>
            </div>
            <div h="1/2" mt2>
              <div flex="~" justify-center text-center>
                <div px4 text-center>
                  <p>
                    {{ t('order.profit_and_loss') }}
                  </p>
                </div>
              </div>
              <div flex="~" justify-center>
                {{ item.profitAndLoss }}%
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
              <div flex="~" justify-center :class="getCurrent(item.prospective)">
                {{ item.presentValue }}
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
              <div flex="~" justify-center :class="prospectiveStyle(item.prospective)">
                {{ item.prospective > 0 ? `+${item.prospective}` : `${item.prospective}` }}
              </div>
            </div>
          </div>
        </div>
        <div mt2.5 border border-white text-sm font-normal>
          <div>
            {{ t('order.buying_time') }}: {{ item.buyTime }}
          </div>
          <div>
            {{ t('order.settlement_time') }}: {{ item.expireTime }}
          </div>
        </div>
      </div>
      <div h60 />
    </div>
  </div>
  <TheFooter :index="2" />
</template>
