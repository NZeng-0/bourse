<script setup lang="ts">
import type { notifyType } from '~/types'
import { useNotify } from '~/store/useNotify'
import { useNotifyList } from '~/store/useNotifyList'

const { t } = useI18n()
const route = useRouter()
const notifyStore = useNotify()
const notifyList = useNotifyList()

const list: Ref<notifyType[]> = ref(notifyList.notify)

function getBgStyle() {
  return 'py3 pl2.75 text-sm text-black mt2.5 h45 rounded-2.25 bg-white  pr4'
}

function go(item: notifyType) {
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
            {{ true ? t('me.message.details') : t('me.message.read') }}
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
