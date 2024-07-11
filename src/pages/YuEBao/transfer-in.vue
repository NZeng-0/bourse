<script setup lang="ts">
const route = useRouter()

function back() {
  route.back()
}
</script>

<template>
  <div h-screen bg-trading>
    <div flex="~" h27 items-center justify-between rounded-b-2xl bg-white px6>
      <img src="../../assets/images/trading/back.png" h10 w10 @click="back()">
      <div class="text-5.5" text-trading-title>
        转入
      </div>
      <div h6.5 w11.25 />
    </div>
    <div mt2.75 px6>
      <div h76.75 rounded-2xl bg-white px5>
        <div flex="~" h12.75 items-center justify-between border-b text-base class="text-#121826">
          <div>
            当前余额
          </div>
          <div>
            54329.08
          </div>
        </div>
        <div mt1.25 text-base class="text-#121826">
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div opacity68>
              方案名称
            </div>
            <div flex="~" items-center justify-end>
              <div mr.5 text-sm>
                方案A
              </div>
              <img src="../../assets/images/me/menu/right.png" h3.5 w2>
            </div>
          </div>
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div opacity68>
              年化收益率
            </div>
            <div flex="~" items-center justify-end>
              <div mr.5 text-sm>
                25%
              </div>
            </div>
          </div>
          <div class="border-#EEEEEE rounded-3.5" flex="~" mt3.5 h9.5 items-center justify-between border px3.75 py2>
            <div w="1/2" opacity68>
              转入金额
            </div>
            <div w="1/2" flex="~" items-center justify-end>
              <input type="text" w="2/3" placeholder="" opacity68>
              <div mr.5 border-l pl2.5 text-sm>
                所有
              </div>
            </div>
          </div>
        </div>
        <div flex="~" mt8.75 items-center justify-center>
          <button h10.5 w37.5 rounded-lg bg-btn-select text-lg text-white>
            确认下单
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
