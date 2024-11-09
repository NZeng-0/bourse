<script setup lang="ts">
import { getNoticeList } from '~/api'
import type { msgTypes } from '~/types'
import { useMessage } from '~/store/useMessage'

const route = useRouter()

const { t } = useI18n()
const msgStore = useMessage()

const list: Ref<msgTypes[]> = ref(msgStore.msg)
const loading = ref(false)

onMounted(async () => {
  loading.value = true
  const { data } = await getNoticeList()
  msgStore.msg = data.value.data.data
  list.value = msgStore.msg
  loading.value = false
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
    <div h-screen overflow-y-scroll px5>
      <TheEmpty v-if="loading && list.length > 0" />
      <template v-else>
        <div v-for="(item, key) in list" :key :class="getBgStyle()" position-relative @click="go(item.id)">
          <div class="font-['youshe']" text-lg>
            {{ t('me.message.title') }}:
          </div>
          <div wfull opacity60>
            {{ item.title }}
            <div>
              {{ item.create_time }}
            </div>
          </div>
          <div my1 wfull text-sm opacity60>
            <p v-html="item.message" />
          </div>
          <div wfull class="msg-display text-#4AADF0">
            {{ item.is_read === 0 ? t('me.message.details') : t('me.message.read') }}
          </div>
        </div>
      </template>
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>

<style scoped>
p {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
