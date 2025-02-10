<template>
  <div class="flex gap-4 flex-col m-4">
    <div class="flex items-center gap-4">
      <UInput
        v-model="searchQuery"
        class="w-full"
        size="sm"
        color="primary"
        variant="outline"
        placeholder="Поиск по студентам..."
      />
      <Modal :label="'Добавить студента'" />
    </div>

    <Students
      v-for="student in filteredStudents"
      :key="student.id"
      :student="student"
    />
  </div>
</template>

<script setup lang="ts">
import { useStudentStore } from "~/stores/studentStore";
import { ref, computed, onMounted } from "vue";

const studentStore = useStudentStore();
const searchQuery = ref("");

// Загружаем студентов при монтировании компонента
onMounted(() => {
  studentStore.fetchStudents();
});

// Фильтрация студентов
const filteredStudents = computed(() => {
  if (!searchQuery.value) return studentStore.students;

  return studentStore.students.filter(
    (student: any) =>
      student.fullName
        .toLowerCase()
        .includes(searchQuery.value.toLowerCase()) ||
      student.class.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});
</script>

<style scoped></style>
