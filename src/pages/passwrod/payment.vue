<script setup lang="ts">
const { t } = useI18n()
function getClass() {
  return 'w-full border border-#F4F4F4 rounded-xl bg-#F4F4F4 px-3.25 border-box h13 items-center justify-between text-base'
}
</script>

<template>
  <div class="font-['PingFang_SC']">
    <TheMenuHead :title="t('me.secure.change_payment.title')" />
    <div px6 text-base>
      <div mt9>
        {{ t('me.secure.change_payment.old_password') }}
        <div>
          <input type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        {{ t('me.secure.change_payment.confirm_old_password') }}
        <div>
          <input type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        {{ t('me.secure.change_payment.new_password') }}
        <div>
          <input type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        {{ t('me.secure.change_payment.confirm_new_password') }}
        <div>
          <input type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
    </div>
    <div mt9.5 flex="~" justify-center>
      <button h10.5 min-w37.5 rounded-lg bg-btn-select px2 text-white>
        {{ t('me.secure.confirm') }}
      </button>
    </div>
  </div>
</template>
