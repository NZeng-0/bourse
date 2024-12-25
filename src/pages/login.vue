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
const src = ref(' ')
const user = ref({
  name: '',
  pwd: '',
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
  const { data, error } = await login(user.value)
  if (error)
    wait.value = false

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
      <div w-full text-center>
        <input v-model="user.name" type="text" :class="scoped()" p6 :placeholder="t('login.account')">
      </div>
      <div mt5 w-full text-center>
        <input v-model="user.pwd" type="password" :class="scoped()" p6 :placeholder="t('login.password')">
      </div>
      <div mt4 w-full text-center>
        <input type="text" :class="scoped()" readonly cursor-pointer border-none pl3 text-start :value="t('login.forget')">
      </div>
      <div mt3 w-full text-center>
        <button class="border='#E7E7E7' h12 w70 border rounded-2xl bg-#673DDA text-white" @click="onLogin">
          {{ t('login.login') }}
        </button>
      </div>
      <div mt5 w-full text-center>
        <RouterLink to="/register">
          <input type="button" class="text-#673DDA" h12 w70 cursor-pointer rounded-2xl border-none :value="t('login.sign_up')">
        </RouterLink>
      </div>
    </div>
    <div flex="~" mt10 w-full justify-center>
      <div h12 w70 rounded-2xl text-center>
        <RouterLink to="/menu/serve">
          {{ t('login.service') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
