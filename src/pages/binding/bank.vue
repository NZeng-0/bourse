<script setup lang="ts">
const { t } = useI18n()
const route = useRouter()

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h10 items-center justify-between text-sm'
}

function go() {
  route.push(`/binding/usdt`)
}
</script>

<template>
  <div h-screen bg-trading>
    <TheBindHead :title="t('assets.withdrawal.bank.title')" back="/withdraw/balance" />
    <div px6 pt5 class="text-#121826">
      <div :class="getClass()" flex="~">
        <div w="1/2" opacity59>
          {{ t('assets.withdrawal.method') }}
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <img src="../../assets/images/assets/bank.png" h4.25 w4.25>
          <div ml1.25 @click="go()">
            {{ t('assets.recharge.bank.use') }}
          </div>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
      <input type="text" :placeholder="t('assets.withdrawal.bank.name')" mt3.25 h10.25 w-full rounded-xl px-3.25 text-sm opacity59>
      <input type="text" :placeholder="t('assets.withdrawal.bank.bank_name')" mt3.25 h10.25 w-full rounded-xl px-3.25 text-sm opacity59>
      <input type="text" :placeholder="t('assets.withdrawal.bank.bank_of_deposit')" mt3.25 h10.25 w-full rounded-xl px-3.25 text-sm opacity59>
      <input type="text" :placeholder="t('assets.withdrawal.bank.bank_card_number')" mt3.25 h10.25 w-full rounded-xl px-3.25 text-sm opacity59>
    </div>
    <div flex="~" mt17 w-full justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white>
        {{ t('assets.withdrawal.submit') }}
      </button>
    </div>
  </div>
</template>
