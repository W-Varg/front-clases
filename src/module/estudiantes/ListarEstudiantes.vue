<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import AddEstudiante from './components/AddEstudiante.vue'
import EstudianteEditForm from './components/EditEstudianteForm.vue'
import ButtonBtn from 'primevue/button'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const listaEstudiantes = ref([])

const busquedaTexto = ref('')
const busquedaCI = ref('')

const listarEstudiante = () => {
  // tiene tiempo de retando
  setTimeout(() => {
    axios.get('http://127.0.0.1:3005/estudiantes').then((response) => {
      listaEstudiantes.value = response.data // resultado
    })
  }, 100)
}
listarEstudiante()

const verFormulario = ref(false)
const refAddEstudiante = ref()
const mostrarFormulario = () => {
  verFormulario.value = !verFormulario.value
  if (verFormulario.value === true) {
    refAddEstudiante.value.abrirDialog()
  }
}

/* ----------------------------------------------- eliminar estudiante ---------------------------------------------- */
const eliminarStd = (id: string) => {
  axios
    .delete(`http://127.0.0.1:3005/estudiantes/${id}`)
    .then(() => {
      listarEstudiante()
    })
    .catch((error) => console.log(error))
}

const verDetalleDiv = ref(false)
const estudianteDetalle = ref(null)
const verDetalle = (id: string) => {
  axios.get(`http://127.0.0.1:3005/estudiantes/${id}`).then((response) => {
    estudianteDetalle.value = response.data
    verDetalleDiv.value = true
  })
}

const estudianteSelecionado = ref(null)
const actualizarStd = (itemStd) => {
  estudianteSelecionado.value = null
  estudianteSelecionado.value = itemStd
}

const methodBuscar = () => {
  let query = ''
  if (busquedaTexto.value && busquedaTexto.value.length >= 1) {
    query = `?texto=${busquedaTexto.value}`
  }
  if (busquedaCI.value && busquedaCI.value.length >= 1) {
    query = `?numero-documento=${busquedaCI.value}`
  }

  axios.get(`http://localhost:3005/estudiantes/search/${query}`).then((response) => {
    listaEstudiantes.value = response.data
  })
}
</script>

<template>
  <h3>listado de estudiantes</h3>
  <div class="lado-derecho">
    <!-- <button @click="mostrarFormulario">
      {{ verFormulario ? 'ocultar formulario' : 'mostrar formulario' }}
    </button> -->
    <ButtonBtn
      :label="verFormulario ? 'ocultar formulario' : 'mostrar formulario'"
      @click="mostrarFormulario"
    />
  </div>

  <AddEstudiante
    ref="refAddEstudiante"
    @cerrar-formulario="() => (verFormulario = false)"
    @event-nuevo-estudiante="listarEstudiante"
  />
  <div v-if="estudianteSelecionado != null">
    <EstudianteEditForm
      :selecionado="estudianteSelecionado"
      @cerrar-formulario="estudianteSelecionado = null"
      @event-edit-estudiante="listarEstudiante"
    />
  </div>

  ver fomulario valor {{ verFormulario }}

  <hr class="linea-divisor" />

  <input type="text" placeholder="ci" v-model="busquedaCI" />
  <input type="text" placeholder="nombre o apellido" v-model="busquedaTexto" />
  <button @click="methodBuscar">buscar</button>

  <div v-if="listaEstudiantes.length > 0" class="block">
    <!-- <table border="1">
      <tr>
        <td>nro</td>
        <td>acciones</td>
        <td>ci</td>
        <td>nombre</td>
        <td>email</td>
        <td>telefono</td>
        <td>direccion</td>
        <td>fecha Nacimient</td>
      </tr>
      <tr v-for="(item, index) in listaEstudiantes" :key="item._id">
        <td>{{ index + 1 }}</td>
        <td>
          <button @click="actualizarStd(item)">Actualizar</button>
          <button @click="eliminarStd(item._id)">Eliminar</button>
          <button @click="verDetalle(item._id)">ver detalle</button>
        </td>
        <td>{{ item.carnetIdentidad }}</td>
        <td>{{ item.nombre }}</td>
        <td>{{ item.email }}</td>
        <td>{{ item.nroCelular }}</td>
        <td>{{ item.direccion }}</td>
        <td>{{ item.fechaNacimiento }}</td>
      </tr>
    </table> -->
    <div class="card">
      <DataTable
        :value="listaEstudiantes"
        showGridlines
        paginator
        :rows="2"
        :rowsPerPageOptions="[2, 5, 10, 20, 50, 100]"
      >
        <Column field="carnetIdentidad" header="Cédula de identidad"></Column>
        <Column field="nombre" sortable header="Nombre"></Column>
        <Column field="nroCelular" :sortable="true" header="Telefono Celular"></Column>
        <Column field="email" header="Correo Electronico"></Column>
      </DataTable>
    </div>
  </div>
  <div v-else>cargando datos ....</div>

  <hr />
  <div v-if="estudianteDetalle != null" class="block">
    <!-- {{ estudianteDetalle }} -->
    <p>nombre: {{ estudianteDetalle.nombre }}</p>
    <p>apellido paterno: {{ estudianteDetalle.apellidoPaterno }}</p>
    <p>apellido materno: {{ estudianteDetalle.apellidoMaterno }}</p>
    <p>sexo: {{ estudianteDetalle.sexo }}</p>
    <p>email: {{ estudianteDetalle.email }}</p>
    <p>telefono: {{ estudianteDetalle.nroCelular }}</p>
    <p>direccion: {{ estudianteDetalle.direccion }}</p>
    <p>fecha de nacimiento: {{ estudianteDetalle.fechaNacimiento }}</p>
    <p>tiene whatsapp: {{ estudianteDetalle.tieneWhatsapp }}</p>
  </div>
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
