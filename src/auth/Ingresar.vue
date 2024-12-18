<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useToast } from 'primevue/usetoast'
import Message from 'primevue/message'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Toast from 'primevue/toast'
import { z } from 'zod'
import axios from 'axios'
import Password from 'primevue/password'

const toast = useToast()
const datosAEnviar = reactive({
  password: '',
  email: '',
})

const resolver = ref(
  zodResolver(
    z.object({
      email: z
        .string({ message: 'Email es requerido' })
        .min(5, { message: 'Correo electrónica es requerido' })
        .email({ message: 'No es un correo electrónica válido' }),

      password: z.string().min(5, { message: 'contraña es requerido' }),
    }),
  ),
)

const onFormSubmit = ({ valid }: FormSubmitEvent) => {
  if (valid) {
    axios
      .post('http://127.0.0.1:3005/usuarios/login', datosAEnviar)
      .then((response) => {
        // cuando la peticion es exitosa, se ejecuta la funcion then
        toast.add({ severity: 'success', summary: 'Datos enviados.', life: 3000 })
        // guardar en el local storage el token del usuario logueado y su informacionresponse.data)
        localStorage.setItem('user_sesion_data', JSON.stringify(response.data))
      })
      .catch((err) => {
        // se ejecuta cuando la peticion falla
        toast.add({ severity: 'error', summary: err.response.data?.message, life: 3000 })
      })
  } else {
    toast.add({
      severity: 'error',
      summary: 'Hay errores de validación en el formulario.',
      life: 3000,
    })
  }
}
</script>

<template>
  <div class="card flex justify-center">
    <Toast />
    <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues="datosAEnviar"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <!-- email -->
      <div class="flex flex-col gap-1">
        <InputText
          v-model="datosAEnviar.email"
          name="email"
          type="text"
          placeholder="Email"
          fluid
        />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">
          {{ $form.email.error?.message }}
        </Message>
      </div>
      <!-- contraña -->
      <div class="flex flex-col gap-1">
        <!-- <InputText
          v-model="datosAEnviar.password"
          name="password"
          type="password"
          placeholder="Contraseña"
          fluid
        /> -->
        <Password
          v-model="datosAEnviar.password"
          :feedback="true"
          toggleMask
          promptLabel="Escriba una contraseña"
          weakLabel="Demasiado simple"
          mediumLabel="Aceptable"
          strongLabel="Contraseña segura"
        />

        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">
          {{ $form.password.error?.message }}
        </Message>
      </div>
      <hr />
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>
