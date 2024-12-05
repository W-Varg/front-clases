import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import ListEstudiantes from '../module/estudiantes/ListarEstudiantes.vue'
import ListarAsistencias from '../module/asistencia/ListarAsistencias.vue'

export const routes = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home', // identifador de la ruta
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/acerca-de-mi',
      name: 'about-me',
      component: AboutView,
    },
    {
      path: '/list-estudiantes',
      name: 'estudiantes',
      component: ListEstudiantes,
    },
    {
      path: '/asistencia',
      name: 'asistencia',
      component: ListarAsistencias,
    },
  ],
})
