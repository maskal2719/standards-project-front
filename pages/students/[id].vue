<template>
  <div>
    <div class="flex items-center gap-6">
      <span class="text-lg font-semibold">{{ student.fullName }}</span>
      <span class="text-sm text-gray-600">{{
        formatDate(student.birthDate)
      }}</span>
      <span class="text-sm text-gray-600">Класс: {{ student.class }}</span>
    </div>
    <div class="flex gap-4" v-for="normative in normatives" :key="normative.id">
      <span>Наименование норматива: {{ normative.name }}</span>
      Результат:
      <UInput @blur="() => createResult(normative.id, 3)" v-model="result" />
      <span>Оценка: {{ finalRes }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDate } from "~/utils/transformDate";

const route = useRoute();
const result = ref("");
const finalRes = ref(0);

const { data: normatives } = await useFetch("http://localhost:3001/normatives");
const { data: student } = await useFetch(
  "http://localhost:3001/students/" + route.params.id,
);

const formData = ref({
  studentId: +route.params.id,
  normativeId: "",
  resultValue: "",
  quarter: "",
});

const createResult = async (normativeId, quarter) => {
  try {
    // Отправляем POST-запрос на сервер
    const response = await $fetch("http://localhost:3001/results", {
      method: "POST",
      body: JSON.stringify({
        studentId: +route.params.id,
        resultValue: +result.value,
        normativeId: normativeId,
        quarter: quarter,
      }),
    }).then((res) => {
      console.log(res.grade.grade);
      finalRes.value = res.grade.grade;
    });

    // Можно добавить уведомление об успешном создании
    console.log("Результат записан:", response);
  } catch (error) {
    console.error("Ошибка при записи результата:", error);
  }
};

console.log(student);
</script>

<style scoped></style>
