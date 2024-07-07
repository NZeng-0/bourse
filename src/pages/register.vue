<script setup lang="ts">

</script>

<template>
  <div flex="~ wrap" mt13 justify-center>
    <div>
      <input type="text" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="用户名">
    </div>
    <div mt3>
      <input type="passwrod" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="密码">
    </div>
    <div mt3>
      <input type="passwrod" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="确认密码">
    </div>
    <div mt3>
      <input type="passwrod" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="支付密码">
    </div>
    <div mt3>
      <input type="passwrod" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="确认支付密码">
    </div>
    <div mt3>
      <input type="text" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="姓名">
    </div>
    <div mt3>
      <input type="text" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="身份证">
    </div>
    <div mt3>
      <input type="text" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="手机号码">
    </div>
    <div mt3>
      <input type="email" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="电子邮箱">
    </div>
    <div mt3>
      <input type="text" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black placeholder="邀请码">
    </div>
    <div mt8>
      <input type="button" class="bg-#673DDA" h12 w70 border rounded-2xl text-black text-white value="开户">
    </div>
    <div mt5>
      <RouterLink to="/login">
        <div type="button" readonly h12 w70 rounded-2xl text-center text-sm>
          已有账户，登录
        </div>
      </RouterLink>
    </div>
  </div>
</template>
