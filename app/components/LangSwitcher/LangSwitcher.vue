<script setup lang="ts">
import * as locales from "@nuxt/ui/locale";

const { locale, availableLocales } = useI18n();

const availableLanguages = computed(() => {
  return availableLocales.map((code: string) => ({
    code,
    label: (locales as Record<string, { name: string }>)[code]?.name || code,
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
    class="w-32 uppercase hover:ring-[var(--ui-primary)] data-[state=open]:ring-[var(--ui-primary)] transition-shadow"
    :ui="{
      trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200',
      item: 'data-[state=checked]:before:bg-[var(--pink)]/16 data-highlighted:before:bg-[var(--pink)]/10',
      group: 'max-h-[50px]'
    }"
  >
    <template #item="{ item }">
      <div class="flex items-center justify-start gap-2 w-full">
        <UIcon :name="item.icon" />
        <span>{{ item.code.toLocaleUpperCase() }} {{ item.label }}</span>
      </div>
    </template>
  </USelect>
</template>
