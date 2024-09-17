<script setup lang="ts">
import { updateOperationPwd } from '~/api'

const { t } = useI18n()

const infos = ref({
  operation_pwd: '',
  operation_confirm: '',
  new_operation_pwd: '',
  new_operation_pwd_confirm: '',
})

const wait = ref(false)

async function submit() {
  if (wait.value) {
    showToast({
      message: t('assets.tips'),
    })
    return
  }
  wait.value = true
  if (infos.value.operation_pwd !== infos.value.operation_confirm) {
    showToast({
      message: t('me.tips.pwd'),
    })
    return
  }
  if (infos.value.new_operation_pwd !== infos.value.new_operation_pwd_confirm) {
    showToast({
      message: t('me.tips.new'),
    })
    return
  }
  const { data } = await updateOperationPwd(infos.value)
  showToast({
    message: data.value.msg,
  })
  wait.value = false
}

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
          <input v-model="infos.operation_pwd" type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        {{ t('me.secure.change_payment.confirm_old_password') }}
        <div>
          <input v-model="infos.operation_confirm" type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        {{ t('me.secure.change_payment.new_password') }}
        <div>
          <input v-model="infos.new_operation_pwd" type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        {{ t('me.secure.change_payment.confirm_new_password') }}
        <div>
          <input v-model="infos.new_operation_pwd_confirm" type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
    </div>
    <div mt9.5 flex="~" justify-center>
      <button h10.5 min-w37.5 rounded-lg bg-btn-select px2 text-white @click="submit()">
        {{ t('me.secure.confirm') }}
      </button>
    </div>
  </div>
</template>
