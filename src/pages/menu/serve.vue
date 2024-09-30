<script setup lang="ts">
import { getCustomerService } from '~/api'
import type { serveType } from '~/types'

const { t } = useI18n()

const whats = new URL('../../assets/images/me/serve/whats.png', import.meta.url).href
const online = new URL('../../assets/images/me/serve/online.png', import.meta.url).href
const tel = new URL('../../assets/images/me/serve/tel.png', import.meta.url).href
const line = new URL('../../assets/images/me/serve/line.png', import.meta.url).href
const list = ref<serveType[]>([])

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
    <div v-for="(item, key) in list" :key class="item" @click="go(item.link)">
      <template v-if="item.value === '1'">
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
      </template>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 20px;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  background: #FFFFFF;
  box-sizing: border-box;
  border: 1px solid #F4F4F4;
  padding: 10px;

  .icon {
    width: 25px;
    height: 25px;
  }

  .to {
    width: 24px;
    height: 24px;
  }

  .text {
    font-size: 16px;
    font-weight: normal;
    line-height: 16px;
    letter-spacing: 0em;
    color: #000000;
    margin-left: 10px;
  }
}
</style>
