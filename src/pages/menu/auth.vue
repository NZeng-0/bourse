<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div class="font-['PingFang_SC']">
    <TheMenuHead :title="t('auth.title')" />
    <div mt8.75 px4 text-base>
      <div>
        <input type="text" h13 wfull border rounded-2xl pl5.4 :placeholder="t('auth.name')">
      </div>
      <div mt5.25>
        <input type="text" h13 wfull border rounded-2xl pl5.4 :placeholder="t('auth.id_card')">
      </div>
      <div mt3.25 h59.25 border rounded-2xl>
        <input type="text" readonly h11.5 wfull border-b rounded-t-2xl pl5.4 :placeholder="t('auth.front_and_back')">
        <div h47.55 flex="~" text-base class="text-#999999">
          <div w="1/2" flex="~" items-center justify-center border-r>
            {{ t('auth.front') }}
          </div>
          <div w="1/2" flex="~" items-center justify-center>
            {{ t('auth.back') }}
          </div>
        </div>
      </div>
      <div mt12.5 flex="~" justify-center>
        <button h10.5 w37.5 rounded-lg bg-btn-select text-white>
          {{ t('auth.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>
