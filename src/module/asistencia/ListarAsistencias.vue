<script setup lang="ts">
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import RegistrarAsistenciaForm from './components/RegistrarAsistenciaForm.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const asistenciasData = ref([])

const listarAsistencias = () => {
  axios.get('http://localhost:3005/asistencias/listar').then((response) => {
    asistenciasData.value = response.data // resultado
  })
}

onMounted(() => {
  listarAsistencias()
})
</script>

<template>
  <div class="ma">
    listado de asistencia
    <RegistrarAsistenciaForm @event-nueva-asistencia="listarAsistencias()" />

    <hr />
    <DataTable :value="asistenciasData" tableStyle="min-width: 50rem">
      <Column field="_id" header="Identificador"></Column>
      <Column field="estudiante.nombre" header="Estudiante">
        <template #body="slotProps">
          {{ slotProps.data.estudiante.carnetIdentidad }} - {{ slotProps.data.estudiante.nombre }}
        </template>
      </Column>
      <Column field="materia.nombre" header="Materia"> </Column>
      <Column field="fechaClase" header="Fecha"></Column>
      <Column field="semestre" header="Semestre"></Column>
      <Column field="prefesor" header="Docente"></Column>
    </DataTable>
    <!-- <pre>
      {{ asistenciasData }}
    </pre> -->
  </div>
</template>

<style scoped>
.ma {
  margin: 10px;
  padding: 20px;
}
</style>
