<script setup lang="ts">
import { reactive, defineEmits, watch } from 'vue'
import axios from 'axios'

const emit = defineEmits(['event-edit-estudiante', 'cerrar-formulario'])
const prop = defineProps({
  selecionado: { type: Object, required: false, default: null },
})

const datosACrear = reactive({
  carnet_identidad: prop.selecionado.carnetIdentidad,
  nombre: prop.selecionado.nombre,
  sexo: prop.selecionado.sexo,
  fechaNacimiento: prop.selecionado.fechaNacimiento.slice(0, 10), // "2000-01-01 T 00:00:00" -> "2000-01-01"
  segundoNombre: prop.selecionado.segundoNombre,
  apellidoPaterno: prop.selecionado.apellidoPaterno,
  apellidoMaterno: prop.selecionado.apellidoMaterno,
  email: prop.selecionado.email,
  direccion: prop.selecionado.direccion,
  nroCelular: prop.selecionado.nroCelular,
  tieneWhatsapp: prop.selecionado.tieneWhatsapp,
})

// "watch" detecta los cambios en una variable
watch(
  () => prop.selecionado,
  () => {
    datosACrear.carnet_identidad = prop.selecionado.carnetIdentidad
    datosACrear.nombre = prop.selecionado.nombre
    datosACrear.sexo = prop.selecionado.sexo
    datosACrear.fechaNacimiento = prop.selecionado.fechaNacimiento.slice(0, 10) // "2000-01-01 T 00:00:00" -> "2000-01-01"
    datosACrear.segundoNombre = prop.selecionado.segundoNombre
    datosACrear.apellidoPaterno = prop.selecionado.apellidoPaterno
    datosACrear.apellidoMaterno = prop.selecionado.apellidoMaterno
    datosACrear.email = prop.selecionado.email
    datosACrear.direccion = prop.selecionado.direccion
    datosACrear.nroCelular = prop.selecionado.nroCelular
    datosACrear.tieneWhatsapp = prop.selecionado.tieneWhatsapp
  },
)

const enviarDatos = (id: number) => {
  // 2 segundos
  axios
    .patch(`http://127.0.0.1:3005/estudiantes/${id}`, datosACrear)
    .then(() => {
      emit('event-edit-estudiante') // emite el evento
      emit('cerrar-formulario') // emite el evento
    })
    .catch((err) => {
      console.log('ocurrio un error')
      console.log(err)
    }) // operacion fallida catch
}
</script>

<template>
  <h3>Formulario de edicion</h3>

  <!-- <pre>
    {{ datosACrear }}
  </pre> -->

  <div>
    <label for="ci_id">Carnet de Indentidad</label>
    <input id="ci_id" type="text" v-model="datosACrear.carnet_identidad" />
  </div>

  <div>
    <label for="ci_id">Nombre estudiante</label>
    <input id="ci_id" type="text" v-model="datosACrear.nombre" />
  </div>

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

  <button class="btn-guardar" @click="enviarDatos(selecionado._id)">Actualizar</button>

  <hr class="linea-divisor" />
</template>
<style scoped>
.btn-guardar {
  width: 100%;
  background-color: rgb(123, 231, 123);
  color: white;
}
</style>
