<script setup lang=ts>
const { t, locale } = useI18n()

const data = ref([
  { title: '余额宝365天', minimum: 10000, yield: 15, prospective: 1500 },
  { title: '余额宝180天', minimum: 1000, yield: 6, prospective: 29.58 },
  { title: '余额宝30天', minimum: 100, yield: 2.5, prospective: 0.2 },
])

function margin() {
  switch (locale.value) {
    case 'zh-CN':
    case 'zh-TW':
    case 'ja-JP':
    case 'tr-TR':
      return 'mt4'
    default:
      return ''
  }
}
</script>

<template>
  <div>
    <div flex="~ wrap" justify-center pt11>
      <TheInfo :current="0" />
      <div mx5 mt2 wfull text-sm>
        <div v-for="(item, key) in data" :key flex="~ wrap" mt4 h20 border rounded-lg pl2>
          <div flex="~ wrap" justify-between w="1/2" :class="margin()">
            <div>
              {{ t('fortune.product_name') }}: {{ item.title }}
            </div>
            <div>
              {{ t('fortune.annualized_income') }}: {{ item.yield }}%
            </div>
          </div>
          <div flex="~ wrap" justify-between w="1/2" :class="margin()">
            <div pl6>
              {{ t('fortune.minimum_deposit') }}: {{ item.minimum }}.00
            </div>
            <div pl6>
              {{ t('fortune.projected_revenue') }}: {{ item.prospective }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter :index="3" />
  </div>
</template>
