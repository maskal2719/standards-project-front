<template>
  <div class="students">
    <div class="flex items-center gap-4">
      <u-button>6А</u-button>
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
    <div class="students-container">
      <Student
        v-for="student in filteredStudents"
        :key="student.id"
        :student="student"
      />
    </div>
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

<style lang="scss" scoped>
.students {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.students-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 40px;
}
</style>
