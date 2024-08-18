<script setup lang="ts">
const select = ref(false)
</script>

<template>
  <div>
    <TheMenuHead :title="t('avator.title')" />
    <div flex="~" items-center justify-center>
      <div relative mt10>
        <img bg="#DBEAFE" h50 w50 rounded-full src="../../assets/images/defalut.png">
        <img src="../../assets/images/shot.png" absolute bottom-1 right-5 h12 w12 @click="select = true">
      </div>
    </div>
    <div mt30 px6>
      <button bg="#673BF6/29" h12 w-full rounded-lg text-white>
        {{ t('avator.confirm') }}
      </button>
    </div>
  </div>
  <div v-if="select">
    <div fixed bottom-0 top-0 h-screen w-full bg-black opacity50 @click="select = false" />
    <div absolute bottom-0 z10 h40 w-full rounded-t-2xl bg-white text-black>
      <div flex="~" h13 items-center justify-center text-sm>
        {{ t('avator.shot') }}
      </div>
      <div flex="~" h13 items-center justify-center border text-sm>
        {{ t('avator.album') }}
      </div>
      <div h1 bg="#FAFAFA" />
      <div flex="~" h13 items-center justify-center font-normal @click="select = false">
        <b> {{ t('avator.cancel') }} </b>
      </div>
    </div>
  </div>
</template>
