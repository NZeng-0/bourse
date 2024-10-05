<script setup lang="ts">
import { useNotify } from '~/store/useNotify'

const { t } = useI18n()
const notifyStore = useNotify()

const data = notifyStore.notify

function getBgStyle() {
  return 'py3 pl2.75 text-sm text-black mt2.5 rounded-2.25 bg-white  pr4'
}
</script>

<template>
  <div class="font-['PingFang_SC']" bg-trading font-normal opacity70>
    <TheMenuHead :title="t('me.message.notice')" />
    <div h-screen overflow-y-scroll px7.5>
      <div :class="getBgStyle()">
        <div class="font-['youshe']" text-lg>
          {{ data.name }}
        </div>
        <div my1 wfull>
          {{ data.create_time }}
        </div>
        <div wfull text-sm opacity60>
          <p v-html=" data.value" />
        </div>
      </div>
    </div>
    <TheFooter :index="4" />
  </div>
</template>
