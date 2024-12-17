<script setup lang=ts>
import { getYuEBaoList } from '~/api'
import type { YuEBao } from '~/types'
import { useYuEBao } from '~/store/useYuEBao'

const { t, locale } = useI18n()
const router = useRouter()
const YuEBaoStore = useYuEBao()

const loading = ref(false)
const my_loading = ref(false)
const isDone = ref(false)
const finished = ref(false)
const page = ref(1)
const list = ref<YuEBao[]>([])

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

function go(product: YuEBao) {
  YuEBaoStore.data = product
  router.push(`/grow/buy`)
}

async function onLoad() {
  loading.value = true
  if (isDone.value) {
    finished.value = true
    loading.value = false
    return
  }
  const { data } = await getYuEBaoList()
  // 预留给可能的分页服务
  // if (data.value.data.length < 1) {
  //   isDone.value = true
  // finished.value = true
  //   loading.value = false
  //   return
  // }
  list.value.push(...data.value.data)
  isDone.value = true
  loading.value = false
  finished.value = true
  my_loading.value = false
  loading.value = false
  page.value++
}

// onMounted(async () => onLoad())
</script>

<template>
  <TheInfo :current="0" />
  <div flex="~ wrap" justify-center>
    <TheEmpty v-if="loading" />
    <div mx5 mt2 wfull text-sm>
      <van-list
        v-model:loading="loading" h-screen wfull overflow-y-auto loading-text=" " finished-text=" " :offset="100"
        pb-120
        @load="onLoad"
      >
        <div v-for="(item, key) in list" :key flex="~ wrap" mt4 h20 border rounded-lg pl2 @click="go(item)">
          <div flex="~ wrap" justify-between w="1/2" :class="margin()">
            <div flex="~" w-full items-start>
              <div w="1.2/3">
                {{ t('fortune.product_name') }}:
              </div>
              <div :class="e ? 'e banner_textscroll' : 'banner_textscroll'" w="1.8/3" @animationend="animationEnd">
                <div>{{ item.name }}</div>
              </div>
            </div>
            <div flex="~" w-full items-start>
              <div w="1.2/3">
                {{ t('fortune.annualized_income') }}:
              </div>
              <div w="1.8/3">
                {{ item.rate }}%
              </div>
            </div>
          </div>
          <div flex="~ wrap" justify-between w="1/2" :class="margin()">
            <div flex="~" w-full items-start pl5>
              <div w="1.2/3">
                {{ t('fortune.minimum_deposit') }}:
              </div>
              <div w="1.8/3">
                {{ item.min_price }}
              </div>
            </div>
            <div flex="~" w-full items-start pl5>
              <div w="1.2/3">
                {{ t('fortune.projected_revenue') }}:
              </div>
              <div :class="e ? 'e banner_textscroll' : 'banner_textscroll'" w="1.5/3" @animationend="animationEnd">
                <div>{{ item.rate_price }}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- <div h90 /> -->
      </van-list>
    </div>
  </div>
  <TheFooter :index="3" />
</template>

<style scoped>
.e>div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
