<template>
  <div class="student-card">
    <NuxtLink :to="'/students/' + props.student.id">
      <div class="student-info">
        <div class="student-info__avatar">
          <img src="" alt="" />
        </div>
        <span class="student-name">ФИО: {{ props.student.fullName }}</span>
        <span class="student-birthdate">{{
          formatDate(props.student.birthDate)
        }}</span>
        <span class="student-class">Класс: {{ props.student.class }}</span>
        <span class="student-class">Пол: {{ props.student.gender }}</span>
      </div>
    </NuxtLink>
    <div class="student-actions">
      <EditModal label="Изменить" :student="props.student" />
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
import { formatDate } from "~/utils/transformDate";
import { useStudentStore } from "~/stores/studentStore";
import type { StudentType } from "~/types/Student";

const props = defineProps<{
  student: StudentType;
}>();

const studentStore = useStudentStore();

const deleteStudent = async (id: number) => {
  await studentStore.deleteStudent(id);
};
</script>

<style lang="scss" scoped>
.student-card {
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  background: transparent;
  max-width: 300px;
  gap: 10px;
  padding: 10px;

  .student-info {
    display: flex;
    flex-direction: column;
    gap: 5px;

    &__avatar {
      background: gray;
      border-radius: 50%;
      margin: 10px auto 20px;

      img {
        width: 100px;
        height: 100px;
        border-radius: 50%;
      }
    }
  }
}

.student-actions {
  display: flex;
  width: 100%;
  gap: 10px;
}
</style>
