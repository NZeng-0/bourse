<script setup lang="ts">
const route = useRouter()

function getClass() {
  return 'border border-#F4F4F4 rounded-xl bg-white px-3.25 border-box h13 items-center justify-between text-base'
}

function go(url: string) {
  route.push(`/passwrod/${url}`)
}
</script>

<template>
  <div class="font-['PingFang_SC']">
    <TheMenuHead title="账户与安全" />
    <div mt4.125 px4 text-base>
      <div flex="~" :class="getClass()">
        <div w="1/2">
          请选择提现方式
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <div ml1.25 opacity68>
            123****8901
          </div>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
      <div flex="~" :class="getClass()" mt4.75 @click="go('login')">
        <div w="1/2">
          修改登录密码
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
      <div flex="~" :class="getClass()" mt4.75 @click="go('payment')">
        <div w="1/2">
          修改支付密码
        </div>
        <div w="1/2" flex="~" items-center justify-end>
          <div ml0.75>
            <img src="../../assets/images/me/menu/right.png" h4.25 w4.25>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
