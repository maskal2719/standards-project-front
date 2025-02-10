<template>
  <div
    class="flex items-center justify-between gap-4 p-4 border border-dashed border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow"
  >
    <NuxtLink :to="'/students/' + student.id">
      <div class="flex items-center gap-6">
        <span class="text-lg font-semibold">{{ props.student.fullName }}</span>
        <span class="text-sm text-gray-600">{{
          formatDate(props.student.birthDate)
        }}</span>
        <span class="text-sm text-gray-600"
          >Класс: {{ props.student.class }}</span
        >
      </div>
    </NuxtLink>
    <div class="flex items-center gap-2">
      <EditModal label="Изменить" :student="student" />
      <UButton
        @click="deleteStudent(props.student.id)"
        :label="'Удалить'"
        color="red"
        variant="solid"
        class="transition-colors"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "../utils/transformDate";
import { useStudentStore } from "~/stores/studentStore";

const props = defineProps<{
  student: any;
}>();

const studentStore = useStudentStore();

const deleteStudent = async (id: number) => {
  await studentStore.deleteStudent(id);
};
</script>

<style scoped></style>
