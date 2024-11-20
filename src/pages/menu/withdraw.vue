<script setup lang="ts">
import { getWithdrawList } from '~/api'
import type { withdrawType } from '~/types'

const { t } = useI18n()

const list = ref<withdrawType[]>()
const loading = ref(false)

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

onMounted(async () => {
  loading.value = true
  const { data } = await getWithdrawList()
  list.value = data.value.data.data
  list.value?.sort((a: withdrawType, b: withdrawType) => b.id - a.id)
  loading.value = false
})
</script>

<template>
  <div class="font-['PingFang_SC']" bg-trading>
    <TheMenuHead :title="t('me.withdrawal_record.title')" />
    <div h-screen overflow-y-scroll px6.5>
      <TheEmpty v-if="loading || !list?.length" />
      <div v-for="(item, key) in list" :key flex="~ wrap" mt2.5 h41 rounded-lg bg-white :class="getBgStyle()">
        <div wfull>
          {{ t('me.time') }}: {{ item.create_time }}
        </div>
        <div wfull>
          {{ t('me.amount') }}: {{ item.withdraw_money }}
        </div>
        <div wfull>
          {{ t('me.withdrawal_record.service_charge') }}: {{ item.deduct_money }}
        </div>
        <div wfull>
          {{ t('me.withdrawal_record.actual_receipt') }}: {{ item.reality_money }}
        </div>
        <div wfull>
          {{ t('me.type') }}: <span>{{ item.type === 2 ? t('me.withdrawal_record.type.2') : t('me.withdrawal_record.type.1') }}</span>
        </div>
        <div wfull>
          {{ t('me.state') }}:
          <span :class="getStateStyle(item.review_status)">
            {{ getState(item.review_status) }}
          </span>
        </div>
        <div v-if="item.review_status === 2" wfull>
          {{ t('me.withdrawal_record.explain') }}: {{ item.explain }}
        </div>
      </div>
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
