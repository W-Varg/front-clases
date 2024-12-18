<template>
  <ConfirmDialog></ConfirmDialog>
  <Toast position="bottom-right"></Toast>

  componente de formulario cargado.
  <Button @click="abrirDialog">Registrar asistencia</Button>

  <Dialog
    v-model:visible="visible"
    modal
    header="Formulario de creacion"
    :style="{ width: '25rem' }"
  >
    <!-- estudiante -->
    <div>
      <label for="estudianteId"> estudiante</label>
      <SelectEstudiante v-model="datosACrear.estudianteId"></SelectEstudiante>
    </div>
    <!-- materia -->
    <div>
      <label for="materiaId">Materia</label>
      <SelectMateria v-model="datosACrear.materiaId"> </SelectMateria>
    </div>

    <p></p>
    <div>
      <label for="fecha_claseId">Fecha de asistencia</label>
      <input id="fecha_claseId" type="date" v-model="datosACrear.fechaClase" />
    </div>

    <br />
    <FloatLabel variant="over">
      <InputText id="in_label" v-model="datosACrear.docenteNombre" variant="filled" />
      <label for="in_label">Nombre del Profesor</label>
    </FloatLabel>
    <br />

    <FloatLabel variant="over">
      <InputText id="id_semestre" v-model="datosACrear.semestre" variant="filled" />
      <label for="id_semestre">Semestre</label>
    </FloatLabel>

    <Button @click="enviarDatos">Guardar</Button>

    <hr class="linea-divisor" />
  </Dialog>
</template>

<script setup lang="ts">
import { reactive, defineEmits, ref } from 'vue'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import Toast from 'primevue/toast'
import Dialog from 'primevue/dialog'
import axios from 'axios'
import SelectEstudiante from './SelectEstudiante.vue'
import SelectMateria from './SelectMateria.vue'

const emit = defineEmits(['event-nueva-asistencia', 'cerrar-formulario'])
const toast = useToast()
const visible = ref(false)

const abrirDialog = () => {
  visible.value = true
}
const confirm = useConfirm()

const datosACrear = reactive({
  fechaClase: undefined,
  semestre: undefined,
  docenteNombre: undefined,
  /* ------------------------------------------------------------------------------------------------------------------ */

  materiaId: undefined,
  estudianteId: undefined,
})

const enviarDatos = () => {
  confirm.require({
    message: '¿Estas seguro de guardar?',
    header: 'Comfirmarcion de guardado',
    icon: 'pi pi-info-circle',
    accept: () => {
      axios
        .post('http://localhost:3005/asistencias/registrar', datosACrear)
        .then((response) => {
          // operacion exitosa then
          console.log('datas de respuesta', response.data)
          toast.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Asistencia registrada exitosamente',
            life: 3000,
          })

          emit('event-nueva-asistencia')
          emit('cerrar-formulario')
          visible.value = false
        })
        .catch((err) => {
          console.log('ocurrio un error')
          console.log(err)
        }) // operacion fallida catch    },    },
    },
    reject: () => {
      console.log('rechazado')
    },
  })
}
</script>

<style scoped>
.btn-guardar {
  width: 100%;
  background-color: rgb(123, 231, 123);
  color: white;
}
</style>
