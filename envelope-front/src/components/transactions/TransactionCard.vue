<template>
  <div class="card">
    <div class="card-item">
        <strong>{{ transaction.description}}</strong>
        <p>Fecha: {{ transaction.date }}</p>
        <p>Monto: {{transaction.amount}}</p>
    </div>
  </div>
</template>

<script setup>
const { transaction } = defineProps({
 transaction: { type: Object, required: true }
})
</script>