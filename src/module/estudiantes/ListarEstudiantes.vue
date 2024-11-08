<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import AddEstudiante from './components/AddEstudiante.vue'

const listaEstudiantes = ref([])

// tiene tiempo de retando
setTimeout(() => {
  axios.get('http://127.0.0.1:3005/estudiantes').then((response) => {
    listaEstudiantes.value = response.data // resultado
  })
}, 2000)

const verFormulario = ref(false)
const mostrarFormulario = () => {
  verFormulario.value = !verFormulario.value
}
</script>

<template>
  <h3>listado de estudiantes</h3>
  <div class="lado-derecho">
    <button @click="mostrarFormulario">
      {{ verFormulario ? 'ocultar formulario' : 'mostrar formulario' }}
    </button>
  </div>
  <AddEstudiante v-if="verFormulario" />

  <hr class="linea-divisor" />
  <div v-if="listaEstudiantes.length > 0" class="block">
    <table border="1">
      <tr>
        <td>nro</td>
        <td>acciones</td>
        <td>nombre</td>
        <td>email</td>
        <td>telefono</td>
        <td>direccion</td>
        <td>fecha Nacimient</td>
      </tr>
      <tr v-for="(est, index) in listaEstudiantes" :key="est._id">
        <td>{{ index + 1 }}</td>
        <td>
          <button>editar</button>
          <button>borrar</button>
          <button>ver detalle</button>
        </td>
        <td>{{ est.nombre }}</td>
        <td>{{ est.email }}</td>
        <td>{{ est.nroCelular }}</td>
        <td>{{ est.direccion }}</td>
        <td>{{ est.fechaNacimiento }}</td>
      </tr>
    </table>
  </div>
  <div v-else>cargando datos ....</div>
</template>

<style>
.lado-derecho {
  float: right;
  margin: 2rem;
}
.linea-divisor {
  width: 100%;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
.block {
  width: 100%;
}
</style>
