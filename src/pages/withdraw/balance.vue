<script setup lang="ts">
const route = useRouter()

const banding = ref(false)

function getCommonStyle() {
  return 'border-box border-##f4f4f4 mt5.5 h11.25 items-center justify-start rounded-xl bg-white pl4.625'
}

function go() {
  route.push(`/binding/usdt`)
}

function back() {
  route.push('/assets')
}
</script>

<template>
  <div h-screen bg-trading>
    <div flex="~" h30 items-center justify-between rounded-b-2xl bg-white px6>
      <img src="../../assets/images/trading/back.png" h10 w10 @click="back()">
      <div class="text-5.5" text-trading-title>
        提现
      </div>
      <RouterLink to="/menu/withdraw">
        <div class="border-#4D58C0" flex="~" h6.5 w11.25 items-center justify-center border rounded-xl text-sm>
          记录
        </div>
      </RouterLink>
    </div>
    <div px7 pt5 class="text-#030319" text-base>
      <div flex="~" h20.5 items-center justify-between class="rounded-4.5" bg-white p4>
        <div>
          余额
        </div>
        <div mr7.75>
          199.98
        </div>
      </div>
      <div flex="~" :class="getCommonStyle()">
        <input type="text" placeholder="提现金额" opacity69>
      </div>
      <div flex="~" :class="getCommonStyle()">
        <input type="passwrod" placeholder="提现密码" opacity69>
      </div>
      <div mt5.25 pl4.625 text-sm>
        手续费: 0.99
      </div>
      <div flex="~" :class="getCommonStyle()" mt3.25>
        <div v-if="!banding" flex="~" wfull items-center justify-center text-sm opacity69>
          还未绑定提现账户
        </div>
        <div v-else flex="~" wfull items-center justify-between text-sm>
          <div w="1/3">
            账户
          </div>
          <div w="2/3" text-left>
            65558*****78962
          </div>
        </div>
      </div>
    </div>
    <div flex="~" mt32.25 w-full justify-center>
      <button v-if="!banding" h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white @click="go()">
        绑定提现账户
      </button>
      <button v-else h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white>
        提现
      </button>
    </div>
    <div class="text-#030319" mt21.75 pl7 text-sm opacity52>
      <div>
        1.提现金额限制: 100~500000000
      </div>
      <div>
        2.提现时间: 09.30~21.30
      </div>
      <div>
        3.如忘记密码，请联系客服
      </div>
    </div>
  </div>
</template>
