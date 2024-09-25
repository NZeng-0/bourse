<script setup lang="ts">
const { t } = useI18n()

const router = useRouter()

const list = [
  {
    title: t('me.payment_method.type.1'),
    icon: '../../assets/images/me/menu/bank.png',
    to: '/binding/bank',
  },
  {
    title: t('me.payment_method.type.2'),
    icon: '../../assets/images/me/menu/usdt.png',
    to: '/binding/usdt',
  },
]

function getFullUrl(url: string) {
  return new URL(url, import.meta.url).href
}

function getBgStyle() {
  return 'py2.5 pl2.5 text-sm text-#030319 items-center'
}

function go(to: string) {
  router.push(to)
}
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('me.payment_method.title')" />
    <div h-screen overflow-y-scroll px6.5>
      <div
        v-for="(item, key) in list" :key flex="~ wrap" mt2.5 h18 rounded-2xl bg-white :class="getBgStyle()"
        @click="go(item.to)"
      >
        <img :src="getFullUrl(item.icon)" h10 w14>
        <div ml3>
          <div class="text-#121826" text-sm>
            {{ item.title }}
          </div>
          <div class="text-#9EA3AE" mt2 text-xs>
            {{ t('me.payment_method.binding') }} {{ item.title }}
          </div>
        </div>
      </div>
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
