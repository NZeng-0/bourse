<script setup lang=ts>
const route = useRouter()
const { t } = useI18n()

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
    right: '简体中文',
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

function go(to: string) {
  route.push(`/menu/${to}`)
}
</script>

<template>
  <div>
    <div flex="~" h27 items-center justify-between rounded-b-2xl bg-white px4>
      <div flex="~" wfull items-end justify-center text-xl text-trading-title>
        {{ t('me.title') }}
      </div>
    </div>
    <div flex="~" h19.7 wfull border-t bg-white px-6>
      <div w="1/2" flex="~" items-center>
        <div relative>
          <img src="../assets/images/me/avatar.jpg" h15 w15 rounded-full>
          <img src="../assets/images/me/shot.png" absolute bottom-0 right--1 h6 w6>
        </div>
        <div ml4 class="font-['PingFang_SC']">
          <div class="text-#121826" font-ps>
            HKEx01
          </div>
          <div class="text-#9EA3AE" text-sm>
            {{ t('me.member') }}
          </div>
        </div>
      </div>
      <div w="1/2" class="text-#673BF6 font-['PingFang_SC']" flex="~" items-center justify-end text-sm>
        {{ t('me.log_out') }}
      </div>
    </div>
    <div class="font-['PingFang_SC']" h-screen overflow-y-scroll bg-trading px6 pt4.5>
      <div h50 rounded-5 bg-white px7.5 pt4>
        <div class="text-#9EA3AE" text-center>
          <div text-xs>
            {{ t('me.balance') }}:
          </div>
          <div text-2xl class="text-#3D3D3D">
            78963.00
          </div>
        </div>
        <div flex="~" mt6 justify-between>
          <div>
            <div class="text-#3D3D3D" text-center text-sm>
              0.00
            </div>
            <div class="text-#9EA3AE" text-center text-xs>
              {{ t('me.yesterdays_earnings') }}
            </div>
          </div>
          <div>
            <div class="text-#3D3D3D" text-center text-sm>
              0.00
            </div>
            <div class="text-#9EA3AE" text-center text-xs>
              {{ t('me.todays_earnings') }}
            </div>
          </div>
          <div>
            <div class="text-#3D3D3D" text-center text-sm>
              0.00
            </div>
            <div class="text-#9EA3AE" text-center text-xs>
              {{ t('me.accumulated_earnings') }}
            </div>
          </div>
        </div>
        <div flex="~" mt6.5 justify-between px4 text-white>
          <button w="1/2" h8.8 w25.5 border rounded-lg bg-btn-select>
            {{ t('me.recharge') }}
          </button>
          <button w="1/2" h8.8 w25.5 border rounded-lg bg-btn-select>
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
            {{ item.title }}
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
    </div>
    <TheFooter :index="4" />
  </div>
</template>
