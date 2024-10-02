<script setup lang="ts">
import { getProductOrderList } from '~/api'
import type { dataType } from '~/types'

const route = useRouter()
const loading = ref(false)
const { t } = useI18n()

const list = ref<dataType[]>()

function go(uri: string) {
  route.push(`/menu/order/${uri}`)
}

onMounted(async () => {
  loading.value = true
  const { data } = await getProductOrderList(2)
  list.value = data.value.data
  loading.value = false
})
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('order.newTitle')" />
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
      <TheEmpty v-if="loading" />
      <OrderItem v-for="(data, key) in list" :key :data :history="true" />
      <div h60 />
    </div>
  </div>
  <TheFooter :index="1" />
</template>
