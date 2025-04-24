import { defineStore } from "pinia";
import { ref } from "vue";
import type { StudentType } from "~/types/Student";

export const useStudentStore = defineStore("student", () => {
  // Состояние для списка студентов
  const students = ref<StudentType[]>([]);

  // Загрузка студентов с сервера
  const fetchStudents = async () => {
    try {
      students.value = await $fetch("/api/students");
    } catch (error) {
      console.error("Ошибка при загрузке студентов:", error);
    }
  };

  // Добавление студента
  const addStudent = async (student: any) => {
    try {
      const response = await $fetch("/api/students", {
        method: "POST",
        body: JSON.stringify(student),
      });
      await fetchStudents();
    } catch (error) {
      console.error("Ошибка при добавлении студента:", error);
      throw error; // Пробрасываем ошибку для обработки в компоненте
    }
  };

  // Обновление студента
  const updateStudent = async (id: number, student: any) => {
    try {
      const response = await $fetch(`/api/students/${id}`, {
        method: "PATCH",
        body: JSON.stringify(student),
      });
      await fetchStudents();
    } catch (error) {
      console.error("Ошибка при обновлении студента:", error);
      throw error;
    }
  };

  // Удаление студента
  const deleteStudent = async (id: number) => {
    try {
      await $fetch(`/api/students/${id}`, {
        method: "DELETE",
      });
      await fetchStudents();
    } catch (error) {
      console.error("Ошибка при удалении студента:", error);
      throw error; // Пробрасываем ошибку для обработки в компоненте
    }
  };

  return {
    students,
    fetchStudents,
    addStudent,
    updateStudent,
    deleteStudent,
  };
});
