<script setup lang="ts">
import {
  login,
  register,
} from '~/api'
import { useLocalCache, useRegister } from '~/hook'
import { useUser } from '~/store/useUser'
import type {
  registerTypes,
  userTypes,
} from '~/types'

const { t } = useI18n()
const { setCache } = useLocalCache()
const {
  useShow,
  isShow,
  isUserFilled,
  getClass,
  onLoginSuccessful,
} = useRegister()
const router = useRouter()
const userStore = useUser()

const wait = ref(false)

const user = ref<registerTypes>({
  account: '',
  pwd: '',
  verify_pwd: '',
  nickname: '',
  phone: '',
  operation_pwd: '',
  email: '',
  idcard: '',
  spread_code: '',
})

async function onRegister() {
  const allFilled = isUserFilled(user.value)

  if (allFilled) {
    showToast({
      message: `${t(allFilled)}${t('notNull')} `,
    })
    return
  }

  if (wait.value) {
    showToast({
      message: t('assets.tips'),
    })
    return
  }

  wait.value = true
  const { data } = await register(user.value)
  showToast({
    message: data.value.msg,
  })
  wait.value = false

  if (data.value.code === 200) {
    const { data } = await login({
      name: user.value.account,
      pwd: user.value.pwd,
    })
    setCache('token', data.value.data.token)
    userStore.data = await onLoginSuccessful() as userTypes
    router.push('/')
  }
}

onMounted(async () => await useShow())
</script>

<template>
  <div flex="~ wrap" mt13 h-screen justify-center overflow-y-scroll>
    <div v-if="isShow('front_menu_from_yhm')" w-full text-center>
      <input v-model="user.account" type="text" :class="getClass()" :placeholder="t('register.account')">
    </div>
    <div v-if="isShow('front_menu_from_dlmm')" mt3 w-full text-center>
      <input v-model="user.pwd" type="password" :class="getClass()" :placeholder="t('register.password')">
    </div>
    <div v-if="isShow('front_menu_from_qrdlmm')" mt3 w-full text-center>
      <input v-model="user.verify_pwd" type="password" :class="getClass()" :placeholder="t('register.confirm_pwd')">
    </div>
    <div v-if="isShow('front_menu_from_zfmm')" mt3 w-full text-center>
      <input v-model="user.operation_pwd" type="password" :class="getClass()" :placeholder="t('register.pay_pwd')">
    </div>
    <div v-if="isShow('front_menu_from_qrzfmm')" mt3 w-full text-center>
      <input type="password" :class="getClass()" :placeholder="t('register.confirm_pay_pwd')">
    </div>
    <div v-if="isShow('front_menu_from_xm')" mt3 w-full text-center>
      <input v-model="user.nickname" type="text" :class="getClass()" :placeholder="t('register.name')">
    </div>
    <div v-if="isShow('front_menu_from_sfzh')" mt3 w-full text-center>
      <input v-model="user.idcard" type="text" :class="getClass()" :placeholder="t('register.id_card')">
    </div>
    <div v-if="isShow('front_menu_from_sjhm')" mt3 w-full text-center>
      <input v-model="user.phone" type="text" :class="getClass()" :placeholder="t('register.phone')">
    </div>
    <div mt3 w-full text-center>
      <input v-model="user.email" type="email" :class="getClass()" :placeholder="t('register.email')">
    </div>
    <div v-if="isShow('front_menu_from_yqm')" mt3 w-full text-center>
      <input v-model="user.spread_code" type="text" :class="getClass()" :placeholder="t('register.invitation_code')">
    </div>
    <div mt8 w-full text-center>
      <button class="bg-#673DDA" h12 w70 border rounded-2xl text-white @click="onRegister()">
        {{ t('register.sign_up') }}
      </button>
    </div>
    <div mt5 w-full text-center>
      <RouterLink to="/login">
        <input type="text" readonly h12 w70 cursor-pointer rounded-2xl text-center text-sm :value="t('register.login')">
      </RouterLink>
    </div>
    <div h70 />
  </div>
</template>
