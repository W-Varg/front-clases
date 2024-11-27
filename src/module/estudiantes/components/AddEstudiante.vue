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

// import CInput from '../../../components/CInput.vue'

const emit = defineEmits(['event-nuevo-estudiante', 'cerrar-formulario'])
const toast = useToast()
const visible = ref(false)

const abrirDialog = () => {
  visible.value = true
}
const confirm = useConfirm()

const datosACrear = reactive({
  carnet_identidad: '',
  nombre: '',
  sexo: '',
  fechaNacimiento: '',
  segundoNombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  email: '',
  direccion: '',
  nroCelular: 0,
  tieneWhatsapp: false,
})

const enviarDatos = () => {
  confirm.require({
    message: '¿Estas seguro de guardar?',
    header: 'Comfirmarcion de guardado',
    icon: 'pi pi-info-circle',
    accept: () => {
      axios
        .post('http://127.0.0.1:3005/estudiantes', datosACrear)
        .then((response) => {
          // operacion exitosa then
          console.log('datas de respuesta', response.data)
          toast.add({
            severity: 'info',
            summary: 'Info',
            detail: 'Estudiante creado exitosamente',
            life: 10000,
          })

          emit('event-nuevo-estudiante')
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

defineExpose({ abrirDialog })
</script>

<template>
  <ConfirmDialog></ConfirmDialog>
  <Toast position="bottom-right"></Toast>

  componente de formulario cargado.

  <Dialog
    v-model:visible="visible"
    modal
    header="Formulario de creacion"
    :style="{ width: '25rem' }"
  >
    <!-- <CInput label="carnet identidad" />
  <CInput label="segundo nombre" />
  <CInput label="apellido paterno" :cargando="false" placeholder="debe introducir un apellido" />
  <CInput label="apellido materno" /> -->

    <!-- v-model -> bindear (enlazar) carnet_identidad -->
    <div>
      <label for="ci_id">Carnet de Indentidad</label>
      <!-- <input id="ci_id" type="text" v-model="datosACrear.carnet_identidad" /> -->
      <InputText v-model="datosACrear.carnet_identidad" />
    </div>

    <!-- <div>
    <label for="ci_id">Nombre estudiante</label>
    <input id="ci_id" type="text" v-model="datosACrear.nombre" />
  </div> -->

    <FloatLabel variant="over">
      <InputText id="in_label" v-model="datosACrear.nombre" variant="filled" />
      <label for="in_label">Nombre estudiante</label>
    </FloatLabel>

    <div>
      <label for="ci_id">apellido paterno</label>
      <input id="ci_id" type="text" v-model="datosACrear.apellidoPaterno" />
    </div>

    <div>
      <label for="ci_id">apellido materno</label>
      <input id="ci_id" type="text" v-model="datosACrear.apellidoMaterno" />
    </div>

    <div>
      <label for="ci_id">Sexo</label>
      <select v-model="datosACrear.sexo">
        <option value="F">Femenino</option>
        <option value="M">Masculino</option>
      </select>
    </div>

    <div>
      <label for="ci_id">Fecha de Nacimiento</label>
      <input id="ci_id" type="date" v-model="datosACrear.fechaNacimiento" />
    </div>

    <div>
      <label for="ci_id">Correo electronico</label>
      <input id="ci_id" type="email" v-model="datosACrear.email" />
    </div>

    <div>
      <label for="ci_id">Telefono</label>
      <input id="ci_id" type="number" v-model="datosACrear.nroCelular" />
    </div>

    <div>
      <label for="ci_id">Direccion</label>
      <textarea id="ci_id" type="number" v-model="datosACrear.direccion"> </textarea>
    </div>
    <div>
      <label for="whatsapp_id">tiene Whatsapp</label>
      <input id="whatsapp_id" type="checkbox" v-model="datosACrear.tieneWhatsapp" />
    </div>

    <Button @click="enviarDatos">Guardar</Button>

    <hr class="linea-divisor" />
  </Dialog>
</template>
<style scoped>
.btn-guardar {
  width: 100%;
  background-color: rgb(123, 231, 123);
  color: white;
}
</style>
