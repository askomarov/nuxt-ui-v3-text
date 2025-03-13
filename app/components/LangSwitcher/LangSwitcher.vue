<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { locale, availableLocales } = useI18n();
const availableLanguages = computed(() => {
  return availableLocales.map((code) => ({
    code,
    label: locales[code].name,
    icon: "i-custom-" + code,
  }));
});
const icon = computed(
  () =>
    availableLanguages.value.find((item) => item.code === locale.value)?.icon
);
</script>
<template>
  <USelect
    v-model="locale"
    value-key="code"
    label-key="code"
    :icon="icon"
    :items="availableLanguages"
    class="w-32 uppercase"
  >

    <template #item="{ item }">
      <div class="flex items-center justify-between gap-4 w-full">
        <span>{{ item.label }}</span>
        <UIcon :name="item.icon" />
      </div>
    </template>
  </USelect>
</template>

<style scoped></style>
