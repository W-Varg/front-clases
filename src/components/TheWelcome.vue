<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
import { ref, onBeforeMount, onMounted } from 'vue'
import axios from 'axios'
import Chart from 'primevue/chart'
import Button from 'primevue/button'

const chartData = ref()
const chartOptions = ref()

const setChartData = () => {
  return {
    labels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7'], // 0 1 2 3 4
    datasets: [
      {
        label: 'Sales',
        data: [540, 325, 702, 620, 950, 750],
        backgroundColor: [
          'rgba(249, 115, 22, 0.2)',
          'rgba(6, 182, 212, 0.2)',
          'rgb(107, 114, 128, 0.2)',
          'rgba(139, 92, 246 0.2)',
        ],
        borderColor: [
          'rgb(249, 115, 22)',
          'rgb(6, 182, 212)',
          'rgb(107, 114, 128)',
          'rgb(139, 92, 246)',
        ],
        borderWidth: 1,
      },
    ],
  }
}
const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')
  const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color')
  const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color')

  return {
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  }
}

const dataDeServer = ref()

onBeforeMount(() => {
  axios.post('http://127.0.0.1:3005/report/estudiantes/edad', {}).then((response) => {
    dataDeServer.value = response.data
    chartData.value = {
      labels: dataDeServer.value?.labels, // 0 1 2 3 4
      datasets: [
        {
          label: 'Sales',
          data: dataDeServer.value?.data,
          backgroundColor: [
            'rgba(249, 115, 22, 0.2)',
            'rgba(6, 182, 212, 0.2)',
            'rgb(107, 114, 128, 0.2)',
            'rgba(139, 92, 246 0.2)',
          ],
          borderColor: [
            'rgb(249, 115, 22)',
            'rgb(6, 182, 212)',
            'rgb(107, 114, 128)',
            'rgb(139, 92, 246)',
          ],
          borderWidth: 1,
        },
      ],
    }
  })
})

const descargar = () => {
  const cabecera = dataDeServer.value.labels
  const filas = dataDeServer.value.data

  const csvContent = [cabecera, filas].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const enlaceDescarga = document.createElement('a')
  enlaceDescarga.href = URL.createObjectURL(blob)
  document.body.appendChild(enlaceDescarga)
  enlaceDescarga.download = 'reporte.csv'
  enlaceDescarga.click()
  document.body.removeChild(enlaceDescarga) //
}

onMounted(() => {
  console.log('onMounted despues')
  // chartData.value = setChartData()
  chartOptions.value = setChartOptions()
})
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <DocumentationIcon />
    </template>
    <template #heading>documentacion</template>

    Vue’s
    <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
    provides you with all information you need to get started.
  </WelcomeItem>

  <Button label="Descargar" icon="pi pi-download" severity="success" @click="descargar"></Button>
  <div class="card">
    <Chart type="pie" :data="chartData" :options="chartOptions" />
  </div>

  <WelcomeItem>
    <template #icon>
      <ToolingIcon />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>. The
    recommended IDE setup is
    <a href="https://code.visualstudio.com/" target="_blank" rel="noopener">VSCode</a>
    +
    <a href="https://github.com/johnsoncodehk/volar" target="_blank" rel="noopener">Volar</a>. If
    you need to test your components and web pages, check out
    <a href="https://www.cypress.io/" target="_blank" rel="noopener">Cypress</a>
    and
    <a href="https://on.cypress.io/component" target="_blank" rel="noopener"
      >Cypress Component Testing</a
    >.

    <br />

    More instructions are available in <code>README.md</code>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <EcosystemIcon />
    </template>
    <template #heading>Ecosystem</template>

    Get official tools and libraries for your project:
    <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
    <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>,
    <a href="https://test-utils.vuejs.org/" target="_blank" rel="noopener">Vue Test Utils</a>, and
    <a href="https://github.com/vuejs/devtools" target="_blank" rel="noopener">Vue Dev Tools</a>. If
    you need more resources, we suggest paying
    <a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">Awesome Vue</a>
    a visit.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Community</template>

    Got stuck? Ask your question on
    <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>, our official
    Discord server, or
    <a href="https://stackoverflow.com/questions/tagged/vue.js" target="_blank" rel="noopener"
      >StackOverflow</a
    >. You should also subscribe to
    <a href="https://news.vuejs.org" target="_blank" rel="noopener">our mailing list</a>
    and follow the official
    <a href="https://twitter.com/vuejs" target="_blank" rel="noopener">@vuejs</a>
    twitter account for latest news in the Vue world.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Support Vue</template>

    As an independent project, Vue relies on community backing for its sustainability. You can help
    us by
    <a href="https://vuejs.org/sponsor/" target="_blank" rel="noopener">becoming a sponsor</a>.
  </WelcomeItem>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
