<script setup lang="ts">
import { getAuthIdcard } from '~/api'

const { t } = useI18n()

const name = ref('')
const card = ref('')

onMounted(async () => {
  const { data } = await getAuthIdcard()
  name.value = t('me.auth.name_true') + (data.value.data.name || '')
  card.value = t('me.auth.card_true') + data.value.data.idcard || ''
})
</script>

<template>
  <div>
    <TheMenuHead :title="t('me.auth.title')" />
    <div mt8.75 px4 text-base>
      <div text-center>
        <img src="../../../assets/images/me/menu/verified.png" alt="verified" class="verified">
        <div class="text">
          {{ t('authSuccess') }}!
        </div>
      </div>
      <div mt6>
        <input
          v-model="name" type="text" readonly h13 wfull border rounded-2xl pl5.4
          :placeholder="t('me.auth.name_true')"
        >
      </div>
      <div mt6>
        <input
          v-model="card" type="text" readonly h13 wfull border rounded-2xl pl5.4
          :placeholder="t('me.auth.card_true')"
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.verified {
  margin: 0 auto;
  width: 40px;
  height: 40px;
  box-sizing: border-box;
  border: 2px solid;
  border-image: linear-gradient(86deg, rgba(252, 252, 252, 0.3) 2%, rgba(252, 252, 252, 0.3) 51%);
}

.text {
  font-size: 14px;
  font-weight: normal;
  line-height: 14px;
  text-align: center;
  display: flex;
  align-items: center;
  letter-spacing: 0px;
  font-variation-settings: "opsz" auto;
  color: #000000;
  margin-top: 14px;
  display: flex;
  justify-content: center;
}
</style>
