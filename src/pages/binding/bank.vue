<script setup lang="ts">
import type { binding } from '~/api/types'
import { useUser } from '~/store/useUser'
import { useConf } from '~/store/useConf'
import type { configlist } from '~/types'

const { t } = useI18n()
const userStore = useUser()
const confStore = useConf()

const bg = new URL('~/assets/images/binding/bg.png', import.meta.url).href
const bank_info = reactive(userStore.data.bank_info)

const infos = ref<binding>({
  bank_name: bank_info?.bank_name || '',
  bank_branch_name: bank_info?.bank_branch_name || '',
  bank_account: bank_info?.bank_account || '',
})

const { value: hideNumber } = confStore.data.find((e: configlist) => {
  return e.key === 'user_money_account_hide_number'
})

const start = useToNumber(hideNumber.split(',')[0]).value
const end = useToNumber(hideNumber.split(',')[1]).value
function hide(raw: string) {
  // 如果 raw.length 小于 start，则用 * 补足到 end 的长度
  if (raw.length < start) {
    raw = raw.padEnd(end, '*') // 用 * 补足到 end 的长度
  }
  // 如果 raw.length 大于等于 start，则从 start 到 end 范围内替换为 *
  else {
    const rawArray = raw.split('')
    for (let i = start; i < Math.min(end, raw.length); i++)
      rawArray[i] = '*' // 替换 start 到 end 之间的字符为 *

    raw = rawArray.join('') // 重新拼成字符串
  }
  return raw
}
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
            {{ hide(infos.bank_account!) }}
          </div>
        </div>
      </div>
      <div class="if" px2>
        {{ t('edit') }}
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
