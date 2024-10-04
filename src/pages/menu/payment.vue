<script setup lang="ts">
import { useUser } from '~/store/useUser'

const userStore = useUser()

const { t } = useI18n()

const router = useRouter()

const { bank_account, wallet_address } = userStore.data.bank_info

const list = [
  {
    title: t('me.payment_method.type.1'),
    icon: new URL('~/assets/images/me/menu/bank.png', import.meta.url).href,
    to: bank_account ? '/binding/bank' : '/unBinding/bank',
  },
  {
    title: t('me.payment_method.type.2'),
    icon: new URL('~/assets/images/me/menu/usdt.png', import.meta.url).href,
    to: wallet_address ? '/binding/usdt' : '/unBinding/usdt',
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
