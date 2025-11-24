<template>
  <footer class="app-footer">
    {{ year }} Morelabs — Todos los derechos reservados
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
</script>

<!--
<style scoped>
.footer {
  text-align: center;
  padding: 1rem;
  border-top: 1px solid #333;
  margin-top: 2rem;
  font-size: 0.9rem;
}
</style>
-->
