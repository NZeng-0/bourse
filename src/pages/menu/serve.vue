<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <TheMenuHead :title="t('serve.contact')" />
  <div class="method-list" px6>
    <div class="item">
      <div flex="~" items-center>
        <img src="../../assets/images/me/serve/online.png" class="icon">
        <div class="text">
          在线客服
        </div>
      </div>
      <img src="../../assets/images/me/serve/to.png" class="to">
    </div>
    <div class="item">
      <div flex="~" items-center>
        <img src="../../assets/images/me/serve/whats.png" class="icon">
        <div class="text">
          whatsapp
        </div>
      </div>
      <img src="../../assets/images/me/serve/to.png" class="to">
    </div>
    <div class="item">
      <div flex="~" items-center>
        <img src="../../assets/images/me/serve/tel.png" class="icon">
        <div class="text">
          Telegram
        </div>
      </div>
      <img src="../../assets/images/me/serve/to.png" class="to">
    </div>
    <div class="item">
      <div flex="~" items-center>
        <img src="../../assets/images/me/serve/line.png" class="icon">
        <div class="text">
          line
        </div>
      </div>
      <img src="../../assets/images/me/serve/to.png" class="to">
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
