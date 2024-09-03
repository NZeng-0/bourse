<script setup lang="ts">
import { register } from '~/api'
import message from '~/components/message'

interface userType {
  account: string
  pwd: string
  verify_pwd: string
  nickname: string
  phone: string
  operation_pwd: string
  email: string
  idcard: string
  spread_code: string
  [Key: string]: string
}

const { t } = useI18n()
const router = useRouter()

const wait = ref(false)

const user = ref<userType>({
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

function isUserFilled(user: userType) {
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
    message({
      // TODO i18n
      message: '请检查填写',
      duration: 1500,
    })
    return
  }

  if (wait.value) {
    message({
      message: t('assets.tips'),
      duration: 1500,
    })
    return
  }

  wait.value = true
  const { data } = await register(user.value)
  message({
    message: data.value.msg,
    duration: 1500,
  })
  wait.value = false

  if (data.value.code === 200)
    router.push('/login')
}

function getClass() {
  return 'border-#E7E7E7 h12 w70 border rounded-2xl p6 text-black'
}
</script>

<template>
  <div flex="~ wrap" mt13 h-screen justify-center overflow-x-scroll>
    <div>
      <input v-model="user.account" type="text" :class="getClass()" :placeholder="t('register.account')">
    </div>
    <div mt3>
      <input v-model="user.pwd" type="passwrod" :class="getClass()" :placeholder="t('register.password')">
    </div>
    <div mt3>
      <input v-model="user.verify_pwd" type="passwrod" :class="getClass()" :placeholder="t('register.confirm_pwd')">
    </div>
    <div mt3>
      <input v-model="user.operation_pwd" type="passwrod" :class="getClass()" :placeholder="t('register.pay_pwd')">
    </div>
    <div mt3>
      <input type="passwrod" :class="getClass()" :placeholder="t('register.confirm_pay_pwd')">
    </div>
    <div mt3>
      <input v-model="user.nickname" type="text" :class="getClass()" :placeholder="t('register.name')">
    </div>
    <div mt3>
      <input v-model="user.idcard" type="text" :class="getClass()" :placeholder="t('register.id_card')">
    </div>
    <div mt3>
      <input v-model="user.phone" type="text" :class="getClass()" :placeholder="t('register.phone')">
    </div>
    <div mt3>
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
