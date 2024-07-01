<script setup lang="ts">

</script>

<template>
  <div mx6 mt4 h45 wfull rounded-2xl bg-white px4 pb4 pl4>
    <p mt-5 text-lg>
      实时交易
    </p>
    <div v-for="(item, key) in 2" :key flex="~ wrap" wfull justify-between>
      <div mt2.5 w="1/5">
        <div style="color:#9EA3AE" text-sm>
          平均
        </div>
        <div style="color:#121826" text-lg>
          160.32
        </div>
      </div>
      <div w="1/5" />
      <div mt2.5 w="1/5">
        <div style="color:#9EA3AE" text-sm>
          平均
        </div>
        <div style="color:#121826" text-lg>
          160.32
        </div>
      </div>
      <div w="1/5" />
      <div mt2.5 w="1/5">
        <div style="color:#9EA3AE" text-sm>
          平均
        </div>
        <div style="color:#121826" text-lg>
          160.32
        </div>
      </div>
    </div>
  </div>
</template>
