<script setup lang="ts">
const { t } = useI18n()
const list = ref([1, 2, 3])

function getBgStyle() {
  return ' py2.5 pl2.5 text-sm text-#030319'
}
</script>

<template>
  <TheMenuHead :title="t('me.recharge_record.title')" />
  <div bg-trading>
    <div h-screen overflow-y-scroll px6.5>
      <TheEmpty v-if="list.length <= 0" />
      <div v-for="(item, key) in list" :key flex="~ wrap" mt2.5 h30 rounded-lg bg-white :class="getBgStyle()">
        <div wfull>
          {{ t('me.time') }}: {{ item }}
        </div>
        <!-- <div wfull>
          {{ t('me.amount') }}: {{ item.money }}
        </div>
        <div wfull>
          {{ t('me.type') }}: <span>{{ item.type === 1 ? t('back') : t('front') }}</span>
        </div> -->
      </div>
      <div h70 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
