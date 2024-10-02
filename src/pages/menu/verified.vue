<script setup lang="ts">
const { t } = useI18n()

const name = t('me.auth.name_true')
const card = t('me.auth.card_true')
</script>

<template>
  <div>
    <TheMenuHead :title="t('me.auth.title')" />
    <div mt8.75 px4 text-base>
      <div text-center>
        <img src="../../assets/images/me/menu/verified.png" alt="verified" class="verified">
        <div class="text">
          实名认证成功！
        </div>
      </div>
      <div mt6>
        <input type="text" :value="name" readonly h13 wfull border rounded-2xl pl5.4>
      </div>
      <div mt6>
        <input type="text" :value="card" readonly h13 wfull border rounded-2xl pl5.4>
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
