<script setup lang="ts">
const router = useRouter()
const { t } = useI18n()

function back() {
  router.back()
}
</script>

<template>
  <div flex="~" h30 items-center justify-between bg-white px6>
    <img src="../../../assets/images/recommend/back.png" h10 w10 @click="back()">
    <div class="text-5.5" text-center text-trading-title>
      {{ t('recommend.title') }}
    </div>
    <div h10 w10 />
  </div>
  <div relative text="white 10.5" class="font-['Title']">
    <img src="../../../assets/images/recommend/history.png" w-full border-b="0.25 white">
    <div absolute w-full text-center top="1/2" left="1/2" style=" transform: translate(-50%, -50%);">
      {{ t('recommend.history.sub') }}
    </div>
    <div absolute top-30 h12 w-full rounded-t-3xl bg-white px3.5 pt4.5>
      <div text="black base" class="font-['PingFang_SC']">
        <div>
          <b>{{ t('recommend.history.record') }}</b>
        </div>
      </div>
    </div>
  </div>
  <div px3.5>
    <table w-full text="11px">
      <tr bg="#F7F7F7" h9 text="#545454">
        <th>{{ t('recommend.history.account') }}</th>
        <th>{{ t('recommend.history.date') }}</th>
        <th>{{ t('recommend.history.top-up') }}</th>
        <th>{{ t('recommend.history.withdraw') }}</th>
      </tr>
      <tr v-for="(e, key) in 5" :key border-b="1px #F7F7F7" h9 text="center black">
        <td>
          {{ e }}23456789@qq.com
        </td>
        <td>
          2024/05/30
        </td>
        <td>
          ￥1000
        </td>
        <td>
          ￥1000
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped>
.tr>div {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
