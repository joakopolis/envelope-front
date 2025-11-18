<template>
  <div class="account-card" @click="goToDetail">
    <div class="info">
      <strong>{{ account.name }}</strong>
      <p>Saldo: ${{ account.balance }}</p>
    </div>
    <div class="actions" @click.stop>
      <button @click="$emit('edit', account)">Editar</button>
      <button @click="$emit('delete', account)">Borrar</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  account: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])

function goToDetail() {
  router.push(`/accounts/${props.account.id}`)
}
</script>

<style scoped>
.account-card {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.actions button {
  margin-left: 0.5rem;
}
</style>
