<script setup lang="ts">
const route = useRouter()
const backUrl = new URL('~/assets/images/trading/back.png', import.meta.url).href
const down = new URL('~/assets/images/order/down.png', import.meta.url).href
const up = new URL('~/assets/images/order/up.png', import.meta.url).href
const data = ref([
  {
    title: '美元指数',
    method: '买跌',
    amount: 1000,
    buy: 104.6288,
    presentValue: 104.4688,
    time: 300,
    beLeft: 270,
    prospective: 18.562,
    buyTime: '2022-08-08 10:10',
    expireTime: '2022-08-13 10:10',
  },
  {
    title: '美元/欧元',
    method: '买涨',
    amount: 1000,
    buy: 104.6288,
    presentValue: 104.5782,
    time: 600,
    beLeft: 270,
    prospective: -18.562,
    buyTime: '2022-08-08 10:10',
    expireTime: '2022-08-13 10:10',
  },
  {
    title: '美元指数',
    method: '买跌',
    amount: 1000,
    buy: 104.6288,
    presentValue: 104.4688,
    time: 300,
    beLeft: 270,
    prospective: 18.562,
    buyTime: '2022-08-08 10:10',
    expireTime: '2022-08-13 10:10',
  },
  {
    title: '美元/欧元',
    method: '买涨',
    amount: 1000,
    buy: 104.6288,
    presentValue: 104.5782,
    time: 600,
    beLeft: 270,
    prospective: -18.562,
    buyTime: '2022-08-08 10:10',
    expireTime: '2022-08-13 10:10',
  },
  {
    title: '美元指数',
    method: '买跌',
    amount: 1000,
    buy: 104.6288,
    presentValue: 104.4688,
    time: 300,
    beLeft: 270,
    prospective: 18.562,
    buyTime: '2022-08-08 10:10',
    expireTime: '2022-08-13 10:10',
  },
  {
    title: '美元/欧元',
    method: '买涨',
    amount: 1000,
    buy: 104.6288,
    presentValue: 104.5782,
    time: 600,
    beLeft: 270,
    prospective: -18.562,
    buyTime: '2022-08-08 10:10',
    expireTime: '2022-08-13 10:10',
  },
  {
    title: '美元指数',
    method: '买跌',
    amount: 1000,
    buy: 104.6288,
    presentValue: 104.4688,
    time: 300,
    beLeft: 270,
    prospective: 18.562,
    buyTime: '2022-08-08 10:10',
    expireTime: '2022-08-13 10:10',
  },
  {
    title: '美元/欧元',
    method: '买涨',
    amount: 1000,
    buy: 104.6288,
    presentValue: 104.5782,
    time: 600,
    beLeft: 270,
    prospective: -18.562,
    buyTime: '2022-08-08 10:10',
    expireTime: '2022-08-13 10:10',
  },
])

function getMinute(time: number) {
  const minute = Math.floor(time / 60)
  const rest_seconds = time % 60
  return `00:${minute.toString().padStart(2, '0')}:${rest_seconds.toString().padStart(2, '0')}`
}

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
  <div hscreen bg-trading>
    <div flex="~" h27 items-center justify-between rounded-b-2xl bg-white px4>
      <img :src="backUrl" h10 w10 @click="back()">
      <div text-xl text-trading-title>
        交易订单
      </div>
      <div h10 w10 />
    </div>
    <div flex="~" mt2.8 justify-center px6>
      <div flex="~" h12 wfull items-center rounded-2xl bg-white p1.3 text-base>
        <button w="1/2" class="rounded-14" hfull bg-btn-select text-white leading-4 @click="go('to-hold')">
          持仓订单
        </button>
        <button w="1/2" hfull leading-5 @click="go('history')">
          历史明细
        </button>
      </div>
    </div>
    <div h-screen overflow-y-scroll px2>
      <div v-for="(item, key) in data" :key mt2.8 h50 rounded-lg bg-white px2 py2.3>
        <div wfull>
          <div flex="~">
            <div text-lg leading-5>
              {{ item.title }}
            </div>
            <div ml2>
              <img :src="item.method === '买跌' ? down : up" mt1.05 h4.5 w4.5>
            </div>
            <div ml1.1 mt0.35 text-sm font-normal class="text-#030319">
              {{ item.method }}
            </div>
          </div>
          <div mt2.5>
            <div flex="~" justify-between>
              <div w="1/3">
                <div>
                  购买金额
                </div>
                <div>
                  {{ item.amount }}
                </div>
              </div>
              <div w="1/3">
                <div flex="~" justify-center>
                  买入价
                </div>
                <div flex="~" justify-center>
                  {{ item.buy }}
                </div>
              </div>
              <div w="1/3">
                <div flex="~" justify-center>
                  现价
                </div>
                <div flex="~" justify-center :class="getCurrent(item.prospective)">
                  {{ item.presentValue }}
                </div>
              </div>
            </div>
            <div mt3 flex="~" wfull justify-between>
              <div w="1/3">
                <div>
                  订单时间
                </div>
                <div>
                  {{ item.time }}
                </div>
              </div>
              <div w="1/3">
                <div flex="~" justify-center>
                  剩余时间
                </div>
                <div flex="~" justify-center>
                  {{ getMinute(item.beLeft) }}
                </div>
              </div>
              <div w="1/3">
                <div flex="~" justify-center>
                  预计收益
                </div>
                <div flex="~" justify-center :class="prospectiveStyle(item.prospective)">
                  {{ item.prospective > 0 ? `+${item.prospective}` : `${item.prospective}` }}
                </div>
              </div>
            </div>
          </div>
          <div mt1.5 text-sm font-normal>
            <div>买入时间: {{ item.buyTime }}</div>
            <div>结算时间: {{ item.expireTime }}</div>
          </div>
        </div>
      </div>
      <div h60 />
    </div>
  </div>
  <TheFooter :index="2" />
</template>
