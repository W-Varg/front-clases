<script setup lang="ts">
import { useRouter } from 'vue-router' // composable, hooks
const router = useRouter()

const goRoute = (route: string) => {
  router.push(route)
}
</script>

<template>
  <div class="menu-izq">
    <button @click="goRoute('/')">home</button>
    <button @click="$router.push('/acerca-de-mi')">acerca de mi</button>
    <button @click="goRoute('/list-estudiantes')">Estudiantes</button>
    <button @click="goRoute('/asistencia')">asistencia</button>
  </div>
</template>

<style scoped>
.menu-izq {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  gap: 10px;
}
</style>
