<template>
  <header class="header">
    <NuxtLink to="/">
      <div class="site-title">
        {{ siteName }}
      </div>
    </NuxtLink>

    <nav class="menu">
      <ul class="menu-list">
        <li v-for="(item, index) in menuItems" :key="index" class="menu-item">
          <NuxtLink :to="item.path">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue";

const siteName = ref("Электронный журнал нормативов");
const menuItems = ref([
  { label: "Студенты", path: "/students" },
  { label: "Нормативы", path: "/normatives" },
]);
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #333;
  color: white;
}

.site-title {
  font-size: 1.5rem;
  font-weight: bold;
}

.menu-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-item {
  margin-left: 1rem;
}
</style>
