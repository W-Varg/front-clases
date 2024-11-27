import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
// import AuraTheme from '@primevue/themes/aura'
import AuraTheme from '@primevue/themes/material'

// componentes de prime vue
import Toast from 'primevue/toast'

// servicios de primevue
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'

import App from './App.vue'
import { routes } from './router'

const app = createApp(App)
app.use(PrimeVue, {
  theme: {
    preset: AuraTheme,
  },
})
app.component('Toast', Toast)

app.use(ConfirmationService)
app.use(ToastService)
app.use(createPinia())
app.use(routes)

app.mount('#app')
