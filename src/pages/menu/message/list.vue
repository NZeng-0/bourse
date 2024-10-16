<script setup lang="ts">
import type { notifyType } from '~/types'
import { useNotify } from '~/store/useNotify'
import { useNotifyList } from '~/store/useNotifyList'
import { useRead } from '~/store/useRead'

const { t } = useI18n()
const route = useRouter()
const notifyStore = useNotify()
const listStore = useNotifyList()
const isRead = useRead()

const list: Ref<notifyType[]> = ref(listStore.notifyList)

function getBgStyle() {
  return 'py3 pl2.75 text-sm text-black mt2.5 h45 rounded-2.25 bg-white  pr4'
}

/**
 * 如果缓存中存在这个目标，代表已访问过了
 */
function include(target: number) {
  return !isRead.data.includes(target)
}

function go(item: notifyType) {
  if (include(item.id))
    isRead.data = [item.id]
  read.value = false
  notifyStore.notify = item
  route.push(`/menu/message/detail/list/${item.id}`)
}
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('me.message.notice')" />
    <div h-screen overflow-y-scroll px5>
      <TheEmpty v-if="list.length <= 0" />
      <template v-else>
        <div v-for="(item, key) in list" :key :class="getBgStyle()" position-relative>
          <div class="font-['youshe']" text-lg>
            {{ t('me.message.notice') }}:
          </div>
          <div wfull opacity60>
            {{ item.name }}
            <div>
              {{ item.create_time }}
            </div>
          </div>
          <div my1 wfull text-sm opacity60>
            <p v-html="item.value" />
          </div>
          <div wfull class="msg-display text-#4AADF0" @click="go(item)">
            {{ include(item.id) ? t('me.message.details') : t('me.message.read') }}
          </div>
        </div>
      </template>
      <div h50 />
    </div>
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
