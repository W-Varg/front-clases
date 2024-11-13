<script setup lang="ts">
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
import ListarEstudiantes from './module/estudiantes/ListarEstudiantes.vue'
// import ListarCursos from './module/estudiantes/ListarEstudiantes.vue'
// import ListarAsistencias from './module/estudiantes/ListarEstudiantes.vue'
</script>

<template>
  <div class="w-full">
    <header class="header">header</header>
    <div class="contenido">
      <div class="panel-menu">asdfs</div>
      <div class="panel-data">
        <ListarEstudiantes />
        <!-- <ListarCursos /> -->
        <!-- <ListarAsistencias /> -->
      </div>
    </div>
    <div class="panel-derecho"></div>
    <footer>footer</footer>
  </div>
  <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div> -->

  <!-- <RouterView /> -->
</template>

<style scoped>
.w-full {
  width: 100%;
}
.header {
  /* background-color: rgb(123, 231, 123); */
  height: 50px;
  width: 100%;
}
.panel-menu {
  /* background-color: aqua; */
  height: 80vh;
  width: 20%;
}
.panel-data {
  height: 80vh;
  width: 80%;
}
.contenido {
  /* background-color: salmon; */
  height: 80vh;
  display: flex;
}

footer {
  /* background-color: slateblue; */
}
</style>
