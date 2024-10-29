<script setup lang="ts">
import type { dataType } from '~/types'
import { getProductOrderList } from '~/api'

const { t } = useI18n()
const route = useRouter()
const my_loading = ref(true)
const loading = ref(false)
const finished = ref(false)
const page = ref<number>(1)
const list = ref<dataType[]>()
const isDone = ref(false)

function go(uri: string) {
  route.push(`/menu/order/${uri}`)
}

async function onLoad() {
  loading.value = true
  if (isDone.value) {
    finished.value = true
    loading.value = false
    return
  }
  const { data } = await getProductOrderList(1, page.value)
  if (data.value.data.data.length < 1) {
    isDone.value = true
    finished.value = true
    loading.value = false
    return
  }
  list.value = data.value.data.data
  my_loading.value = false
  finished.value = false
  loading.value = false
  page.value++
}
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('order.newTitle')" />
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
      <TheEmpty v-if="my_loading" />
      <van-list v-model:loading="loading" loading-text=" " finished-text=" " :offset="100" @load="onLoad">
        <OrderItem v-for="(data, key) in list" :key :data :history="false" />
      </van-list>
      <div h60 />
    </div>
  </div>
  <TheFooter :index="1" />
</template>
