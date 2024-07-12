<script setup lang="ts">
const route = useRouter()
const { t } = useI18n()

function back() {
  route.back()
}
</script>

<template>
  <div h-screen bg-trading>
    <div flex="~" h27 items-center justify-between rounded-b-2xl bg-white px6>
      <img src="../../assets/images/trading/back.png" h10 w10 @click="back()">
      <div class="text-5.5" text-trading-title>
        {{ t('fortune.transfer_in.title') }}
      </div>
      <div h6.5 w11.25 />
    </div>
    <div mt2.75 px6>
      <div h76.75 rounded-2xl bg-white px5>
        <div flex="~" h12.75 items-center justify-between border-b text-base class="text-#121826">
          <div>
            {{ t('fortune.current_balance') }}
          </div>
          <div>
            54329.08
          </div>
        </div>
        <div mt1.25 text-base class="text-#121826">
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div opacity68>
              {{ t('fortune.transfer_in.plan') }}
            </div>
            <div flex="~" items-center justify-end>
              <div mr.5 text-sm>
                {{ t('fortune.transfer_in.planA') }}
              </div>
              <img src="../../assets/images/me/menu/right.png" h3.5 w2>
            </div>
          </div>
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div opacity68>
              {{ t('fortune.annualized_income') }}
            </div>
            <div flex="~" items-center justify-end>
              <div mr.5 text-sm>
                25%
              </div>
            </div>
          </div>
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div w="1/2" opacity68>
              {{ t('fortune.transfer_in.amount') }}
            </div>
            <div w="1/2" flex="~" items-center justify-end>
              <input type="text" w="2/3" placeholder="" opacity68>
              <div mr.5 border-l pl2.5 text-sm>
                {{ t('fortune.all') }}
              </div>
            </div>
          </div>
        </div>
        <div flex="~" mt8.75 items-center justify-center>
          <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white>
            {{ t('fortune.confirm') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
