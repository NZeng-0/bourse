<script setup lang=ts>
import { getMoneyEarningsInfo } from '~/api'
import { useLocalCache } from '~/hook'
import type { userTypes } from '~/store/useUser'
import { useUser } from '~/store/useUser'

const userStore = useUser()
const router = useRouter()
const { removeCache } = useLocalCache()
const { t, locale } = useI18n()

const user = shallowRef<userTypes>()
const money = ref({
  yesterday_money_earnings: 0,
  total_money_earnings: 0,
})

const menu = [
  {
    title: `${t('me.withdrawal_record.title')}`,
    icon: '../assets/images/me/menu/record.png',
    right: ' ',
    to: 'withdraw',
  },
  {
    title: `${t('me.recharge_record.title')}`,
    icon: '../assets/images/me/menu/top-up.png',
    right: ' ',
    to: 'top-up',
  },
  {
    title: `${t('me.payment_method.title')}`,
    icon: '../assets/images/me/menu/method.png',
    right: ' ',
    to: 'payment',
  },
  {
    title: `${t('me.auth.title')}`,
    icon: '../assets/images/me/menu/auth.png',
    right: ' ',
    to: 'auth',
  },
  {
    title: `${t('me.language.title')}`,
    icon: '../assets/images/me/menu/language.png',
    right: t('me.language.current'),
    to: 'language',
  },
  {
    title: `${t('me.message.title')}`,
    icon: '../assets/images/me/menu/message.png',
    right: ' ',
    to: 'message/list',
  },
  {
    title: `${t('me.secure.title')}`,
    icon: '../assets/images/me/menu/secure.png',
    right: ' ',
    to: 'secure',
  },
  {
    title: '公司简介',
    icon: '../assets/images/me/menu/company.png',
    right: '',
    to: 'company',
  },
  {
    title: `${t('me.download.title')}`,
    icon: '../assets/images/me/menu/download.png',
    right: ' ',
    to: 'recommend',
  },
]

function getListStyle() {
  return 'mt3.75 h15 items-center rounded-2xl bg-white px4'
}

function getFullUrl(url: string) {
  return new URL(url, import.meta.url).href
}

function width() {
  switch (locale.value) {
    case 'tr-TR':
    case 'vi-VN':
    case 'es-ES':
    case 'it-IT':
    case 'pt-PT':
      return true
    default:
      return false
  }
}

function go(to: string) {
  router.push(`/menu/${to}`)
}

function transfer(tar: string) {
  router.push(`/YuEBao/transfer-${tar}`)
}

function signout() {
  removeCache('token')
  router.push('/login')
}

function scoped() {
  return `border rounded-lg bg-btn-select px2 ${width() ? 'w=2/3 text-xs' : 'w25.5'}`
}

async function init() {
  const { data } = await getMoneyEarningsInfo()
  money.value = data.value.data
}

onMounted(async () => {
  user.value = userStore.data
  await init()
})
</script>

<template>
  <div>
    <div flex="~" h27 items-center justify-between rounded-b-2xl bg-white px8>
      <div w="1/3" />
      <div flex="~" w="1/3" items-end justify-center text-xl text-trading-title>
        {{ t('me.title') }}
      </div>
      <div flex="~" w="1/3" items-end justify-end>
        <img src="../assets/images/me/infrom.png" h5 w5>
      </div>
    </div>
    <div flex="~" h19.7 wfull border-t bg-white px6>
      <div w="1/2" flex="~" items-center>
        <div w="1.2/3">
          <div relative>
            <img src="../assets/images/me/avatar.jpg" h15 w15 rounded-full>
            <img src="../assets/images/me/shot.png" absolute bottom-0 right--1 h6 w6>
          </div>
        </div>
        <div pl4 w="2/3">
          <div class="text-#121826" font-ps>
            {{ user?.nickname }}
          </div>
          <div class="text-#9EA3AE" text-sm>
            <p>
              {{ user?.level_name }}
            </p>
          </div>
        </div>
      </div>
      <div w="1/2" class="text-#673BF6" flex="~" items-center justify-end text-sm @click="signout()">
        {{ t('me.log_out') }}
      </div>
    </div>
    <div h-screen overflow-y-scroll bg-trading px6 pt4.5>
      <div h50 rounded-5 bg-white px7.5 pt4>
        <div class="text-#9EA3AE" text-center>
          <div text-xs>
            {{ t('me.balance') }}:
          </div>
          <div text-2xl class="text-#3D3D3D">
            {{ user?.now_money }}
          </div>
        </div>
        <div flex="~" h23 items-center justify-between>
          <div w="1/3">
            <div class="text-#3D3D3D" text-center text-sm>
              {{ money.yesterday_money_earnings }}
            </div>
            <div class="text-#9EA3AE" text-center text-xs>
              {{ t('me.yesterdays_earnings') }}
            </div>
          </div>
          <div w="1/3">
            <div class="text-#3D3D3D" text-center text-sm>
              0.00
            </div>
            <div class="text-#9EA3AE" text-center text-xs>
              {{ t('me.todays_earnings') }}
            </div>
          </div>
          <div w="1/3">
            <div class="text-#3D3D3D" text-center text-sm>
              {{ money.total_money_earnings }}
            </div>
            <div class="text-#9EA3AE" text-center text-xs>
              {{ t('me.accumulated_earnings') }}
            </div>
          </div>
        </div>
        <div flex="~" justify-between px4 text-white>
          <button w="1/2" h8.8 :class="scoped()" @click="transfer('in')">
            {{ t('me.recharge') }}
          </button>
          <button w="1/2" h8.8 :class="scoped()" @click="transfer('out')">
            {{ t('me.withdrawal') }}
          </button>
        </div>
      </div>
      <div mb70 mt0.25>
        <div v-for="(item, key) in menu" :key flex="~" :class="getListStyle()" @click="go(item.to)">
          <div w="1/5">
            <img :src="getFullUrl(item.icon)" h10 w10>
          </div>
          <div w="2/5" text-base>
            <p>
              {{ item.title }}
            </p>
          </div>
          <div w="2/5" flex="~" justify-end>
            <div text-sm class="text-#9EA3AE">
              {{ item.right }}
            </div>
            <img src="../assets/images/me/menu/right.png" h5.5 w5.5>
          </div>
        </div>
        <div flex="~" mt3.5 h16 items-center rounded-2xl bg-btn-select px4>
          <div w="1/5">
            <img src="../assets/images/me/menu/servers.png" h10 w10>
          </div>
          <div w="3/5" text-base text-xs text-white>
            <p>{{ t('me.service.1') }}</p>
            <p>{{ t('me.service.2') }}</p>
          </div>
          <div w="1/5" flex="~" justify-end>
            <img src="../assets/images/me/menu/right.png" h5.5 w5.5>
          </div>
        </div>
      </div>
      <!-- <div h30 /> -->
    </div>
    <TheFooter :index="4" />
  </div>
</template>
