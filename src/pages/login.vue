<script setup lang="ts">
import { login } from '~/api'
import message from '~/components/message'
import { useLocalCache } from '~/hook'

const { setCache } = useLocalCache()
const { t } = useI18n()
const src = new URL('../assets/images/login/logo.png', import.meta.url).href
const router = useRouter()

const user = ref({
  name: 'qwer',
  pwd: '123456',
})

async function onLogin() {
  const { data } = await login(user.value)
  // eslint-disable-next-line no-console
  console.log(data.value.data)
  if (data.value.code === 5001) {
    message({
      message: data.value.msg,
      duration: 3000,
    })
  }
  else {
    setCache('token', data.value.data.token)
    router.push('/')
  }
}
</script>

<template>
  <div>
    <div flex="~" justify-center>
      <img mt20 h50 w50 :src>
    </div>
    <div flex="~ wrap" mt20 justify-center>
      <div>
        <input
          v-model="user.name" type="text" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black
          :placeholder="t('login.account')"
        >
      </div>
      <div mt5>
        <input
          v-model="user.pwd" type="passwrod" class="border-#E7E7E7" h12 w70 border rounded-2xl p6 text-black
          :placeholder="t('login.password')"
        >
      </div>
      <div mt4>
        <div type="text" readonly h12 w70 rounded-2xl pl6 text-black>
          {{ t('login.forget') }}
        </div>
      </div>
      <div mt3>
        <input
          type="button" class="bg-#673DDA" h12 w70 border rounded-2xl text-black text-white
          :value="t('login.login')" @click="onLogin()"
        >
      </div>
      <div mt5>
        <RouterLink to="/register">
          <div type="button" class="text-#673DDA" readonly h12 w70 rounded-2xl text-center>
            {{ t('login.sign_up') }}
          </div>
        </RouterLink>
      </div>
    </div>
    <div flex="~" mt23 justify-center>
      <div type="button" readonly h12 w70 rounded-2xl text-center>
        {{ t('login.service') }}
      </div>
    </div>
  </div>
</template>
