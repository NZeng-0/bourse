<script setup lang="ts">
import { useUser } from '~/store/useUser'
import { useConf } from '~/store/useConf'
import type { configlist } from '~/types'
import { getConfigList } from '~/api'

const { t } = useI18n()
const userStore = useUser()
const confStore = useConf()
const router = useRouter()

const type = ref('')

const { bank_account, wallet_address } = userStore.data.bank_info

// const keys = ['front_menu_mine_yhk']

const list = [
  {
    title: t('me.payment_method.type.1'),
    icon: new URL('~/assets/images/me/menu/bank.png', import.meta.url).href,
    to: bank_account ? '/binding/bank' : '/unBinding/bank',
    type: 'rmb',
  },
  {
    title: t('me.payment_method.type.2'),
    icon: new URL('~/assets/images/me/menu/usdt.png', import.meta.url).href,
    to: wallet_address ? '/binding/usdt' : '/unBinding/usdt',
    type: 'usdt',
  },
]

function getFullUrl(url: string) {
  return new URL(url, import.meta.url).href
}

function getBg() {
  return 'py2.5 pl2.5 text-sm text-#030319 items-center'
}

function go(to: string, __type: string) {
  if (type.value === 'RMB和USDT')
    return router.push(to)

  if (type.value === 'RMB') {
    if (__type !== 'rmb') {
      return showToast({
        message: `${t('only')}${type.value}`,
      })
    }
    return router.push(to)
  }

  if (type.value === 'USDT') {
    if (__type !== 'usdt') {
      return showToast({
        message: `${t('only')}${type.value}`,
      })
    }
    return router.push(to)
  }
}

onMounted(async () => {
  const { data } = await getConfigList()
  confStore.data = data.value.data
  type.value = confStore.data.find((e: configlist) => e.key === 'user_money_account_type').value
})
</script>

<template>
  <div bg-trading>
    <TheMenuHead :title="t('me.payment_method.title')" />
    <div h-screen overflow-y-scroll px6.5>
      <div
        v-for="(item, key) in list" :key flex="~ wrap" mt2.5 h18 rounded-2xl bg-white :class="getBg()"
        @click="go(item.to, item.type)"
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
