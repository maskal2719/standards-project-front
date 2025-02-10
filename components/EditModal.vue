<script setup lang="ts">
import { useStudentStore } from "~/stores/studentStore";

const props = defineProps<{
  label: string;
  student: any;
}>();

const isOpen = ref(false);
const formData = ref({
  fullName: props.student.fullName,
  birthDate: props.student.birthDate,
  class: props.student.class,
});

const studentStore = useStudentStore();

// Функция для отправки данных на сервер
const createStudent = async () => {
  try {
    await studentStore.updateStudent(props.student.id, formData);

    isOpen.value = false;

    // Очищаем форму
    formData.value = {
      fullName: "",
      birthDate: "",
      class: "",
    };

    // Можно добавить уведомление об успешном создании
    console.log("Студент создан:");
  } catch (error) {
    console.error("Ошибка при создании студента:", error);
  }
};
</script>

<template>
  <ClientOnly>
    <div>
      <UButton color="blue" :label="label" @click="isOpen = true" />

      <UModal v-model="isOpen">
        <div class="p-4 m-4 flex gap-2 flex-col">
          <UInput v-model="formData.fullName" placeholder="ФИО Студента" />
          <UInput
            v-model="formData.birthDate"
            placeholder="Дата рождения"
            type="date"
          />
          <UInput v-model="formData.class" placeholder="Класс" />
          <UButton
            icon="i-heroicons-pencil-square"
            size="2xs"
            color="primary"
            variant="solid"
            label="Создать студента"
            :trailing="false"
            @click="createStudent"
          />
        </div>
      </UModal>
    </div>
  </ClientOnly>
</template>
