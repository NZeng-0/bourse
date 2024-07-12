<script setup lang=ts>
const { t } = useI18n()
const route = useRouter()
const index = ref(0)

const data = ref([
  { title: '余额宝365天', state: t('fortune.state_type.failed'), total: 1500, date: '2022-08-08 10:10/2023-08-08 10:10', savings: 10000 },
  { title: '余额宝180天', state: t('fortune.state_type.failed'), total: 29.85, date: '2022-08-08 10:10/2023-08-08 10:10', savings: 1000 },
  { title: '余额宝30天', state: t('fortune.state_type.failed'), total: 0.2, date: '2022-08-08 10:10/2023-08-08 10:10', savings: 100 },
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
          <b text-base class="text-#121826" @click="changeCurrent(0, 'grow/solution')">固定方案</b>
          <b text-base class="text-#121826" @click="changeCurrent(1, 'grow/current')">当前收益</b>
          <b text-base class="text-#673BF6" @click="changeCurrent(2, 'grow/histroy')">历史收益</b>
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
              {{ t('fortune.state') }}: {{ item.state }}
            </div>
            <div w="1/3" />
            <div w="1/3">
              {{ t('fortune.accumulated_earnings') }}: {{ item.total }}
            </div>
          </div>
          <div mt2 flex="~" justify-between text-xs>
            <div w="2/3" class="text-#707070">
              {{ item.date }}
            </div>
            <div w="1/3" class="text-#673BF6">
              {{ t('fortune.repurchase') }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter :index="3" />
  </div>
</template>
