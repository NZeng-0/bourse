<script setup lang="ts">
import pop from '~/components/popup'
import { getIndexMsg } from '~/api'
import loading from '~/components/loading'

interface IndexMsg {
  id: number
  key: string
  condition: string
  value: string
  link: string
  remark: string
  status: number
  sort: number
  start_time: string
  end_time: string
  create_time: string
}

const router = useRouter()
const { t } = useI18n()

const messages = ref<IndexMsg[]>()

async function getPopMsg() {
  const { data } = await getIndexMsg()
  messages.value = data.value.data.pop_window_message
}

async function init() {
  Promise.all([getPopMsg()])
}

function showNextMessage(index = 0) {
  if (messages.value === undefined)
    router.push('/login')
  if (index < messages.value!.length) {
    const e = messages.value![index]
    pop({
      message: e.value,
      title: e.remark,
      submit: t('popup.confrim'),
      onClose: () => showNextMessage(index + 1),
    })
  }
}

onMounted(async () => {
  loading.show()
  await init()
  setTimeout(() => {
    loading.close()
    showNextMessage()
  }, 1200)
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
    <div h30 />
  </div>
  <TheFooter :index="0" />
</template>
