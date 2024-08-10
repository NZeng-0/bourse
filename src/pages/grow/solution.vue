<script setup lang=ts>
import { getYuEBaoList } from '~/api'
import type { YuEBao } from '~/types'

const { t, locale } = useI18n()

const list: Ref<YuEBao[]> = ref([])

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

const e = ref(false)
function animationEnd() {
  e.value = true
}
</script>

<template>
  <div>
    <div flex="~ wrap" justify-center pt11>
      <TheInfo :current="0" />
      <div mx5 mt2 h-screen wfull overflow-x-scroll text-sm>
        <div v-for="(item, key) in list" :key flex="~ wrap" mt4 h20 border rounded-lg pl2>
          <div flex="~ wrap" justify-between w="1/2" :class="margin()">
            <div flex="~" w-full items-start>
              <div w="1.2/3">
                {{ t('fortune.product_name') }}:
              </div>
              <div :class="e ? 'e banner_textscroll' : 'banner_textscroll'" w="1.8/3" @animationend="animationEnd">
                <div>{{ item.name }}</div>
              </div>
            </div>
            <div>
              {{ t('fortune.annualized_income') }}:&nbsp;{{ item.rate }}%
            </div>
          </div>
          <div flex="~ wrap" justify-between w="1/2" :class="margin()">
            <div pl5>
              {{ t('fortune.minimum_deposit') }}: {{ item.min_price }}
            </div>
            <div flex="~" w-full items-start pl5>
              <div w="1.2/3">
                {{ t('fortune.projected_revenue') }}:
              </div>
              <div :class="e ? 'e banner_textscroll' : 'banner_textscroll'" w="1.5/3" @animationend="animationEnd">
                <div>&nbsp;{{ item.rate_price }}</div>
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

<style scoped>
.e>div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
