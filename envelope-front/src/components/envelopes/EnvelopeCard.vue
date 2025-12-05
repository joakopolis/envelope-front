<template>
  <div class="envelope-card" @click="transactionsDetail">
    <div class="info">
      <strong>{{ envelope.name }}</strong>
      <p>Saldo: ${{ envelope.balance }}</p>
    </div>
    <div class="actions" @click.stop>
        <button @click="triggerEdit">Editar</button>
        <button @click="triggerDelete">Borrar</button>
        <button @click="triggerNewTx">Nueva transacción</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const { envelope, accountId } = defineProps({
  envelope: { type: Object, required: true },
  accountId: { type: [String, Number], required: true }
})

const emit = defineEmits(['edit', 'delete', 'new-transaction'])

const triggerNewTx = () => {
      emit('new-transaction', envelope)
}
const triggerEdit = () => {
      emit('edit', envelope)
}
const triggerDelete = () => {
      emit('delete', envelope)
}

function transactionsDetail() {
  router.push({
    name: 'transactions',
    params: {
      accountId,
      envelopeId: envelope.id
    }
  })
}
</script>

<style scoped>
.envelope-card {
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
