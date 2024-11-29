<script setup lang="ts">
import { buyMoneyInvestment, getTotalMoneyAndYesterdayMoney } from '~/api'
import { useYuEBao } from '~/store/useYuEBao'

const { t } = useI18n()
const YuEBaoStore = useYuEBao()
const router = useRouter()

const product = YuEBaoStore.data

const money = ref('')
const current = ref()

async function buy() {
  if (useToNumber(money.value).value > useToNumber(current.value).value) {
    return showToast({
      message: `${t('buy_tips.max')}${current.value}`,
    })
  }
  if (useToNumber(money.value).value < useToNumber(product.min_price).value) {
    return showToast({
      message: `${t('buy_tips.min')}${product.min_price}`,
    })
  }
  const { data } = await buyMoneyInvestment({
    money: money.value,
    id: product.id,
  })
  if (data.value.code === 200)
    router.push('/grow/current')
}

async function init() {
  const { data } = await getTotalMoneyAndYesterdayMoney()
  current.value = data.value.data.total_money
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <div h-screen bg-trading>
    <div wfull text-center>
      <TheMenuHead :title="t('fortune.title')" />
    </div>
    <div px2>
      <!-- 商品信息 -->
      <div mx-4 mt-6 rounded-lg bg-white p-4>
        <div space-y-3>
          <div flex items-center>
            <span style="color: #030319;">产品名称：</span>
            <span style="color: #030319;">{{ product.name }}</span>
          </div>
          <div flex items-center>
            <span style="color: #030319;">最低存款：</span>
            <span style="color: #030319;">{{ product.min_price }}</span>
          </div>
          <div flex items-center>
            <span style="color: #030319;">年化收益：</span>
            <span style="color: #030319;">{{ product.rate }}</span>
          </div>
          <div flex items-center>
            <span style="color: #030319;">预计收益：</span>
            <span style="color: #030319;">{{ product.rate_price }}</span>
          </div>
        </div>
      </div>

      <div mx-4 mt-6 rounded-lg bg-white p-4>
        <!-- 余额信息 -->
        <div flex items-center justify-between>
          <span>当前余额宝余额</span>
          <span>{{ current }}</span>
        </div>

        <!-- 下单金额 -->
        <div mx2 mt2 border-t pt4>
          <div h10 flex items-center justify-between border rounded-lg px4>
            <span text-gray-600>下单金额</span>
            <input v-model="money" text-right type="number" placeholder="请输入下单金额">
          </div>
        </div>

        <!-- 确认按钮 -->
        <div mx-4 mt-8 flex justify-center>
          <button h10 w35 rounded-lg bg-btn-select text-white @click="buy">
            确认下单
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
