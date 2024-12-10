<script setup lang="ts">
import { loadLanguageAsync } from '~/modules/i18n'

const { t, locale } = useI18n()

const data = [
  {
    title: '简体中文',
    value: 'zh-CN',
  },
  {
    title: '繁体中文',
    value: 'zh-TW',
  },
  {
    title: 'English',
    value: 'en-US',
  },
  {
    title: '日本語',
    value: 'ja-JP',
  },
  {
    title: 'ภาษาไทย',
    value: 'th-TH',
  },
  {
    title: 'Tiếng Việt',
    value: 'vi-VN',
  },
  {
    title: 'Español',
    value: 'es-ES',
  },
  {
    title: 'Português',
    value: 'pt-PT',
  },
  {
    title: 'Türkçe',
    value: 'tr-TR',
  },
  {
    title: 'Italiano',
    value: 'it-IT',
  },
  {
    title: 'Русский',
    value: 'ru-RU',
  },
]

function getClass(value: string) {
  return value === locale.value
    ? 'bg-btn-select text-white border border-2 border-#f9fafb box-border'
    : 'bg-white border border-2 border-#f9fafb text-black box-border'
}

async function toggleLocales(newLocale: string) {
  await loadLanguageAsync(newLocale)
  locale.value = newLocale
}
</script>

<template>
  <div class="font-['PingFang_SC']">
    <TheMenuHead :title="t('me.language.title')" />
    <div h-screen overflow-y-scroll px4 text-base>
      <div
        v-for="(item, key) in data" :key flex="~" mt4.1 h13 items-center rounded-2xl :class="getClass(item.value)"
        @click="toggleLocales(item.value)"
      >
        <div w="1/2" pl5.4>
          {{ item.title }}
        </div>
        <div w="1/2" flex="~" justify-end pr5.4>
          <img src="../../assets/images/me/menu/check.png" h6 w6>
        </div>
      </div>
      <div h50 />
    </div>
  </div>
</template>
