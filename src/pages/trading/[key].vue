<script setup lang="ts">
import { list } from '~/composables/portfolioListData'

const key = useRoute('/trading/[key]').params.key
const data = list[Number.parseInt(key)]
</script>

<template>
  <div>
    <div>
      <div p="x-4">
        <TheHead back="/" :title="data.nameEN" />
      </div>
      <div h170 overflow-y-scroll bg-trading>
        <TheSwitched :k="true" :current="key" />
        <TheCandle :range="data.range" :url="data.icon" :present-value="data.presentValue" :ud="data.ud" />
        <div flex="~" justify-around text-xs>
          <span>
            13:00
          </span>
          <span>
            14:00
          </span>
          <span>
            15:00
          </span>
          <span>
            16:00
          </span>
        </div>
        <div flex="~" justify-center>
          <TheTradingCard />
        </div>
        <div flex="~" my4 justify-between px5.5>
          <button h10 w37.5 rounded-lg bg-btn-select text-base text-white>
            买涨
          </button>
          <button h10 w37.5 rounded-lg bg-btn text-base text-btn>
            买跌
          </button>
        </div>
      </div>
      <TheFooter />
    </div>
  </div>
</template>
