<script setup lang="ts">
import { CalendarDate,
  DateFormatter,
  getLocalTimeZone } from "@internationalized/date";

const df = new DateFormatter("en-US", {
  dateStyle: "medium",
});

const selected = defineModel<Date | null>()

const toCalendarDate = (date: Date) => {
  return new CalendarDate(
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  )
}

const calendarDate = computed({
  get: () =>
  selected.value ? toCalendarDate(selected.value) : undefined,
  set: (newValue: CalendarDate | null) =>
    selected.value =  newValue ? newValue.toDate(getLocalTimeZone()) : new Date(),
})

</script>

<template>
  <div>
    <UPopover>
      <UButton color="neutral" variant="subtle" icon="i-lucide-calendar">
        {{
          selected
            ? df.format(selected)
            : "Select a date"
        }}
      </UButton>
      <template #content>
        <UCalendar v-model="calendarDate" class="p-2" />
      </template>
    </UPopover>
  </div>
</template>
