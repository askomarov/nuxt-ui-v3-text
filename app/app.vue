<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";
const { locale } = useI18n();
type LocaleKey = keyof typeof locales;

const lang = computed(() => locales[locale.value as LocaleKey].code);
const dir = computed(() => locales[locale.value as LocaleKey].dir);

useHead({
  htmlAttrs: {
    lang,
    dir,
  },
});
</script>

<template>
  <UApp :locale="locales[locale as LocaleKey]">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
