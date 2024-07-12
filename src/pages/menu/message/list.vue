<script setup lang="ts">
const { t } = useI18n()

const list = [
  {
    type: 1,
    time: '2023-05-25 18:30:31',
    title: '提现已到账',
    content: '消息内容消息内容消息内容消息内容',
  },
  {
    type: 1,
    time: '2023-05-25 18:30:31',
    title: '提现已到账',
    content: '消息内容消息内容消息内容消息内容',
  },
]

function getBgStyle() {
  return ' pl6.5 py5.5 pr4 text-sm text-black mt2.5 h23 rounded-lg bg-white'
}
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('me.message.title')" />
    <div h-screen overflow-y-scroll px3>
      <div v-for="(item, key) in list" :key flex="~ wrap" :class="getBgStyle()">
        <div wfull flex="~" items-center justify-between>
          <div flex="~" items-center text-lg>
            {{ item.title }}
            <div ml2 h2 w2 rounded-full bg-btn-select />
          </div>
          <div>
            {{ item.time }}
          </div>
        </div>
        <div mt2 text-sm opacity60>
          {{ item.content }}
        </div>
      </div>
      <div h50 />
    </div>
  </div>
</template>
