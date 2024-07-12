<script setup lang="ts">
const { t } = useI18n()

const list = [
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    serviceCharge: 2,
    actual: '',
    type: t('me.withdrawal_record.type.1'),
    state: 1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    serviceCharge: 2,
    actual: '',
    type: t('me.withdrawal_record.type.1'),
    state: 0,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    serviceCharge: 2,
    actual: '',
    type: t('me.withdrawal_record.type.2'),
    state: -1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    serviceCharge: 2,
    actual: '',
    type: t('me.withdrawal_record.type.1'),
    state: -1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    serviceCharge: 2,
    actual: '',
    type: t('me.withdrawal_record.type.1'),
    state: -1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    serviceCharge: 2,
    actual: '',
    type: t('me.withdrawal_record.type.2'),
    state: 0,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    serviceCharge: 2,
    actual: '',
    type: t('me.withdrawal_record.type.1'),
    state: -1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    serviceCharge: 2,
    actual: '',
    type: t('me.withdrawal_record.type.1'),
    state: 1,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 992265,
    serviceCharge: 2,
    actual: '',
    type: t('me.withdrawal_record.type.1'),
    state: -1,
  },
]

function getBgStyle() {
  return ' py2.5 pl2.5 text-sm text-#030319'
}

function getState(state: number) {
  return state === 1
    ? t('me.withdrawal_record.successful')
    : state === 0
      ? t('me.withdrawal_record.under_review')
      : t('me.withdrawal_record.failed')
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
    <TheMenuHead title="提现记录" />
    <div h-screen overflow-y-scroll px6.5>
      <div v-for="(item, key) in list" :key flex="~ wrap" mt2.5 h41 rounded-lg bg-white :class="getBgStyle()">
        <div wfull>
          {{ t('me.time') }}: {{ item.time }}
        </div>
        <div wfull>
          {{ t('me.amount') }}: {{ item.amount }}
        </div>
        <div wfull>
          {{ t('me.withdrawal_record.service_charge') }}: {{ item.serviceCharge }}%
        </div>
        <div wfull>
          {{ t('me.withdrawal_record.actual_receipt') }}: {{ item.actual }}
        </div>
        <div wfull>
          {{ t('me.type') }}: <span>{{ item.type }}</span>
        </div>
        <div wfull>
          {{ t('me.state') }}:
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
