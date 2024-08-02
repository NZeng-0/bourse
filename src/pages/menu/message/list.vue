<script setup lang="ts">
import { getNoticeList } from '~/api'

const { t } = useI18n()

interface msgTypes {
  id: number
  key: string
  condition: string
  value: string
  link: string | null
  remark: string
  status: number
  sort: number
  start_time: string
  end_time: string | null
  create_time: string
}

const list: Ref<msgTypes[]> = ref([])

onMounted(async () => {
  const { data } = await getNoticeList()
  list.value = data.value.data
})

function getBgStyle() {
  return ' pl6.5 py5.5 pr4 text-sm text-black mt2.5 h23 rounded-lg bg-white'
}
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('me.message.title')" />
    <div h-screen overflow-y-scroll px3>
      <TheEmpty v-show="list.length <= 0" />
      <div v-for="(item, key) in list" :key flex="~ wrap" :class="getBgStyle()">
        <div wfull flex="~" items-center justify-between>
          <div flex="~" items-center text-lg>
            {{ item.remark }}
            <div ml2 h2 w2 rounded-full bg-btn-select />
          </div>
          <div>
            {{ item.start_time }}
          </div>
        </div>
        <div mt2 text-sm opacity60>
          {{ item.value }}
        </div>
      </div>
      <div h50 />
    </div>
  </div>
</template>
