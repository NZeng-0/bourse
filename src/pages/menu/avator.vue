<script setup lang="ts">
const select = ref(false)
</script>

<template>
  <div>
    <TheMenuHead title="更换头像" />
    <div flex="~" items-center justify-center>
      <div relative mt10>
        <img bg="#DBEAFE" h50 w50 rounded-full src="../../assets/images/defalut.png">
        <img src="../../assets/images/shot.png" absolute bottom-1 right-5 h12 w12 @click="select = true">
      </div>
    </div>
    <div mt30 px6>
      <button bg="#673BF6/29" h12 w-full rounded-lg text-white>
        确定
      </button>
    </div>
  </div>
  <div v-if="select">
    <div fixed bottom-0 top-0 h-screen w-full bg-black opacity50 @click="select = false" />
    <div absolute bottom-0 z10 h40 w-full rounded-t-2xl bg-white text-black>
      <div flex="~" h13 items-center justify-center text-sm>
        拍照
      </div>
      <div flex="~" h13 items-center justify-center border text-sm>
        相册选择
      </div>
      <div h1 bg="#FAFAFA" />
      <div flex="~" h13 items-center justify-center font-normal @click="select = false">
        <b>取消</b>
      </div>
    </div>
  </div>
</template>
