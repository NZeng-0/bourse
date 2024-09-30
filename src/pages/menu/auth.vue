<script setup lang="ts">
import { submitAuthIdcard, upload } from '~/api'

const { t } = useI18n()

const id_front = ref([])
const id_back = ref([])

const wait = ref(false)
const infos = ref({
  name: '',
  idcard: '',
  idcard_front_image: '',
  idcard_side_image: '',
})

// 创建FormData对象。上传图片需要转换二进制，这里要用到FormData
const frontForms = new FormData()
const backForms = new FormData()

// in read request
async function readFront(file: any) {
  // "file"表示给后台传的属性名字
  frontForms.append('file', file.file)
  infos.value.idcard_front_image = await beforeSubmit(frontForms)
}

async function readBack(file: any) {
  // "file"表示给后台传的属性名字
  backForms.append('file', file.file)
  infos.value.idcard_side_image = await beforeSubmit(backForms)
}

async function beforeSubmit(forms: FormData) {
  const { data } = await upload(forms)
  return data.value.data.file
}

async function afterSubmit() {
  // const { data } = await getAuthIdcard()
}

async function submit() {
  // 先获取正面，在获取反面
  if (wait.value) {
    showToast({
      message: t('assets.tips'),
    })
    return
  }

  wait.value = true

  const { data } = await submitAuthIdcard(infos.value)
  showToast({
    message: data.value.msg,
  })
  wait.value = false
  await afterSubmit()
}
</script>

<template>
  <div>
    <TheMenuHead :title="t('me.auth.title')" />
    <div mt8.75 px4 text-base>
      <div>
        <input v-model="infos.name" type="text" h13 wfull border rounded-2xl pl5.4 :placeholder="t('me.auth.name')">
      </div>
      <div mt5.25>
        <input
          v-model="infos.idcard" type="text" h13 wfull border rounded-2xl pl5.4
          :placeholder="t('me.auth.id_card')"
        >
      </div>
      <div mt3.25 h59.25 border rounded-2xl>
        <div flex="~" h11.5 wfull items-center border-b rounded-t-2xl pl5.4>
          {{ t('me.auth.front_and_back') }}
        </div>
        <div h47.55 flex="~" text-base class="text-#999999">
          <van-uploader
            v-model="id_front" w="1/2" multiple :after-read="readFront"
            class="flex-level h-full items-center justify-center border-r px5" :max-count="1" preview-size="100%"
          >
            {{ t('me.auth.front') }}
          </van-uploader>
          <van-uploader
            v-model="id_back" w="1/2" class="flex-level h-full items-center justify-center px5" multiple
            :after-read="readBack" :max-count="1" preview-size="100%"
          >
            {{ t('me.auth.back') }}
          </van-uploader>
        </div>
      </div>
      <div mt12.5 flex="~" justify-center>
        <button h10.5 min-w37.5 rounded-lg bg-btn-select px2 text-white @click="submit()">
          {{ t('me.auth.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>
