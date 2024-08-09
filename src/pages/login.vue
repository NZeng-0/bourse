<script setup lang="ts">
import { getUserInfo, login } from '~/api'
import message from '~/components/message'
import { useLocalCache } from '~/hook'
import type { userTypes } from '~/store/useUser'
import { useUser } from '~/store/useUser'

const userStore = useUser()

const { setCache } = useLocalCache()
const { t } = useI18n()
const src = new URL('../assets/images/login/logo.png', import.meta.url).href
const router = useRouter()

const user = ref({
  name: 'qwer',
  pwd: '123456',
})
const wait = ref(false)

async function onLoginSuccesful() {
  const { data } = await getUserInfo()
  return data.value.data
}

async function onLogin() {
  if (wait.value)
    return

  wait.value = true
  const { data } = await login(user.value)
  if (data.value.code === 5001) {
    message({
      message: data.value.msg,
      duration: 3000,
    })
  }
  else {
    setCache('token', data.value.data.token)
    const userInfo = await onLoginSuccesful() as userTypes
    userStore.data = userInfo
    router.push('/')
  }
  wait.value = false
}

function scoped() {
  return 'h12 w70 border rounded-2xl text-black  border="#E7E7E7"'
}
</script>

<template>
  <div>
    <div flex="~" justify-center>
      <img mt10 h40 w40 :src>
    </div>
    <div flex="~ wrap" mt10 justify-center>
      <div>
        <input v-model="user.name" type="text" :class="scoped()" p6 :placeholder="t('login.account')">
      </div>
      <div mt5>
        <input v-model="user.pwd" type="passwrod" :class="scoped()" p6 :placeholder="t('login.password')">
      </div>
      <div mt4>
        <div type="text" readonly h12 w70 rounded-2xl pl6 text-black>
          {{ t('login.forget') }}
        </div>
      </div>
      <div mt3>
        <button class="bg-#673DDA" :class="scoped()" text-white @click="onLogin()">
          {{ t('login.login') }}
        </button>
      </div>
      <div mt5>
        <RouterLink to="/register">
          <div type="button" class="text-#673DDA" readonly h12 w70 rounded-2xl border-none text-center>
            {{ t('login.sign_up') }}
          </div>
        </RouterLink>
      </div>
    </div>
    <div flex="~" mt10 justify-center>
      <div type="button" readonly h12 w70 rounded-2xl text-center>
        {{ t('login.service') }}
      </div>
    </div>
  </div>
</template>
