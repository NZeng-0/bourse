<script setup lang="ts">
const { t } = useI18n()

const serve = new URL('../../assets/images/top-up/serve.svg', import.meta.url).href
</script>

<template>
  <div flex="~" mt6 h-full items-center justify-between rounded-2.5 bg-white px-5 pb4.25 pt3.75>
    <div flex="~" items-center>
      <img :src="serve" alt="serve">
      <div ml-2>
        <p class="title">
          {{ t('serve.online') }}
        </p>
        <p class="sub-title" mt-2>
          {{ t('serve.content') }}
        </p>
      </div>
    </div>
    <button class="serve">
      {{ t('serve.contact') }}
    </button>
  </div>
</template>

<style scoped>
.title {
  font-size: 14px;
  font-weight: normal;
  line-height: 15px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #000000;
}

.sub-title {
  font-size: 11px;
  font-weight: normal;
  line-height: 11px;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: rgba(0, 0, 0, 0.27);
}

.serve {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2px 10px;
  box-sizing: border-box;
  border: 0.8px solid #7751F1;
  border-radius: 100px;
  font-size: 15px;
  font-weight: normal;
  line-height: 28px;
  text-align: center;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #7751F1;
}
</style>
