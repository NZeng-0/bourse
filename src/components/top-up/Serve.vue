<script setup lang="ts">
const { t } = useI18n()
const router = useRouter()

const serve = new URL('../../assets/images/top-up/serve.svg', import.meta.url).href

function go() {
  router.push('/menu/serve')
}
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
    <button class="serve" @click="go()">
      {{ t('serve.contact') }}
    </button>
  </div>
</template>

<style scoped>
.title {
  font-size: 1rem;
  font-weight: normal;
  line-height: 1.071rem;
  letter-spacing: 0em;
  font-variation-settings: "opsz" auto;
  color: #000000;
}

.sub-title {
  font-size: 0.786rem;
  font-weight: normal;
  line-height: 0.786rem;
  letter-spacing: 0rem;
  font-variation-settings: "opsz" auto;
  color: rgba(0, 0, 0, 0.27);
}

.serve {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0.143rem 0.714rem;
  box-sizing: border-box;
  border: 0.057rem solid #7751F1;
  border-radius: 7.143rem;
  font-size: 1.071rem;
  font-weight: normal;
  line-height: 2rem;
  text-align: center;
  letter-spacing: 0rem;
  font-variation-settings: "opsz" auto;
  color: #7751F1;
}
</style>
