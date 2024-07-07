<script setup lang="ts">
const src = new URL('../assets/images/login/logo.png', import.meta.url).href
</script>

<template>
  <div>
    <div flex="~" justify-center>
      <img mt20 h50 w50 :src>
    </div>
    <div flex="~ wrap" mt20 justify-center>
      <div>
        <input type="text" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="账号">
      </div>
      <div mt5>
        <input type="passwrod" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="密码">
      </div>
      <div mt4>
        <div type="text" readonly h12 w70 rounded-2xl pl6 text-black>
          忘记密码
        </div>
      </div>
      <div mt3>
        <input type="button" class="bg-#673DDA" h12 w70 border rounded-2xl text-black text-white value="登录">
      </div>
      <div mt5>
        <RouterLink to="/register">
          <div type="button" class="text-#673DDA" readonly h12 w70 rounded-2xl text-center>
            开户
          </div>
        </RouterLink>
      </div>
    </div>
    <div flex="~" mt23 justify-center>
      <div type="button" readonly h12 w70 rounded-2xl text-center>
        联系客服
      </div>
    </div>
  </div>
</template>
