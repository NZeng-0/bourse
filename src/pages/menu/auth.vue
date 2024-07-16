<script setup lang="ts">
const { t } = useI18n()
</script>

<template>
  <div>
    <TheMenuHead :title="t('me.auth.title')" />
    <div mt8.75 px4 text-base>
      <div>
        <input type="text" h13 wfull border rounded-2xl pl5.4 :placeholder="t('me.auth.name')">
      </div>
      <div mt5.25>
        <input type="text" h13 wfull border rounded-2xl pl5.4 :placeholder="t('me.auth.id_card')">
      </div>
      <div mt3.25 h59.25 border rounded-2xl>
        <div flex="~" h11.5 wfull items-center border-b rounded-t-2xl pl5.4>
          {{ t('me.auth.front_and_back') }}
        </div>
        <div h47.55 flex="~" text-base class="text-#999999">
          <div w="1/2" flex="~" items-center justify-center border-r px5>
            {{ t('me.auth.front') }}
          </div>
          <div w="1/2" flex="~" items-center justify-center px5>
            {{ t('me.auth.back') }}
          </div>
        </div>
      </div>
      <div mt12.5 flex="~" justify-center>
        <button h10.5 min-w37.5 rounded-lg bg-btn-select px2 text-white>
          {{ t('me.auth.submit') }}
        </button>
      </div>
    </div>
  </div>
</template>
