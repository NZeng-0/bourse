<script setup lang="ts">
const list = [
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    type: '银行卡入款',
    state: 1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    type: '银行卡入款',
    state: -1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    type: '银行卡入款',
    state: 1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    type: '银行卡入款',
    state: 1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    type: '银行卡入款',
    state: -1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    type: '银行卡入款',
    state: 1,
  },
]

function getBgStyle() {
  return ' py2.5 pl2.5 text-sm text-#030319'
}

function getState(state: number) {
  return state === 1
    ? '申请成功'
    : state === 0
      ? '审核中'
      : '申请失败'
}

function getStateStyle(state: number) {
  return state === 1
    ? 'text-#40BF6A'
    : state === 0
      ? 'text-#4400FF'
      : 'text-#DD4646'
}
</script>

<template>
  <div class="font-['PingFang_SC']" bg-trading>
    <TheMenuHead title="充值记录" />
    <div h-screen overflow-y-scroll px6.5>
      <div v-for="(item, key) in list" :key flex="~ wrap" mt2.5 h30 rounded-lg bg-white :class="getBgStyle()">
        <div wfull>
          时间: {{ item.time }}
        </div>
        <div wfull>
          金额: {{ item.amount }}
        </div>
        <div wfull>
          类型: <span>{{ item.type }}</span>
        </div>
        <div wfull>
          状态:
          <span :class="getStateStyle(item.state)">
            {{ getState(item.state) }}
          </span>
        </div>
      </div>
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
