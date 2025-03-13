<script setup lang="ts">
</script>

<template>
  <header class="p-4 bg-(--ui-bg-elevated)  flex items-center justify-between gap-2">
    <h1>My App Logo</h1>
    <NuxtLink to="/">Home</NuxtLink>
    <NuxtLink to="/about">About</NuxtLink>
    <LangSwitcher />
  </header>
</template>
