<script setup lang="ts">
import type { msgTypes } from '~/types'
import { useMessage } from '~/store/useMessage'
import { getNoticeList, readUserNotice } from '~/api'

const id = Number.parseInt(useRoute('/menu/message/detail/[id]').params.id)

const { t } = useI18n()

const msgStore = useMessage()

const list: Ref<msgTypes[]> = ref(msgStore.msg)

const data = list.value.find((e: msgTypes) => e.id === id)

function getBgStyle() {
  return 'py3 pl2.75 text-sm text-black mt2.5 h41 rounded-2.25 bg-white  pr4'
}

async function onAfterSuccess() {
  const { data } = await getNoticeList()
  msgStore.msg = data.value.data.data.filter((e: msgTypes) => e.is_read !== 1)
}

onMounted(async () => {
  const { data } = await readUserNotice(id)
  if (data.value.code)
    onAfterSuccess()
})
</script>

<template>
  <TheMenuHead :title="t('me.message.title')" />
  <div class="font-['PingFang_SC']" bg-trading font-normal opacity70>
    <div h-screen overflow-y-scroll px7.5>
      <div :class="getBgStyle()">
        <div class="font-['youshe']" text-lg>
          {{ data.title }}
        </div>
        <div my1 wfull>
          {{ data.create_time }}
        </div>
        <div wfull text-sm opacity60>
          <p>
            {{ data.message }}
          </p>
        </div>
      </div>
    </div>
  </div>
  <TheFooter :index="4" />
</template>
