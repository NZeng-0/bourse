<script setup lang=ts>
const route = useRouter()
const index = ref(0)

const data = ref([
  { title: '余额宝365天', state: '进行中', current: 0, prospective: 1500, date: '08-08 10:10', savings: 10000 },
  { title: '余额宝180天', state: '进行中', current: 0, prospective: 29.85, date: '08-08 10:10', savings: 1000 },
  { title: '余额宝30天', state: '进行中', current: 0, prospective: 0.2, date: '08-08 10:10', savings: 100 },
])

function changeCurrent(current: number, to: string) {
  index.value = current
  route.push({
    path: `/${to}`,
  })
}
</script>

<template>
  <div>
    <div flex="~ wrap" justify-center pt11>
      <div mt6 wfull text-center text-3xl>
        理财
      </div>
      <div class="bg" relative mx7 mt5.5 h68 w80 overflow-hidden rounded-2xl text-white>
        <div ml6 mt8 text-base>
          总余额
        </div>
        <div flex="~" ml6 mt2.8 items-center justify-between text-3xl>
          54329.08
          <div>
            <img src="../../assets/images/grow/cardd.png" mr6.5 h7>
          </div>
        </div>
        <div flex="~" mt11 justify-between>
          <div ml6 text-sm>
            昨日收益
            <div mt3.5 text-center>
              6500
            </div>
          </div>
          <div text-sm>
            累计收益
            <div mt3.5 text-center>
              6500
            </div>
          </div>
          <div mr7 text-sm>
            昨日余额
            <div mt3.5 text-center>
              6500
            </div>
          </div>
        </div>
        <div flex="~" mt-5 justify-around>
          <div flex="~" h8.8 w25.6 items-center justify-center border rounded-lg>
            转入
          </div>
          <div flex="~" h8.8 w25.6 items-center justify-center border rounded-lg>
            转出
          </div>
        </div>
      </div>
      <div mx8 wfull>
        <div mt5 flex="~" justify-between>
          <b text-base class="text-#121826" @click="changeCurrent(0, 'grow/solution')">固定方案</b>
          <b text-base class="text-#673BF6" @click="changeCurrent(1, 'grow/current')">当前收益</b>
          <b text-base class="text-#121826" @click="changeCurrent(2, 'grow/histroy')">历史收益</b>
        </div>
      </div>
      <div mx5 mt2 wfull text-sm>
        <div v-for="(item, key) in data" :key mt4 h20 border rounded-lg pl2>
          <div flex="~" mt2 justify-between text-sm>
            <div w="1/3">
              {{ item.title }}
            </div>
            <div w="1/3" />
            <div w="1/3">
              {{ item.savings }}
            </div>
          </div>
          <div flex="~" mt2 justify-between text-xs class="text-#707070">
            <div w="1/3">
              状态: {{ item.state }}
            </div>
            <div w="1/3">
              当前收益: {{ item.current }}
            </div>
            <div w="1/3">
              预期收益: {{ item.prospective }}
            </div>
          </div>
          <div mt2 flex="~" justify-between text-xs>
            <div w="1/3" class="text-#707070">
              {{ item.date }}
            </div>
            <div w="1/3" />
            <div w="1/3" text-black>
              <span class="text-#673BF6">终止</span> | <span class="text-#673BF6">续期</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter :index="3" />
  </div>
</template>

<style scoped>
.bg {
  background: url(../../assets/images/grow/bg.png);
  background-size: cover;
}
</style>
