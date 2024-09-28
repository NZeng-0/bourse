<script setup lang="ts">
import type { binding } from '~/api/types'
import { useUser } from '~/store/useUser'

const userStore = useUser()
const { t } = useI18n()

const bg = new URL('~/assets/images/binding/bg.png', import.meta.url).href
const del = new URL('~/assets/images/binding/del.png', import.meta.url).href
const bank_info = reactive(userStore.data.bank_info)

const infos = ref<binding>({
  wallet_name: bank_info?.wallet_name || '',
  wallet_address: bank_info?.wallet_address || '',
})

const show = ref(false)

function cancel() {
  show.value = false
}

function confirm() {
  show.value = false
}
</script>

<template>
  <div h-screen bg-trading>
    <TheBindHead :title="t('assets.recharge.usdt.use')" />
    <div px4 pt4 class="text-#121826">
      <div class="item">
        <img :src="bg">
        <img :src="del" class="del" @click="show = true">
        <div class="text">
          <div class="bank">
            {{ infos.wallet_name }}
          </div>
          <div class="account">
            {{ infos.wallet_address }}
          </div>
        </div>
      </div>
    </div>
    <div flex="~" mt17 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white>
        {{ t('assets.withdrawal.new.usdt') }}
      </button>
    </div>
  </div>
  <van-dialog v-model:show="show" title="" show-cancel-button>
    <div
      style="text-align: center;margin: 50px; font-size: 16px;font-weight: normal;letter-spacing: 0px; color: #3D3D3D;"
    >
      确认删除吗？
    </div>
    <template #footer>
      <div flex="~" w-ful mb-8 justify-around>
        <button
          style="width: 100px;height: 30px;border-radius: 8px;background: #E2E2E2;font-size: 15px;font-weight: normal;line-height: 18px;letter-spacing: 0em;color: #A7A7A7;"
          @click="cancel"
        >
          取消
        </button>
        <button
          style="width: 100px;height: 30px;border-radius: 8px;background: #7751F1;font-size: 15px;font-weight: normal;line-height: 18px;letter-spacing: 0em;color: #F9FAFB;-webkit-text-stroke: rgba(0, 0, 0, 0) 1px;"
          @click="confirm"
        >
          确定
        </button>
      </div>
    </template>
  </van-dialog>
</template>

<style scoped>
.item {
  position: relative;

  .del {
    position: absolute;
    right: 15px;
    top: 50%;
    width: 30px;
    height: 30px;
    transform: translateY(-50%);
  }

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
</style>
