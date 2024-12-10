<script setup lang=ts>
import {
  getAuthIdcard,
  getConfigList,
  getIndexNoticeList,
  getMoneyEarningsInfo,
  getNoticeList,
  getUserInfo,
} from '~/api'
import { useLocalCache } from '~/hook'
import { useUser } from '~/store/useUser'
import menu from '~/composables/useMe'
import { useMessage } from '~/store/useMessage'
import { useConf } from '~/store/useConf'
import type {
  configlist,
  msgTypes,
  notifyType,
} from '~/types'
import { useNotifyList } from '~/store/useNotifyList'
import { useAuth } from '~/store/useAuth'
import { useRead } from '~/store/useRead'
import { useProduct } from '~/store/useProduct'

const { removeCache } = useLocalCache()
const { t, locale } = useI18n()
const router = useRouter()
const productStore = useProduct()
const conf = useConf()
const notify = useNotifyList()
const notifyLen = ref(0)
const type = ref('')
const authStore = useAuth()
const msgStore = useMessage()
const unReadList = shallowReactive<msgTypes[]>([])
const avatar = ref('')
const userStore = useUser()
const isRead = useRead()
const id = userStore.data.uid

const money = ref({
  yesterday_money_earnings: 0,
  total_money_earnings: 0,
})

async function getUser() {
  const { data } = await getUserInfo()
  userStore.data = data.value.data
}

async function getType() {
  const { data } = await getConfigList()
  conf.data = data.value.data

  for (const item of conf.data) {
    if (item.key === 'pay_show_type')
      type.value = item.value
  }
}

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

async function initAuth() {
  const { data } = await getAuthIdcard()
  if (data.value.data)
    authStore.auth = data.value.data
  else
    authStore.auth = null
}

async function go(to: string) {
  if (to === 'download') {
    const donwload = conf.data.find((item: configlist) => item.key === 'app_download_url')
    window.open(`https://${donwload.link}`)
    return
  }
  router.push(`/menu/${to}`)
}

function transfer(tar: string) {
  router.push(tar)
}

function signout() {
  removeCache('token')
  userStore.data = null
  notify.notifyList = []
  authStore.auth = null
  productStore.product = null
  authStore.auth = null
  router.push('/login')
}

function scoped() {
  return `border rounded-lg bg-btn-select px2 ${width() ? 'w=2/3 text-xs' : 'w25.5'}`
}

async function init() {
  const { data } = await getMoneyEarningsInfo()
  money.value = data.value.data
  await initAuth()
}

function fetchTotal(arr: msgTypes[]) {
  arr.forEach((item: msgTypes) => {
    if (item.is_read === 0)
      unReadList.push(item)
  }, 0)
}

function transferIn(type: string) {
  if (type === '1')
    return '/top-up/info/usdt'

  return '/top-up/usdt'
}

/**
 * 如果缓存中存在这个目标，代表已访问过了
 */
function includes(target: number) {
  const temp = toRaw(isRead.data)
  if (!temp)
    return false
  for (const item of temp) {
    if (id === item.id)
      return item.list.includes(target)
  }
  return false
}

function getTime(time: string) {
  return new Date(time).getTime()
}

async function getNotice() {
  const { data } = await getIndexNoticeList()
  const temp = data.value.data.data
  temp.sort((a: notifyType, b: notifyType) => {
    return getTime(b.create_time) - getTime(a.create_time)
  })

  notify.notifyList = temp

  if (isRead.data) {
    for (const item of notify.notifyList) {
      if (!includes(item.id))
        notifyLen.value++
    }
  }
  else {
    notifyLen.value = notify.notifyList.length
  }
}

function error() {
  if (!userStore.data.avatar) {
    conf.data.forEach((e: configlist) => {
      if (e.key === 'app_log')
        return avatar.value = `${baseUrl}/${e.value}`
    })
  }
  else {
    avatar.value = `${baseUrl}/${userStore.data.avatar}`
  }
}

