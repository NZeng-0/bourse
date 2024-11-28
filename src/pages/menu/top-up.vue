<script setup lang="ts">
import { getRechargeList } from '~/api'

const { t } = useI18n()

const list: Ref<recordTyps[]> = ref([])
const loading = ref(false)

interface recordTyps {
  id: number
  uid: number
  order_sn: string
  money: string
  type: number
  pay_storageImage: string
  status: number
  explain: string
  type_info: string
  pay_type: string | null
  create_time: string
}

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
  const { data } = await getRechargeList()
  list.value = data.value.data.data
  loading.value = false
})
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('me.recharge_record.title')" />
    <div h-screen overflow-y-scroll px6.5>
      <TheEmpty v-if="loading || !list?.length" />
      <div v-for="(item, key) in list" :key flex="~ wrap" mt2.5 h30 rounded-lg bg-white :class="getBgStyle()">
        <div wfull>
          {{ t('me.time') }}: {{ item.create_time }}
        </div>
        <div wfull>
          {{ t('me.amount') }}: {{ item.money }}
        </div>
        <div wfull>
          {{ t('me.type') }}: <span>{{ item.type === 1 ? t('back') : t('front') }}</span>
        </div>
        <div wfull>
          {{ t('me.state') }}:
          <span :class="getStateStyle(item.status)">
            {{ getState(item.status) }}
          </span>
        </div>
        <div v-if="item.status === 2" wfull>
          {{ t('me.withdrawal_record.explain') }}: {{ item.explain }}
        </div>
      </div>
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
