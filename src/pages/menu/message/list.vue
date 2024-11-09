<script setup lang="ts">
import type { notifyType, readType } from '~/types'
import { useNotify } from '~/store/useNotify'
import { useNotifyList } from '~/store/useNotifyList'
import { useRead } from '~/store/useRead'
import { useUser } from '~/store/useUser'

const { t } = useI18n()
const route = useRouter()
const notifyStore = useNotify()
const listStore = useNotifyList()
const isRead = useRead()
const user = useUser()

const id = user.data.uid
const list: Ref<notifyType[]> = ref(listStore.notifyList)

function getBgStyle() {
  return 'py3 pl2.75 text-sm text-black mt2.5 min-h45 rounded-2.25 bg-white  pr4'
}

/**
 * 如果缓存中存在这个目标，代表已访问过了
 */
function includes(target: number) {
  const temp = toRaw(isRead.data)
  if (!temp)
    return false
  for (const item of temp) {
    if (id === item.id)
      return item.list.includes(target)
  }
  return false
}

function findUser() {
  const temp = toRaw(isRead.data)
  if (!temp)
    return false
  return temp.find((item: readType) => {
    if (item.id === id)
      return true
    return false
  })
}

function go(item: notifyType) {
  // includes 会返回 item.id 是否包含在 isRead.data 中，true包含，false不包含 如果没有添加，如果有追加
  if (!includes(item.id)) {
    // 如果不存在，检查temp是否存在，如果存在，则追加，如果不存在，则创建
    const temp = isRead.data
    if (!temp) {
      isRead.data = [
        {
          id,
          list: [item.id],
        },
      ]
    }
    else {
      if (!findUser()) {
        const newItem = {
          id,
          list: [item.id],
        }
        temp.push(newItem)
      }
      else {
        for (const e of temp) {
          if (e.id === id)
            e.list.push(item.id)
        }
      }
      isRead.data = temp
    }
  }
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
        <div v-for="(item, key) in list" :key :class="getBgStyle()" position-relative @click="go(item)">
          <div class="font-['youshe']" text-lg>
            {{ t('me.message.notice') }}:
          </div>
          <div wfull opacity60>
            {{ item.name }}
            <div>
              {{ item.create_time }}
            </div>
          </div>
          <div mb2 wfull text-sm opacity60>
            <p v-html="item.value" />
          </div>
          <div wfull class="msg-display text-#4AADF0">
            {{ !includes(item.id) ? t('me.message.details') : t('me.message.read') }}
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
