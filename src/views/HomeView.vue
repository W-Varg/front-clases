<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import ScrollPanel from 'primevue/scrollpanel'
</script>

<template>
  <main>
    <ScrollPanel class="custom-scrollpanel" style="width: 90%; height: 500px">
      <TheWelcome />
    </ScrollPanel>
  </main>
</template>

<style scoped>
.custom-scrollpanel {
  padding-left: 100px;
}
</style>
