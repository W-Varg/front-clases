<script setup lang="ts">
import { reactive } from 'vue'
import axios from 'axios'

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
  // 2 segundos
  setTimeout(() => {
    axios
      .post('http://127.0.0.1:3005/estudiantes', datosACrear)
      .then((response) => {
        console.log('datas de respuesta', response.data)
      }) // operacion exitosa then
      .catch((err) => {
        console.log('ocurrio un error')
        console.log(err)
      }) // operacion fallida catch
  }, 2000)
}
</script>

<template>
  <h3>Formulario de registro</h3>
  <!-- v-model -> bindear (enlazar) carnet_identidad -->
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

  <button class="btn-guardar" @click="enviarDatos">Guardar</button>

  <hr class="linea-divisor" />
</template>
<style scoped>
.btn-guardar {
  width: 100%;
  background-color: rgb(123, 231, 123);
  color: white;
}
</style>
