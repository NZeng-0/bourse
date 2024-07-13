<script setup lang="ts">
const { t } = useI18n()

const route = useRouter()

const list = [
  {
    type: 2,
    time: '2023-05-25 18:30:31',
    title: '异地登录提醒',
    content: '你的账号于2022-08-08 10:09:09在异地登录。请确认 账号安全，及时修改密码。',
  },
  {
    type: 2,
    time: '2023-05-25 18:30:31',
    title: '账户冻结提醒',
    content: '你的账号于2022-08-08 10:09:09操作异常，违反用户 操作规范，已被暂时冻结，为确保您的账号安全，请规范 操作并联系在线客服提交解冻申请。',
  },
]

function go(key: number) {
  route.push(`/menu/message/detail/${key}`)
}

function getBgStyle() {
  return 'py3 pl2.75 text-sm text-black mt2.5 h41 rounded-2.25 bg-white  pr4'
}
</script>

<template>
  <div bg-trading font-normal opacity70>
    <TheMenuHead :title="t('me.message.title')" />
    <div h-screen overflow-y-scroll px7.5>
      <div v-for="(item, key) in list" :key :class="getBgStyle()">
        <div class="font-['youshe']" text-lg>
          {{ t('me.message.title') }}:
        </div>
        <div wfull>
          <div>
            {{ item.title }}
          </div>
          <div>
            {{ item.time }}
          </div>
        </div>
        <div my1 wfull text-sm opacity60>
          <p>
            {{ item.content }}
          </p>
        </div>
        <div wfull class="text-#4AADF0" @click="go(key)">
          {{ t('me.message.details') }}
        </div>
      </div>
      <div h50 />
    </div>
    <TheFooter :index="4" />
  </div>
</template>