onMounted(async () => {
  await getType()
  avatar.value = userStore.data.avatar || ''
  await init()
  await getUser()
  await getNotice()
  const { data } = await getNoticeList()
  fetchTotal(data.value.data.data)
  msgStore.msg = data.value.data.data
})
</script>

<template>
  <div>
    <div flex="~" h16 items-center justify-between bg-white px8>
      <div w="1/3" />
      <div flex="~" w="1/3" items-end justify-center text-xl text-trading-title>
        {{ t('me.title') }}
      </div>
      <div flex="~" w="1/3" relative items-end justify-end text-white transition delay-150 ease-in-out>
        <img src="../assets/images/me/infrom.png" h5 w5 cursor-pointer @click="go('message/full')">
        <div v-if="unReadList.length > 0">
          <div bg="#FE3636" flex="~" absolute right--5 top--2 h5 w6 items-center justify-center rounded-3xl>
            {{ unReadList.length }}
          </div>
        </div>
      </div>
    </div>

    <div flex="~" h19.7 wfull border-t bg-white px6>
      <div w="1/2" flex="~" items-center>
        <div w="1.2/3">
          <div relative @click="go('avator')">
            <img :src="avatar" h15 w15 rounded-full @error="error">
            <img src="../assets/images/me/shot.png" absolute bottom-0 right--1 h6 w6>
          </div>
        </div>
        <div pl4 w="2/3">
          <div class="text-#121826" font-ps>
            {{ userStore.data?.nickname }}
          </div>
          <div class="text-#9EA3AE" text-sm>
            <p>
              {{ userStore.data?.level_name }}
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
            {{ userStore.data?.now_money }}
          </div>
        </div>
        <div flex="~" h23 items-center justify-between>
          <div w="1/3">
            <div class="text-#3D3D3D" text-center text-sm>
              {{ userStore.data?.yesterday_earnings_money }}
            </div>
            <div class="text-#9EA3AE" text-center text-xs>
              {{ t('me.yesterdays_earnings') }}
            </div>
          </div>
          <div w="1/3">
            <div class="text-#3D3D3D" text-center text-sm>
              {{ userStore.data?.today_earnings_money }}
            </div>
            <div class="text-#9EA3AE" text-center text-xs>
              {{ t('me.todays_earnings') }}
            </div>
          </div>
          <div w="1/3">
            <div class="text-#3D3D3D" text-center text-sm>
              {{ userStore.data?.total_earnings_money }}
            </div>
            <div class="text-#9EA3AE" text-center text-xs>
              {{ t('me.accumulated_earnings') }}
            </div>
          </div>
        </div>
        <div flex="~" justify-between px4 text-white>
          <button w="1/2" h8.8 :class="scoped()" @click="transfer(transferIn(type))">
            {{ t('me.recharge') }}
          </button>
          <button w="1/2" h8.8 :class="scoped()" @click="transfer('/withdraw/balance')">
            {{ t('me.withdrawal') }}
          </button>
        </div>
      </div>
      <div mb70 mt0.25>
        <div v-for="(item, key) in menu" :key="key">
          <div v-if="item.show" flex="~" :class="getListStyle()" @click="go(item.to)">
            <div w="1/5">
              <img :src="getFullUrl(item.icon)" h10 w10>
            </div>
            <div w="2/5" relative text-base>
              <p>
                {{ item.title }}
              </p>
              <template v-if="item.class && notifyLen !== 0">
                <div bg="#FE3636" flex="~" absolute right-7 top--2 h5 min-w-6 items-center justify-center rounded-3xl p1>
                  <span text="white xs">
                    {{ notifyLen }}
                  </span>
                </div>
              </template>
            </div>
            <div w="2/5" flex="~" justify-end>
              <div v-if="item.right !== ' '" text-sm class="text-#9EA3AE">
                {{ t(item.right) }}
              </div>
              <img src="../assets/images/me/menu/right.png" h5.5 w5.5>
            </div>
          </div>
        </div>
        <div flex="~" mt3.5 h16 items-center rounded-2xl bg-btn-select px4 @click="go('serve')">
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
      <div h30 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
