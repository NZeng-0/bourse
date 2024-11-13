<script setup lang="ts">
import { getUserInfo, updateUserInfo, upload } from '~/api'
import { useUser } from '~/store/useUser'
import type { configlist } from '~/types'
import { useConf } from '~/store/useConf'

const { t } = useI18n()
const store = useUser()
const showBottom = ref(false)
const froms = new FormData()
const avatar = ref(store.data.avatar)
const path = ref('')
const conf = useConf()

async function read(file: any) {
  // "file"表示给后台传的属性名字
  froms.append('file', file.file)
  path.value = await onUpload()

  await update()

  const { data } = await getUserInfo()
  store.data = data.value.data

  showBottom.value = false
}

async function onUpload() {
  const { data, error } = await upload(froms)

  if (error.value)
    return null
  else
    return data.value.data.file
}

async function update() {
  await updateUserInfo(path.value)
}

function getUrl(host: string, uri: string) {
  return `${host}/${uri}`
}

function error() {
  if (!store.data.avatar) {
    conf.data.forEach((e: configlist) => {
      if (e.key === 'app_log')
        return avatar.value = `${baseUrl}/${e.value}`
    })
  }
  else {
    avatar.value = getUrl(baseUrl, store.data.avatar)
  }
}
</script>

<template>
  <div>
    <TheMenuHead :title="t('avator.title')" />
    <div flex="~" items-center justify-center>
      <div relative mt10>
        <img bg="#DBEAFE" h50 w50 rounded-full :src="avatar" @error="error">
        <img src="../../assets/images/shot.png" absolute bottom-1 right-5 h12 w12 @click="showBottom = !showBottom">
      </div>
    </div>
    <div mt30 px6>
      <button bg="#673BF6/29" h12 w-full rounded-lg text-white>
        {{ t('avator.confirm') }}
      </button>
    </div>
  </div>

  <van-popup v-model:show="showBottom" round position="bottom" :style="{ height: '160px' }">
    <div absolute bottom-0 z10 w-full rounded-t-2xl bg-white text-black>
      <van-uploader wfull :after-read="read" capture="camcorder" accept="image/*">
        <div flex="~" h13 items-center justify-center text-sm>
          {{ t('avator.shot') }}
        </div>
      </van-uploader>

      <van-uploader wfull :after-read="read">
        <div flex="~" h13 items-center justify-center text-sm>
          {{ t('avator.album') }}
        </div>
      </van-uploader>

      <div h1 bg="#FAFAFA" />
      <div flex="~" h13 items-center justify-center font-normal @click="showBottom = false">
        <b> {{ t('avator.cancel') }} </b>
      </div>
    </div>
  </van-popup>
</template>

<style>
.van-uploader__wrapper {
  justify-content: center;
}
</style>
