<script setup lang="ts">
import type { binding } from '~/api/types'
import { useUser } from '~/store/useUser'

const userStore = useUser()
const { t } = useI18n()

const bg = new URL('~/assets/images/binding/bg.png', import.meta.url).href
const bank_info = reactive(userStore.data.bank_info)

const infos = ref<binding>({
  bank_name: bank_info?.bank_name || '',
  bank_branch_name: bank_info?.bank_branch_name || '',
  bank_account: bank_info?.bank_account || '',
})
</script>

<template>
  <div h-screen bg-trading>
    <TheBindHead :title="t('assets.recharge.bank.use')" />
    <div px4 pt4 class="text-#121826">
      <div class="item">
        <img :src="bg">
        <div class="text">
          <div class="bank">
            {{ infos.bank_name }}
          </div>
          <div class="account">
            {{ infos.bank_account }}
          </div>
        </div>
      </div>
      <div class="if" px2>
        如需修改请联系在线客服
      </div>
    </div>
  </div>
</template>

<style scoped>
.item {
  position: relative;

  .text {
    position: absolute;
    left: 19px;
    top: 0;
    width: 143px;
    height: 44px;
    letter-spacing: 0em;
    font-variation-settings: "opsz" auto;
    color: #FFFFFF;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    margin-top: 18px;
    margin-bottom: 18px;
    height: 50px;

    .bank {
      font-size: 14px;
      font-weight: normal;
      line-height: 14px;
      width: 100%;
    }

    .account {
      font-size: 15px;
      font-weight: 500;
      line-height: 15px;
      width: 100%;
    }
  }
}

.if {
  margin-top: 15px;
  font-size: 12px;
  font-weight: normal;
  line-height: 12px;
  letter-spacing: 0em;
  color: #9EA3AE;
}
</style>
