<script setup lang=ts>
const route = useRouter()
const index = ref(0)

const data = ref([
  { title: '余额宝365天', minimum: 10000, yield: 15, prospective: 1500 },
  { title: '余额宝180天', minimum: 1000, yield: 6, prospective: 29.58 },
  { title: '余额宝30天', minimum: 100, yield: 2.5, prospective: 0.2 },
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
      <TheInfo />
      <div mx8 wfull>
        <div mt5 flex="~" justify-between>
          <b text-base class="text-#673BF6" @click="changeCurrent(0, 'grow/solution')">固定方案</b>
          <b text-base class="text-#121826" @click="changeCurrent(1, 'grow/current')">当前收益</b>
          <b text-base class="text-#121826" @click="changeCurrent(2, 'grow/histroy')">历史收益</b>
        </div>
      </div>
      <div mx5 mt2 wfull text-sm>
        <div v-for="(item, key) in data" :key mt4 h20 border rounded-lg pl2 pt4.5>
          <div flex="~" justify-between>
            <div>
              产品名称: {{ item.title }}
            </div>
            <div pl6 w="1/2">
              最低存款: {{ item.minimum }}.00
            </div>
          </div>
          <div flex="~" mt2 justify-between>
            <div>
              年化收益: {{ item.yield }}%
            </div>
            <div pl6 w="1/2">
              预期收益: {{ item.prospective }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter :index="3" />
  </div>
</template>
