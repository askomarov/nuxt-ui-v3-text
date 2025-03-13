<script setup lang="ts">
enum Theme {
  System = "system",
  Light = "light",
  Dark = "dark",
  Sepia = "sepia",
}
const themes = ref<Theme[]>([Theme.System, Theme.Light, Theme.Dark, Theme.Sepia]);
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === "dark";
  },
  set() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  },
});
function iconName(theme:Theme) {
  if (theme === "system") return "i-ph-laptop";
  if (theme === "light") return "i-ph-sun";
  if (theme === "dark") return "i-ph-moon";
  return "i-ph-coffee";
}
</script>

<template>
  <ClientOnly v-if="!colorMode?.forced">
    <div class="flex flex-col items-center gap-4">
      <UButton
        :icon="isDark ? 'i-lucide-moon' : 'i-lucide-sun'"
        color="neutral"
        variant="ghost"
        @click="isDark = !isDark"
      />

      <div>
        <p>
          Color mode: <b>{{ colorMode }}</b>
        </p>
        <span v-if="$colorMode.preference === 'system'"
          >(<i>{{ $colorMode.value }}</i> mode detected)</span
        >
      </div>
      <ul class="flex gap-2">
        <li
          v-for="theme of themes"
          :key="theme"
          :class="{
            preferred: !$colorMode.unknown && theme === $colorMode.preference,
            selected: !$colorMode.unknown && theme === $colorMode.value,
          }"
        >
          <UButton
            :icon="iconName(theme)"
            color="neutral"
            variant="ghost"
            @click="$colorMode.preference = theme"
          />
        </li>
      </ul>
    </div>
    <template #fallback>
      <div class="size-8" />
    </template>
  </ClientOnly>
</template>

<style scoped></style>
