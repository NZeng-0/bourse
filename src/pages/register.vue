<script setup lang="ts">
import { register } from '~/api'

const { t } = useI18n()
const router = useRouter()

const user = ref({
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
  const { data } = await register(user.value)
  if (data.value.code)
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
      <button class="bg-#673DDA" h12 w70 border rounded-2xl text-black text-white @click="onRegister()">
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
