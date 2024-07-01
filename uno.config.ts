import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    ['btn', 'px-4 py-1 rounded inline-block bg-teal-600 text-white cursor-pointer hover:bg-teal-700 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'],
    ['icon-btn', 'text-[0.9em] inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600 !outline-none'],
    {
      'bg-card-color': 'bg-#6A3BF6',
      'bg-portfolioItem': 'bg-#F5F4F7',
      'bg-trading': 'bg-#F9FAFB',
      'bg-menu': 'bg-#E5E4E7',
      'bg-menu-selected': 'bg-#6A3BF6',
      'text-card': 'text-#EFF6FF',
      'text-all-list': 'text-#4400FF',
      'text-portolio': 'text-#6C727F',
      'text-portolio-primary': 'text-#121826',
      'text-list-cn': 'text-#8F92A1',
      'text-trading-title': 'text-#121826',
      'bg-btn-select': 'bg-#7751f1',
      'bg-btn': 'bg-#C4B4F6',
      'text-btn': 'text-#3B82F6',
    },
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
    presetWebFonts({
      fonts: {
        sans: 'DM Sans',
        serif: 'DM Serif Display',
        mono: 'DM Mono',
      },
    }),
  ],
})
