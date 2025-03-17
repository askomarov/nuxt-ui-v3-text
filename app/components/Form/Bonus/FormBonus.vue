<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import { useClipboard } from "@vueuse/core";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(5, "Must be at least 5 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
}

const { copy, copied } = useClipboard({
  source: state.email,
});
const onButtonCopyClick = async () => {
  await copy(state.email);
  if (copied.value && state.email) {
    toast.add({
      title: "Copied",
      description: `${state.email}`,
      color: "success",
    });
  }
};
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <!-- <UInput v-model="state.email" /> -->
      <div class="flex items-center">
        <UIcon class="size-10" name="i-lucide-user"/>
        <input
          id=""
          v-model="state.email"
          name="email"
          type="text"
          autocomplete="email"
          class="px-3 py-2 border"
        >
        <UButton
          size="md"
          variant="link"
          @click="onButtonCopyClick"
        >
          <template #trailing>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              class="fill-white hover:fill-[url(#paint1_linear_30_1719)] text-transparent active:text-white transition-colors"
            >
              <rect x="7" y="2" width="15" height="15" rx="4" fill="" />
              <rect
                x="1.25"
                y="6.25"
                width="16.5"
                height="16.5"
                rx="4.75"
                fill=""
                stroke="#1A0730"
                stroke-width="1.5"
              />
              <path
                d="M6 14.5L8.33333 17L13 12"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <defs>
                <linearGradient
                  id="paint1_linear_30_1719"
                  x1="2"
                  y1="7"
                  x2="17.8671"
                  y2="7.98144"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stop-color="#C035E0" />
                  <stop offset="1" stop-color="#EB15EB" />
                </linearGradient>
              </defs>
            </svg>
          </template>
        </UButton>
      </div>
      <template #error="{ error }"> {{ error }} </template>
    </UFormField>
    <UIcon class="size-5 fill-white hover:fill-[url(#paint1_linear_30_1719)] text-transparent active:text-white transition-colors" name="i-custom-copy-pressed"/>
    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit"> {{ $t('loginForm.submit') }} </UButton>
    <pre>
    {{ state }}
    </pre>
  </UForm>
</template>
