<script setup lang="ts">
import { getCustomerService } from '~/api'
import type { configlist } from '~/types'

const { t } = useI18n()

const whats = new URL('../../assets/images/me/serve/whats.png', import.meta.url).href
const online = new URL('../../assets/images/me/serve/online.png', import.meta.url).href
const tel = new URL('../../assets/images/me/serve/tel.png', import.meta.url).href
const line = new URL('../../assets/images/me/serve/line.png', import.meta.url).href
const list = ref<configlist[]>([])

function go(url: string) {
  window.open(`http://${url}`)
}

onMounted(async () => {
  const { data } = await getCustomerService()
  list.value = data.value.data
})
</script>

<template>
  <TheMenuHead :title="t('serve.contact')" />
  <div class="method-list" px6>
    <template v-for="(item, key) in list" :key>
      <div v-if="item.value === '1'" class="item" @click="go(item.link!)">
        <div flex="~" items-center>
          <img v-if="item.key === 'zxkf'" :src="online" class="icon">
          <img v-if="item.key === 'whatsapp'" :src="whats" class="icon">
          <img v-if="item.key === 'telegram'" :src="tel" class="icon">
          <img v-if="item.key === 'line'" :src="line" class="icon">

          <div class="text">
            {{ item.remark }}
          </div>
        </div>
        <img src="../../assets/images/me/serve/to.png" class="to">
      </div>
    </template>
  </div>
</template>

<style scoped>
.item {
  margin-top: 1.429rem;
  width: 100%;
  height: 3.571rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1.143rem;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1px solid #F4F4F4;
  padding: 0.714rem;

  .icon {
    width: 1.786rem;
    height: 1.786rem;
  }

  .to {
    width: 1.714rem;
    height: 1.714rem;
  }

  .text {
    font-size: 1.143rem;
    font-weight: normal;
    line-height: 1.143rem;
    letter-spacing: 0em;
    color: #000000;
    margin-left: 0.714rem;
  }
}
</style>
