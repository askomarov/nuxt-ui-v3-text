<script setup lang="ts">
import { reactive, useTemplateRef } from "vue";
import { z } from "zod";
import { Form, Field, ErrorMessage, type SubmissionHandler } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";

const toast = useToast();
const form = useTemplateRef("formEl");

const initialValues = reactive({
  email: "",
  name: "",
});

const formReset = () => {
  if (form.value) {
    form.value.resetForm({ values: initialValues });
  }
};
const schema = toTypedSchema(
  z.object({
    name: z
      .string()
      .min(3, "Имя должно содержать минимум 3 символа")
      .max(50, "Имя не должно превышать 50 символов"),
    email: z
      .string()
      .nonempty("Поле обязательно")
      // .optional()
      .refine((val) => !val || z.string().email().safeParse(val).success, {
        message: "Нe верный email",
      }),
  })
);

const onFormSubmit: SubmissionHandler = (values) => {
  console.log("values", values);
  toast.add({
    title: "Success",
    description: "The form has been submitted." + JSON.stringify(values),
    color: "success",
    duration: 2000,
  });
  formReset();
};
</script>

<template>
  <Form
    ref="formEl"
    v-slot="$form"
    :validation-schema="schema"
    :initial-values="initialValues"
    @submit="onFormSubmit"
  >
    <div>
      <Field v-slot="{ field, errors, setErrors }" name="name">
        <div>
          <label for="name">Имя</label>
          <UInput
            id="name"
            v-bind="field"
            v-model="field.value"
            placeholder="Name"
            :color="!!errors.length ? 'error' : 'neutral'"
            :highlight="!!errors.length"
            @focus="setErrors([])"
          />
        </div>
      </Field>
      <div class="min-h-5 text-sm">
        <ErrorMessage v-slot="{ message }" name="name">
          <UAlert
            color="error"
            variant="subtle"
            :description="message"
          />
        </ErrorMessage>
      </div>
    </div>
    <!-- email -->
    <div class="">
      <Field v-slot="{ field, errors, setErrors }" name="email">
        <div>
          <label for="email">Email</label>
          <UInput
            id="email"
            v-bind="field"
            v-model="field.value"
            placeholder="email"
            :color="!!errors.length ? 'error' : 'neutral'"
            :highlight="!!errors.length"
            @focus="setErrors([])"
          />
        </div>
      </Field>
      <div class="min-h-5 text-sm">
        <ErrorMessage v-slot="{ message }" name="email">
          <UAlert
            color="error"
            variant="subtle"
            :description="message"
          />
        </ErrorMessage>
      </div>
    </div>
    <!--  -->
    <pre>
      {{ $form }}
    </pre>
    <UButton type="submit"> {{ $t("loginForm.submit") }} </UButton>
  </Form>
</template>

<style scoped></style>
