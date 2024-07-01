<script setup lang="ts">
import { list } from '~/composables/portfolioListData'

const key = useRoute('/fluctuation/[key]').params.key

const data = list[Number.parseInt(key)]
</script>

<template>
  <div>
    <div p="x-4">
      <TheHead back="/" :title="data.nameEN" />
    </div>
    <div h170 overflow-y-scroll bg-trading>
      <TheSwitched :k="false" :current="key" />
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
</template>
