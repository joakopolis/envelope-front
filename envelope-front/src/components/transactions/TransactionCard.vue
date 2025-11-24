<template>
  <div class="transaction-card">
    <div class="info">
        <strong>{{ transaction.description}}</strong>
        <p>Fecha: {{ transaction.date }}</p>
        <p>Monto: {{transaction.mount}}</p>
        <p>Tipo: {{transaction.type}}</p>
    </div>
  </div>
</template>

<script setup>
const { transaction } = defineProps({
 transaction: { type: Object, required: true }
})
</script>