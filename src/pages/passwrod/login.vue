<script setup lang="ts">
import { updatePassword } from '~/api'

const { t } = useI18n()

const infos = ref({
  pwd: '',
  pwd_confirm: '',
  new_pwd: '',
  new_pwd_confirm: '',
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
  if (infos.value.pwd !== infos.value.pwd_confirm) {
    showToast({
      message: t('me.tips.pwd'),
    })
    return
  }
  if (infos.value.new_pwd !== infos.value.new_pwd_confirm) {
    showToast({
      message: t('me.tips.new'),
    })
    return
  }
  const { data } = await updatePassword(infos.value)
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
    <TheMenuHead :title="t('me.secure.change_login.title')" />
    <div px6 text-base>
      <div mt9>
        {{ t('me.secure.change_login.old_password') }}
        <div>
          <input v-model="infos.pwd" type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        {{ t('me.secure.change_login.confirm_old_password') }}
        <div>
          <input v-model="infos.pwd_confirm" type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        {{ t('me.secure.change_login.new_password') }}
        <div>
          <input v-model="infos.new_pwd" type="password" mt3.75 :class="getClass()" placeholder="******">
        </div>
      </div>
      <div mt6.25>
        {{ t('me.secure.change_login.confirm_new_password') }}
        <div>
          <input v-model="infos.new_pwd_confirm" type="password" mt3.75 :class="getClass()" placeholder="******">
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
