<script setup lang="ts">
const props = defineProps<{
  title: string
  range: number
  icon: string
  presentValue: number
  ud: number
  index: string
  select: number
}>()

const route = useRouter()

function selected(current: number) {
  return props.select === current ? 'bg-#7751f1' : 'bg-#CBBCFB'
}

function go(custom: string) {
  route.push(`/trading/${custom}/${props.index}`)
}
</script>

<template>
  <div>
    <div>
      <div p="x-4">
        <TheHead back="/" :title />
      </div>
      <div h170 overflow-y-scroll bg-trading>
        <TheSwitched :k="true" :current="index" />
        <section>
          <div flex="~" mt5.5 wfull justify-between px-4>
            <div>
              <div text-3xl>
                {{ presentValue }}
              </div>
              <div flex="~" text-xs :style="{ color: range > 0 ? '#19c09a' : '#fc6c6b' }">
                <div :class="range > 0 ? 'i-carbon:caret-up' : 'i-carbon:caret-down'" h-1.2rem w-1.2rem />
                <div>{{ ud }} ({{ range }}%)</div>
              </div>
            </div>
            <div mr-2.5>
              <img :src="icon" h12 w12>
            </div>
          </div>
          <div flex="~" mt3 justify-between px4 text-sm>
            <div :class="selected(0)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('day')">
              1D
            </div>
            <div :class="selected(1)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('week')">
              1W
            </div>
            <div :class="selected(2)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('month')">
              1M
            </div>
            <div :class="selected(3)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('year')">
              1Y
            </div>
            <div :class="selected(4)" flex="~" h8 w13 items-center justify-center rounded-xl @click="go('five-year')">
              5Y
            </div>
          </div>
          <div mt3.2 h65 w-full>
            <slot />
          </div>
        </section>
        <div flex="~" mt0.25 justify-around text-xs>
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
          <TheBuy :index selected="bg-btn-select" />
        </div>
      </div>
      <TheFooter :index="0" />
    </div>
  </div>
</template>
