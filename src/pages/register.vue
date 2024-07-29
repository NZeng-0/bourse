<script setup lang="ts">
import { register } from '~/api'

const { t } = useI18n()

const user = ref({
  account: 'string',
  pwd: 'string',
  verify_pwd: 'string',
  nickname: 'string',
  phone: 'string',
  operation_pwd: 'string',
  email: 'string',
  idcard: 'string',
  spread_code: 'string',
})

async function onRegister() {
  const { data } = await register(user.value)
  // eslint-disable-next-line no-console
  console.log(data.value)
}

function getClass() {
  return 'border-#E7E7E7 h12 w70 border rounded-2xl p6 text-black'
}
</script>

<template>
  <div flex="~ wrap" mt13 justify-center>
    <div>
      <input type="text" :class="getClass()" :placeholder="t('register.account')">
    </div>
    <div mt3>
      <input type="passwrod" :class="getClass()" :placeholder="t('register.password')">
    </div>
    <div mt3>
      <input type="passwrod" :class="getClass()" :placeholder="t('register.confirm_pwd')">
    </div>
    <div mt3>
      <input type="passwrod" :class="getClass()" :placeholder="t('register.pay_pwd')">
    </div>
    <div mt3>
      <input type="passwrod" :class="getClass()" :placeholder="t('register.confirm_pay_pwd')">
    </div>
    <div mt3>
      <input type="text" :class="getClass()" :placeholder="t('register.name')">
    </div>
    <div mt3>
      <input type="text" :class="getClass()" :placeholder="t('register.id_card')">
    </div>
    <div mt3>
      <input type="text" :class="getClass()" :placeholder="t('register.phone')">
    </div>
    <div mt3>
      <input type="email" :class="getClass()" :placeholder="t('register.email')">
    </div>
    <div mt3>
      <input type="text" :class="getClass()" :placeholder="t('register.invitation_code')">
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
  </div>
</template>
