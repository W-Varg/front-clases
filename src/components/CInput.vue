<script setup lang="ts">
import { ref, computed } from 'vue'

defineProps({
  //   modelValue: { type: String, required: true },
  label: { type: String, required: false, default: 'campo' },
  cargando: { type: Boolean, required: false, default: false },
  placeholder: { type: String, required: false, default: '' },
})
const inputvalue = ref('')
const mostrarError = computed(() => {
  if (inputvalue.value.length > 10) {
    return true
  }
  return false
})
</script>

<template>
  <div v-if="cargando" class="loading">cargando...</div>
  <div v-else class="boder-input">
    <label for="" class="input-label">{{ label }}</label>
    <input type="text" v-model="inputvalue" :placeholder="placeholder" />
    <span style="display: block"> {{ inputvalue.length }} /10 </span>
    <span v-if="mostrarError" class="red"> El campo debe tener menos de 10 caracteres</span>
  </div>
</template>

<style scoped>
.input-label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-style: italic;
}
.boder-input {
  border: 1px solid red;
}
/* class loading */
.loading {
  display: flex;
  justify-content: center;
  align-items: center;
}
.red {
  color: red;
  display: block;
}
</style>
