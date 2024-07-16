<script setup lang="ts">
const props = defineProps<{
  title: string
  back: string
  to: string
}>()

const { t } = useI18n()
const route = useRouter()

const back_url = new URL('../../assets/images/trading/back.png', import.meta.url).href

function back() {
  route.push(props.back)
}
</script>

<template>
  <div flex="~" h30 items-center justify-between rounded-b-2xl bg-white px6>
    <div w="1/3">
      <img :src="back_url" h10 w10 @click="back()">
    </div>
    <div w="1/3">
      <div class="text-5.5" text-center text-trading-title>
        {{ title }}
      </div>
    </div>
    <div w="1/3" flex="~" justify-end>
      <RouterLink :to>
        <div class="border-#4D58C0" flex="~" h6.5 min-w11.25 items-center justify-center border rounded-xl p1 text-sm>
          {{ t('assets.head') }}
        </div>
      </RouterLink>
    </div>
  </div>
</template>
