<script setup lang="ts">
import {
  getConfigList,
  getUserInfo,
  login,
  register,
} from '~/api'
import { useConf } from '~/store/useConf'
import { useLocalCache } from '~/hook'
import { useUser } from '~/store/useUser'
import type {
  registerTypes,
  userTypes,
  withdrawMethodType,
} from '~/types'

const { t } = useI18n()
const { setCache } = useLocalCache()
const router = useRouter()
const userStore = useUser()
const conf = useConf()
const useIdCard = ref(false)
const usePhone = ref(false)
const useEmail = ref(false)
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

function isUserFilled(user: registerTypes) {
  // 获取对象的所有键
  const keys = Object.keys(user)
  // 遍历每个键，检查对应的值是否为空
  for (const key of keys) {
    // 对于字符串类型的字段，检查是否为空字符串
    // 对于其他类型（如数字），可以根据需要调整检查逻辑
    if (typeof user[key] === 'string' && user[key].trim() === '') {
      if (key === 'spread_code')
        continue
      return false
    }
  }
  // 如果所有字段都非空，返回true
  return true
}

async function onRegister() {
  const allFilled = isUserFilled(user.value)

  if (!allFilled) {
    if (useIdCard.value || usePhone.value || useEmail.value) {
      showToast({
        message: t('check'),
      })
      return
    }
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

async function onLoginSuccessful() {
  const { data } = await getUserInfo()
  return data.value.data
}

function getClass() {
  return 'border-#E7E7E7 h12 w70 border rounded-2xl p6 text-black'
}

function eachConf() {
  if (conf.data === undefined)
    return
  conf.data!.forEach((e: withdrawMethodType) => {
    if (e.key === 'register_idcard') {
      if (e.value === '1')
        useIdCard.value = true
    }
    if (e.key === 'register_phone') {
      if (e.value === '1')
        usePhone.value = true
    }
    if (e.key === 'register_email') {
      if (e.value === '1')
        useEmail.value = true
    }
  })
}

onMounted(async () => {
  if (conf.data === undefined) {
    const { data } = await getConfigList()
    conf.data = data.value.data

    eachConf()
  }
  else {
    eachConf()
  }
})
</script>

<template>
  <div flex="~ wrap" mt13 h-screen justify-center overflow-x-scroll>
    <div>
      <input v-model="user.account" type="text" :class="getClass()" :placeholder="t('register.account')">
    </div>
    <div mt3>
      <input v-model="user.pwd" type="password" :class="getClass()" :placeholder="t('register.password')">
    </div>
    <div mt3>
      <input v-model="user.verify_pwd" type="password" :class="getClass()" :placeholder="t('register.confirm_pwd')">
    </div>
    <div mt3>
      <input v-model="user.operation_pwd" type="password" :class="getClass()" :placeholder="t('register.pay_pwd')">
    </div>
    <div mt3>
      <input type="password" :class="getClass()" :placeholder="t('register.confirm_pay_pwd')">
    </div>
    <div mt3>
      <input v-model="user.nickname" type="text" :class="getClass()" :placeholder="t('register.name')">
    </div>
    <div v-if="useIdCard" mt3>
      <input v-model="user.idcard" type="text" :class="getClass()" :placeholder="t('register.id_card')">
    </div>
    <div v-if="usePhone" mt3>
      <input v-model="user.phone" type="text" :class="getClass()" :placeholder="t('register.phone')">
    </div>
    <div v-if="useEmail" mt3>
      <input v-model="user.email" type="email" :class="getClass()" :placeholder="t('register.email')">
    </div>
    <div mt3>
      <input v-model="user.spread_code" type="text" :class="getClass()" :placeholder="t('register.invitation_code')">
    </div>
    <div mt8>
      <button class="bg-#673DDA" h12 w70 border rounded-2xl text-white @click="onRegister()">
        {{ t('register.sign_up') }}
      </button>
    </div>
    <div mt5>
      <RouterLink to="/login">
        <div type="button" readonly h12 w70 rounded-2xl text-center text-sm>
          {{ t('register.login') }}
        </div>
      </RouterLink>
    </div>
    <div h60 />
  </div>
</template>
