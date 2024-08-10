<script setup lang=ts>
import { getMoneyInvestmentOrderList } from '~/api'
// import type { YuEBao } from '~/types'

const { t, locale } = useI18n()

const data = ref([
  { title: '余额宝365天', state: t('fortune.state_type.failed'), total: 1500, date: '2022-08-08 10:10/2023-08-08 10:10', savings: 10000 },
  { title: '余额宝180天', state: t('fortune.state_type.failed'), total: 29.85, date: '2022-08-08 10:10/2023-08-08 10:10', savings: 1000 },
  { title: '余额宝30天', state: t('fortune.state_type.failed'), total: 0.2, date: '2022-08-08 10:10/2023-08-08 10:10', savings: 100 },
])

// const list: Ref<YuEBao[]> = ref([])

async function init() {
  const { data } = await getMoneyInvestmentOrderList(1)
  // eslint-disable-next-line no-console
  console.log(data.value)
  // if (data.value.data)
  //   list.value = data.value.data
}

onMounted(async () => {
  await init()
})

function width() {
  switch (locale.value) {
    case 'zh-CN':
    case 'zh-TW':
    case 'ja-JP':
      return true
    default:
      return false
  }
}
</script>

<template>
  <div>
    <div flex="~ wrap" justify-center pt11>
      <TheInfo :current="2" />
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
          <div flex="~" mt2 justify-between text-xs class="text-#707070">
            <div :class="width() ? 'w1/3' : 'w1/2'">
              {{ t('fortune.state') }}: {{ item.state }}
            </div>
            <div v-if="width()" w="1/3" />
            <div :class="width() ? 'w1/3' : 'w1/2'">
              {{ t('fortune.accumulated_earnings') }}: {{ item.total }}
            </div>
          </div>
          <div mt2 flex="~" justify-between text-xs>
            <div w="2/3" class="text-#707070">
              {{ item.date }}
            </div>
            <div w="1/3" class="text-#673BF6">
              {{ t('fortune.repurchase') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter :index="3" />
  </div>
</template>
