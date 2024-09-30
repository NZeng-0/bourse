<script setup lang="ts">
import { getNoticeList } from '~/api'
import type { msgTypes } from '~/types'
import { useMessage } from '~/store/useMessage'

const route = useRouter()

const { t } = useI18n()
const msgStore = useMessage()

const list: Ref<msgTypes[]> = ref(msgStore.msg)

onMounted(async () => {
  const { data } = await getNoticeList()
  msgStore.msg = data.value.data.data.filter((e: msgTypes) => e.is_read !== 1)
  list.value = msgStore.msg
})

function go(key: number) {
  route.push(`/menu/message/detail/${key}`)
}

function getBgStyle() {
  return 'py3 pl2.75 text-sm text-black mt2.5 h41 rounded-2.25 bg-white  pr4'
}
</script>

<template>
  <div bg-trading font-normal opacity70>
    <TheMenuHead :title="t('me.message.title')" />
    <div h-screen overflow-y-scroll px7.5>
      <div v-for="(item, key) in list" :key :class="getBgStyle()" position-relative>
        <div class="font-['youshe']" text-lg>
          {{ item.title }}:
        </div>
        <div wfull>
          <div>
            {{ item.create_time }}
          </div>
        </div>
        <div my1 wfull text-sm opacity60>
          <p>
            {{ item.message }}
          </p>
        </div>
        <div wfull class="msg-display text-#4AADF0" @click="go(item.id)">
          {{ t('me.message.details') }}
        </div>
      </div>
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
