<script setup lang="ts">
import Select from 'primevue/select'
import { ref, onMounted, defineProps, watch } from 'vue'
import axios from 'axios'

const selectMt = ref()
const listadoMaterias = ref([])
const emit = defineEmits(['update:modelValue'])

defineProps({
  modelValue: { type: String, default: '', required: false },
})

const listarEstudiante = () => {
  axios.get('http://localhost:3005/materias/listar').then((response) => {
    listadoMaterias.value = response.data // resultado
  })
}

watch(selectMt, (v) => {
  if (v) {
    emit('update:modelValue', v._id)
  } else {
    emit('update:modelValue', null)
  }
})

onMounted(() => {
  listarEstudiante()
})
</script>

<template>
  <div class="card flex justify-center">
    <Select
      v-model="selectMt"
      :options="listadoMaterias"
      filter
      checkmark
      showClear
      size="small"
      optionLabel="nombre"
      placeholder="seleccione una materia"
    >
    </Select>

    <!-- <pre>
        {{ listadoMaterias }}
    </pre> -->
  </div>
</template>
