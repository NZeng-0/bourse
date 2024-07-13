<script setup lang=ts>
const { t } = useI18n()
const route = useRouter()
const index = ref(0)

const data = ref([
  { title: '余额宝365天', state: t('fortune.state_type.underway'), current: 0, prospective: 1500, date: '08-08 10:10', savings: 10000 },
  { title: '余额宝180天', state: t('fortune.state_type.underway'), current: 0, prospective: 29.85, date: '08-08 10:10', savings: 1000 },
  { title: '余额宝30天', state: t('fortune.state_type.underway'), current: 0, prospective: 0.2, date: '08-08 10:10', savings: 100 },
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
          <b class="text-#121826" text-center text-base @click="changeCurrent(0, 'grow/solution')">
            {{ t('fortune.fixture_plan') }}
          </b>
          <b class="text-#673BF6" text-center text-base @click="changeCurrent(1, 'grow/current')">
            {{ t('fortune.current_yield') }}
          </b>
          <b class="text-#121826" text-center text-base @click="changeCurrent(2, 'grow/histroy')">
            {{ t('fortune.historical_yield') }}
          </b>
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
            <div w="1/3">
              {{ t('fortune.current_yield') }}: {{ item.current }}
            </div>
            <div w="1/3">
              {{ t('fortune.projected_revenue') }}: {{ item.prospective }}
            </div>
          </div>
          <div mt2 flex="~" justify-between text-xs>
            <div w="1/3" class="text-#707070">
              {{ item.date }}
            </div>
            <div w="1/3" />
            <div w="1/3" text-black>
              <span class="text-#673BF6">
                {{ t('fortune.termination') }}
              </span>
              |
              <span class="text-#673BF6">
                {{ t('fortune.renewal') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheFooter :index="3" />
  </div>
</template>
