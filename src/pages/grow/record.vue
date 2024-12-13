<script setup lang="ts">
const { t } = useI18n()
const list = ref([
  {
    time: '2023-06-06 22:22:03',
    amount: -1000,
    type: '转出到余额',
    use: 12000,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: 1000,
    type: '转入到余额',
    use: 12000,
  },
  {
    time: '2023-06-06 22:22:03',
    amount: -1000,
    type: '转出到余额',
    use: 12000,
  },
])

function getBgStyle() {
  return ' py2.5 pl2.5 text-sm text-#030319'
}
</script>

<template>
  <TheMenuHead :title="t('yuEBaoRecord')" />
  <div bg-trading>
    <div h-screen overflow-y-scroll px6.5>
      <TheEmpty v-if="list.length <= 0" />
      <div v-for="(item, key) in list" :key flex="~ wrap" mt2.5 h30 rounded-lg bg-white :class="getBgStyle()">
        <div wfull>
          {{ t('me.time') }}: {{ item.time }}
        </div>
        <div wfull>
          {{ t('me.amount') }}: <span :color="item.amount < 0 ? '#40BF6A' : '#DD4646'">
            {{ item.amount }}
          </span>
        </div>
        <div wfull>
          {{ t('me.type') }}: <span>{{ item.type }}</span>
        </div>
        <div wfull>
          可用余额: <span>{{ item.use }}</span>
        </div>
      </div>
      <div h70 />
    </div>
    <TheFooter :index="3" />
  </div>
</template>
