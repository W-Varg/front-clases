<script setup lang="ts">
import Select from 'primevue/select'
import { ref, onMounted, defineProps, watch } from 'vue'
import axios from 'axios'
import AddEstudiante from '../../estudiantes/components/AddEstudiante.vue'

const refAddEstudiante = ref()

const selectedEstudiante = ref()
const listaEstudiantes = ref([])
const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: { type: String, default: '', required: false },
})

const listarEstudiante = () => {
  axios.get('http://127.0.0.1:3005/estudiantes').then((response) => {
    listaEstudiantes.value = response.data // resultado
  })
}

watch(selectedEstudiante, (v) => {
  if (v) {
    emit('update:modelValue', v._id)
  } else {
    emit('update:modelValue', null)
  }
})

const verFormulario = ref(false)
const mostrarFormulario = () => {
  verFormulario.value = !verFormulario.value
  if (verFormulario.value === true) {
    refAddEstudiante.value.abrirDialog()
  }
}

onMounted(() => {
  listarEstudiante()
})
</script>

<template>
  <div class="card flex justify-center">
    <Select
      v-model="selectedEstudiante"
      :options="listaEstudiantes"
      filter
      checkmark
      showClear
      size="small"
      optionLabel="nombre"
      placeholder="seleccione un estudiante"
    >
    </Select>

    <!-- <pre>
        {{ listaEstudiantes }}
    </pre> -->
  </div>
  <Button @click="mostrarFormulario">Registra Estudiante</Button>
  <AddEstudiante
    ref="refAddEstudiante"
    @event-nuevo-estudiante="listarEstudiante"
    @cerrar-formulario="() => (verFormulario = false)"
  ></AddEstudiante>
</template>
