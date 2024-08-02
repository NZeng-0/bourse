<script setup lang="ts">
import pop from '~/components/popup'
import { getIndexMsg } from '~/api'

// const router = useRouter()
const { t } = useI18n()

async function getPopMsg() {
  const { data } = await getIndexMsg()
  const temp = data.value.data.pop_window_message

  // 用于逐条显示消息
  async function showNextMessage(index = 0) {
    if (index < temp.length) {
      const e = temp[index]
      pop({
        message: e.value,
        title: e.remark,
        submit: t('popup.confrim'),
        onClose: () => showNextMessage(index + 1),
      })
    }
  }

  // 开始显示第一条消息
  showNextMessage()
}

async function init() {
  Promise.all([getPopMsg()])
}

onMounted(async () => {
  await init()
})
</script>

<template>
  <div p="x-4 y-10">
    <TheCard />
    <div flex="~" mt1 items-center>
      <img src="../assets/images/inform.png" h8 w8>
      <div class="banner_textscroll" ml4 overflow-hidden text-sm>
        <div>
          英伟达将推出其最新人工智能芯片的中国特...
        </div>
      </div>
    </div>
    <ThePortfolio />
    <TheFooter :index="0" />
  </div>
</template>
