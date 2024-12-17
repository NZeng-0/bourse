<script setup lang="ts">
import { getUserInvestmentBillList } from '~/api'

interface listType {
  money: string
  type: number
  info: string
  before_change_money: string
  after_change_money: string
  create_time: string
}

const { t } = useI18n()
const list = ref<listType[]>([])
const loading = ref(false)
const my_loading = ref(false)
const isDone = ref(false)
const finished = ref(false)
const page = ref(1)

function getBgStyle() {
  return ' py2.5 pl2.5 text-sm text-#030319'
}

function getInfo(value: string) {
  const arr = value.split('|')

  return arr[0].split('｜')[0]
}

async function onLoad() {
  loading.value = true
  if (isDone.value) {
    finished.value = true
    loading.value = false
    return
  }
  const { data } = await getUserInvestmentBillList()

  if (data.value.data.data.length < 1) {
    isDone.value = true
    finished.value = true
    loading.value = false
    return
  }

  list.value.push(...data.value.data.data)
  isDone.value = true
  loading.value = false
  finished.value = true
  my_loading.value = false
  loading.value = false
  page.value++
}
</script>

<template>
  <TheMenuHead :title="t('yuEBaoRecord')" />
  <div bg-trading px6.5>
    <TheEmpty v-if="list.length <= 0" />

    <van-list
      v-model:loading="loading" h-screen wfull overflow-y-auto loading-text=" " finished-text=" " :offset="100"
      pb-120 @load="onLoad()"
    >
      <div v-for="(item, key) in list" :key flex="~ wrap" mt2.5 h30 rounded-lg bg-white :class="getBgStyle()">
        <div wfull>
          {{ t('me.time') }}: {{ item.create_time }}
        </div>
        <div wfull>
          {{ t('me.amount') }}: <span :color="item.type === 1 ? '#40BF6A' : '#DD4646'">
            {{ item.money }}
          </span>
        </div>
        <div wfull>
          {{ t('me.type') }}: <span>{{ getInfo(item.info) }}</span>
        </div>
        <div wfull>
          {{ t('fortune.available') }}: <span>{{ item.after_change_money }}</span>
        </div>
      </div>
    </van-list>
    <TheFooter :index="3" />
  </div>
</template>
