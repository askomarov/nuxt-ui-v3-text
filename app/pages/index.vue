<script setup lang="ts">
import ModalFeedback from '~/components/Modal/Feedback/ModalFeedback.vue';

// const overlay = useOverlay()
// const modalA = overlay.create(ModalFeedback)

// const openModalA = () => {
//   if (Math.random() > 0.5) {
//     modalA.open({ title: 'Hello - overide title' })
//   } else {
//     modalA.open()
//   }
// }
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center gap-4">
    <h1 class="font-bold text-2xl text-(--ui-primary)">Nuxt UI v3</h1>
    <p class="font-bold text-xl text-(--ui-primary)">{{ $t("hello") }}</p>
    <ThemeSwitcher />
    <FormBonus />
    <div class="flex items-center gap-2">
      <UButton
        label="Documentation"
        icon="i-lucide-square-play"
        to="https://ui3.nuxt.dev/getting-started/installation/nuxt"
        target="_blank"
      />

      <UButton
        label="GitHub"
        color="neutral"
        variant="outline"
        icon="i-simple-icons-github"
        to="https://github.com/nuxt/ui"
        target="_blank"
      />
      <ModalFeedback>
        <UButton>Open Modal Feedback</UButton>
      </ModalFeedback>
    </div>
  </UContainer>
</template>
