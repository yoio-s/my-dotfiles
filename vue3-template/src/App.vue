<template>
  <NConfigProvider
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
  >
    <NGlobalStyle />
    <NDialogProvider>
      <NMessageProvider>
        <RouterView />
      </NMessageProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>

<script lang="ts">
import { zhCN, dateZhCN, type GlobalThemeOverrides } from 'naive-ui'

export default defineComponent({
  name: 'App',
  setup() {
    const themeOverrides: GlobalThemeOverrides = {
      Button: {
        textColorPrimary: 'var(--my-primary)',
      },
    }

    return {
      zhCN,
      dateZhCN,
      themeOverrides,
    }
  },
})
</script>
