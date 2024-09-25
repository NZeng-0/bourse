<script setup lang="ts">
import { getNoticeList } from '~/api'
import type { msgTypes } from '~/types'
import { useMessage } from '~/store/useMessage'

const { t } = useI18n()
const msgStore = useMessage()

const list: Ref<msgTypes[]> = ref(msgStore.msg)

onMounted(async () => {
  const { data } = await getNoticeList()
  msgStore.msg = data.value.data.data
  list.value = data.value.data.data
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
            {{ item.title }}
            <div ml2 h2 w2 rounded-full bg-btn-select />
          </div>
          <div>
            {{ item.create_time }}
          </div>
        </div>
        <div mt2 text-sm opacity60>
          {{ item.message }}
        </div>
      </div>
      <div h50 />
    </div>
  </div>
</template>
