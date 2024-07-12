<script setup lang="ts">
const { t } = useI18n()
const src = new URL('../assets/images/login/logo.png', import.meta.url).href
</script>

<template>
  <div>
    <div flex="~" justify-center>
      <img mt20 h50 w50 :src>
    </div>
    <div flex="~ wrap" mt20 justify-center>
      <div>
        <input type="text" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black :placeholder="t('login.account')">
      </div>
      <div mt5>
        <input type="passwrod" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black :placeholder="t('login.password')">
      </div>
      <div mt4>
        <div type="text" readonly h12 w70 rounded-2xl pl6 text-black>
          {{ t('login.forget') }}
        </div>
      </div>
      <div mt3>
        <input type="button" class="bg-#673DDA" h12 w70 border rounded-2xl text-black text-white :value="t('login.login')">
      </div>
      <div mt5>
        <RouterLink to="/register">
          <div type="button" class="text-#673DDA" readonly h12 w70 rounded-2xl text-center>
            {{ t('login.sign_up') }}
          </div>
        </RouterLink>
      </div>
    </div>
    <div flex="~" mt23 justify-center>
      <div type="button" readonly h12 w70 rounded-2xl text-center>
        {{ t('login.service') }}
      </div>
    </div>
  </div>
</template>
