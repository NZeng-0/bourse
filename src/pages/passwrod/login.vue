<script setup lang="ts">
function getClass() {
  return 'w-full border border-#F4F4F4 rounded-xl bg-#F4F4F4 px-3.25 border-box h13 items-center justify-between text-base'
}
</script>

<template>
  <div class="font-['PingFang_SC']">
    <TheMenuHead title="修改登录密码" />
    <div px6 text-base>
      <div mt9>
        原登录密码
        <div>
          <input type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        确认原登录密码
        <div>
          <input type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        新登录密码
        <div>
          <input type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        确认新登录密码
        <div>
          <input type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
    </div>
    <div mt9.5 flex="~" justify-center>
      <button h10.5 w37.5 rounded-lg bg-btn-select text-white>
        确认修改
      </button>
    </div>
  </div>
</template>
