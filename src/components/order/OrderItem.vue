<script setup lang="ts">
import type { dataType } from '~/types'

const { data, history } = defineProps<{
  data: dataType
  history: boolean
}>()

const { t } = useI18n()
</script>

<template>
  <div m-2 rounded-2xl bg-white p-2>
    <div flex="~">
      <div class="font-['YouShe']" text-lg leading-5>
        {{ data.product_name }}
      </div>
      <div ml-4>
        <div v-if="data.type === 2" class="tips bg-38B781">
          <img src="../../assets/images/order/down.png" alt="png" class="icon">
          <div class="text">
            {{ t('trading.buy_to_fall') }}
          </div>
        </div>
        <div v-else class="tips bg-DF2040">
          <img src="../../assets/images/order/up.png" alt="png" class="icon">
          <div class="text">
            {{ t('trading.buy_up') }}
          </div>
        </div>
      </div>
    </div>
    <div flex="~" my-2 justify-between>
      <div class="sub">
        {{ t('order.purchase_amount') }}
      </div>
      <div class="content">
        {{ data.wtye }}
      </div>
    </div>
    <div flex="~" my-2 justify-between>
      <div class="sub">
        {{ t('order.buying_price') }}
      </div>
      <div class="content">
        {{ data.jcdw }}
      </div>
    </div>
    <div flex="~" my-2 justify-between>
      <div class="sub">
        {{ t('order.current_price') }}
      </div>
      <div class="content">
        {{ data.price }}
      </div>
    </div>
    <div flex="~" my-2 justify-between>
      <div class="sub">
        {{ t('order.order_time') }}
      </div>
      <div class="content">
        {{ data.time }}{{ t('seconds') }}
        <span v-if="!history" class="left">
          ({{ t('order.remaining_time') }}：00:04:30)
        </span>
      </div>
    </div>
    <div v-if="history" flex="~" my-2 justify-between>
      <div class="sub">
        {{ t('order.profit_and_loss') }}：
      </div>
      <div class="content">
        {{ data.profit_loss_rate }}
      </div>
    </div>
    <div v-if="!history" flex="~" my-2 justify-between>
      <div class="sub">
        {{ t('order.expected_income') }}
      </div>
      <div class="expect">
        {{ data.predict_earnings_money }}
      </div>
    </div>
    <div v-else flex="~" my-2 justify-between>
      <div class="sub">
        {{ t('order.expected_income') }}
      </div>
      <div :class="Number.parseInt(data.earnings_money) > 0 ? 'color-DF2040 expect' : 'color-38B781 expect'">
        <span v-if="Number.parseInt(data.earnings_money) > 0">+</span>{{ data.earnings_money }}
      </div>
    </div>
    <div flex="~" my-2 justify-between>
      <div class="sub">
        {{ t('order.buying_time') }}
      </div>
      <div class="content">
        {{ data.create_time }}
      </div>
    </div>
    <div flex="~" mt-2 justify-between>
      <div class="sub">
        {{ t('order.settlement_time') }}:
      </div>
      <div class="content">
        {{ data.settle_time || '--:--:--' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.sub {
  font-size: 14px;
  font-weight: normal;
  line-height: 14px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: rgba(0, 0, 0, 0.5);
}

.content {
  font-size: 14px;
  font-weight: normal;
  line-height: 14px;
  text-align: right;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #000000;
}

.expect {
  font-size: 14px;
  font-weight: normal;
  line-height: 14px;
  text-align: right;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #DF2040;
}

.left {
  font-weight: 400;
  font-size: 12px;
  font-variation-settings: "opsz" auto;
  color: #DF2040;
}

.color-DF2040 {
  color: #DF2040;
}

.color-38B781 {
  color: #38B781;
}

.bg-DF2040 {
  background: #DF2040;
}

.bg-38B781 {
  background: #38B781;
}

.tips {
  width: 59px;
  height: 21px;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 3px 6px;
  gap: 4px;
}

.icon {
  width: 15px;
  height: 15px;
}

.text {
  font-size: 14px;
  font-weight: normal;
  line-height: 13px;
  display: flex;
  align-items: center;
  letter-spacing: 0px;
  color: #FFFFFF;
}
</style>
