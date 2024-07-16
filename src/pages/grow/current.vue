<script setup lang=ts>
const { t, locale } = useI18n()

const data = ref([
  { title: '余额宝365天', state: t('fortune.state_type.underway'), current: 0, prospective: 1500, date: '08-08 10:10', savings: 10000 },
  { title: '余额宝180天', state: t('fortune.state_type.underway'), current: 0, prospective: 29.85, date: '08-08 10:10', savings: 1000 },
  { title: '余额宝30天', state: t('fortune.state_type.underway'), current: 0, prospective: 0.2, date: '08-08 10:10', savings: 100 },
])

function margin() {
  switch (locale.value) {
    case 'zh-CN':
    case 'zh-TW':
    case 'ja-JP':
      return 'mt2'
    default:
      return ''
  }
}
</script>

<template>
  <div>
    <div flex="~ wrap" justify-center pt11>
      <TheInfo :current="1" />
      <div mx5 mt2 wfull text-sm>
        <div v-for="(item, key) in data" :key mt4 h20 border rounded-lg pl2>
          <div flex="~" mt2 justify-between text-sm>
            <div w="1/3">
              {{ item.title }}
            </div>
            <div w="1/3" />
            <div w="1/3">
              {{ item.savings }}
            </div>
          </div>
          <div flex="~" :class="margin()" items-center justify-between text-xs class="text-#707070">
            <div w="1/3">
              {{ t('fortune.state') }}: {{ item.state }}
            </div>
            <div w="1/3">
              {{ t('fortune.current_yield') }}: {{ item.current }}
            </div>
            <div w="1/3">
              {{ t('fortune.projected_revenue') }}: {{ item.prospective }}
            </div>
          </div>
          <div flex="~" :class="margin()" justify-between text-xs>
            <div w="1/2" class="text-#707070">
              {{ item.date }}
            </div>
            <div w="1/2" text-center text-black>
              <span class="text-#673BF6">
                {{ t('fortune.termination') }}
              </span>
              |
              <span class="text-#673BF6">
                {{ t('fortune.renewal') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter :index="3" />
  </div>
</template>
