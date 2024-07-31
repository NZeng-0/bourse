<script setup lang=ts>
import { getYuEBaoList } from '~/api'

const { t, locale } = useI18n()

const list = ref([
  {
    id: 1,
    name: '余额宝7天 多语言',
    top_price: '1001.00',
    min_price: '100.00',
    status: 1,
    is_hot: 1,
    rate_mode: 1,
    day: 7,
    rate: '1.00',
    type: 1,
    create_time: '2024-06-21 15:58:24',
    rate_price: '700.00',
  },
])

async function init() {
  const { data } = await getYuEBaoList()
  if (data.value.data)
    list.value = data.value.data
}

onMounted(async () => {
  await init()
})

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
      <div mx5 mt2 h-screen wfull overflow-x-scroll text-sm>
        <div v-for="(item, key) in list" :key flex="~ wrap" mt4 h20 border rounded-lg pl2>
          <div flex="~ wrap" justify-between w="1/2" :class="margin()">
            <div flex="~">
              <div w="1/2">
                {{ t('fortune.product_name') }}:
              </div>
              <div class="banner_textscroll" overflow-hidden>
                <div>{{ item.name }}</div>
              </div>
            </div>
            <div>
              {{ t('fortune.annualized_income') }}: {{ item.rate }}%
            </div>
          </div>
          <div flex="~ wrap" justify-between w="1/2" :class="margin()">
            <div pl5>
              {{ t('fortune.minimum_deposit') }}: {{ item.min_price }}
            </div>
            <div flex="~" pl5>
              <div>
                {{ t('fortune.projected_revenue') }}:
              </div>
              <div class="banner_textscroll" ml2 inline-block overflow-hidden>
                <div>{{ item.rate_price }}</div>
              </div>
            </div>
          </div>
        </div>
        <div h150 />
      </div>
    </div>
    <TheFooter :index="3" />
  </div>
</template>
