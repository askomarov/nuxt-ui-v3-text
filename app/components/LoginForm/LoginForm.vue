<script setup lang="ts">
import * as z from "zod";
import {DateFormatter} from '@internationalized/date';
import type { FormSubmitEvent } from "@nuxt/ui";
import MyDatePicker from "~/components/MyDatePicker/MyDatePicker.vue";

const formRef = useTemplateRef("formRef");
const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Must be at least 8 characters"),
  date:z.union([z.string(), z.date()]).refine((val) => val, {
      message: 'поле обязательно',
    }),
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


const formatter = new DateFormatter("ru-RU", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

const dateData = shallowRef<Date | null>(null);

watch(dateData, () => {
  if (dateData.value) {
    state.date = formatter.format(dateData.value);
  }
})
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
      <MyDatePicker v-model="dateData" class="w-full" />
    </UFormField>

    <UButton type="submit"> {{ $t("loginForm.submit") }} </UButton>

    <hr >
    <pre>state : {{ state }}</pre>
  </UForm>
</template>
