<script setup lang="ts">
import type {
  CalendarDate
} from "@internationalized/date";
import {
  DateFormatter,
  getLocalTimeZone,
  today,
} from "@internationalized/date";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const modelValue = defineModel<CalendarDate>(today(getLocalTimeZone()));

</script>

<template>
  <div>
    <UPopover>
      <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
        {{
          modelValue
            ? df.format(modelValue.toDate(getLocalTimeZone()))
            : "Select a date"
        }}
      </UButton>
      <template #content>
        <UCalendar v-model="modelValue" class="p-2" />
      </template>
    </UPopover>
  </div>
</template>
