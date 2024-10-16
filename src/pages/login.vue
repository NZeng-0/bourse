<script setup lang="ts">
import {
  getConfigList,
  getUserInfo,
  login,
} from '~/api'
import { useLocalCache } from '~/hook'
import { useUser } from '~/store/useUser'
import { useConf } from '~/store/useConf'
import type {
  configlist,
  userTypes,
} from '~/types'
import 'vant/es/notify/style'

const { t } = useI18n()
const { setCache } = useLocalCache()
const router = useRouter()
const userStore = useUser()
const conf = useConf()
const wait = ref(false)
// const src = ref(new URL('../assets/images/login/logo.png', import.meta.url).href)
const src = ref(' ')
const user = ref({
  name: 'qwer',
  pwd: '123456',
})

async function onLoginSuccessful() {
  const { data } = await getUserInfo()
  return data.value.data
}

async function onLogin() {
  if (wait.value) {
    showToast(t('assets.tips'))
    return
  }

  wait.value = true
  const { data } = await login(user.value)
  showToast(data.value.msg)

  if (data.value.code === 200) {
    setCache('token', data.value.data.token)
    userStore.data = await onLoginSuccessful() as userTypes
    router.push('/')
  }
  wait.value = false
}

function scoped() {
  return 'h12 w70 border rounded-2xl text-black  border="#E7E7E7"'
}

onMounted(async () => {
  const { data } = await getConfigList()
  conf.data = data.value.data
  const temp = conf.data.find((e: configlist) => e.key === 'website_logo')
  src.value = `${baseUrl}/${temp.value}`
})
</script>

<template>
  <div>
    <div flex="~" justify-center>
      <img mt10 min-h40 :src>
    </div>
    <div flex="~ wrap" mt10 justify-center>
      <div>
        <input v-model="user.name" type="text" :class="scoped()" p6 :placeholder="t('login.account')">
      </div>
      <div mt5>
        <input v-model="user.pwd" type="password" :class="scoped()" p6 :placeholder="t('login.password')">
      </div>
      <div mt4>
        <div type="text" readonly h12 w70 rounded-2xl pl6 text-black>
          {{ t('login.forget') }}
        </div>
      </div>
      <div mt3>
        <button class="border='#E7E7E7' h12 w70 border rounded-2xl bg-#673DDA text-white" @click="onLogin">
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
      <div h12 w70 rounded-2xl text-center>
        <RouterLink to="/menu/serve">
          {{ t('login.service') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
