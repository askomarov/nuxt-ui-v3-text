<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import MyDatePicker from "~/components/MyDatePicker/MyDatePicker.vue";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";

const formRef = useTemplateRef("formRef");
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters"),
  date: z.string(),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
  date: '',
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: "Success",
    description: "The form has been submitted.",
    color: "success",
  });
  console.log(event.data);
  state.email = undefined;
  state.password = undefined;
  state.date = '';
}
</script>

<template>
  <UForm
    ref="formRef"
    :schema="schema"
    :state="state"
    class="space-y-4"
    @submit="onSubmit"
  >
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" autocomplete="email" />
      <template #error="{ error }"> Template: {{ error }} </template>
    </UFormField>

    <UFormField
      :label="$t('loginForm.password')"
      name="password"
      :ui="{ error: 'mt-0 min-h-5 block' }"
    >
      <UInput v-model="state.password" type="password" class="w-full" />
    </UFormField>
    <UFormField label="Date" name="date">
      <MyDatePicker v-model="state.date" class="w-full" />
    </UFormField>

    <UButton type="submit"> {{ $t("loginForm.submit") }} </UButton>

    <hr >
    <pre>state : {{ state }}</pre>
  </UForm>
</template>
