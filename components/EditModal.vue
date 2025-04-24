<script setup lang="ts">
import { useStudentStore } from "~/stores/studentStore";
import { ref } from "vue";

const props = defineProps<{
  label: string;
  student: any;
}>();

const isOpen = ref(false);

// Преобразуем дату из ISO в формат YYYY-MM-DD
const formatDate = (isoDate: string) => {
  return isoDate ? isoDate.split("T")[0] : "";
};

const formData = ref({
  fullName: props.student.fullName,
  birthDate: formatDate(props.student.birthDate), // Форматируем дату
  class: props.student.class,
});

const studentStore = useStudentStore();

// Функция для отправки данных на сервер
const updateStudent = async () => {
  try {
    // Преобразуем дату обратно в ISO перед отправкой
    const dataToSend = {
      ...formData.value,
      birthDate: new Date(formData.value.birthDate).toISOString(),
    };

    await studentStore.updateStudent(props.student.id, dataToSend);
    isOpen.value = false;
    console.log("Студент обновлен:");
  } catch (error) {
    console.error("Ошибка при обновлении студента:", error);
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
            label="Обновить студента"
            :trailing="false"
            @click="updateStudent"
          />
        </div>
      </UModal>
    </div>
  </ClientOnly>
</template>
