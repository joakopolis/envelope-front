<template>
  <div class="list">
    <EnvelopeCard class="list-item" 
      v-for="envelope in envelopes" 
      :key="envelope.id" 
      :envelope="envelope"
      :account-id="accountId"
      @edit="openEditModal"
      @delete="handleDeleteEnvelope" 
      @new-transaction="openTransactionModal"
    />
    <button @click="openCreateModal">Nuevo sobre</button>
    <EnvelopeEditModal
      v-if="showEditModal"
      :envelope="selectedEnvelope"
      @close="showEditModal = null"
      @saved="onEnvelopeSaved"
    />

    <EnvelopeCreateModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @saved="onEnvelopeSaved"
    />

    <NewTransactionModal
    v-if="showTransactionModal"
    :envelope="selectedEnvelope"
    @close="showTransactionModal = false"
    @createTx="onTransactionSaved"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import EnvelopeCard from './EnvelopeCard.vue'
import EnvelopeEditModal from './EnvelopeEditModal.vue'
import EnvelopeCreateModal from './EnvelopeCreateModal.vue'
import NewTransactionModal from '@/components/transactions/NewTransactionModal.vue'
import { useEnvelopesStore } from '@/stores/envelopes'

const { envelopes, accountId } = defineProps({
  envelopes: { type: Array, required: true },
  accountId: { type: [String, Number], required: true }
})

const store = useEnvelopesStore()
const emit = defineEmits(['refresh'])
const selectedEnvelope = ref(null)
const showCreateModal = ref(false)
const showEditModal = ref(false)
const showTransactionModal = ref(false)

const closeModals = () => {
  selectedEnvelope.value = null
  showEditModal.value = false
  showCreateModal.value = false
  showTransactionModal.value = false
}

const openCreateModal = () => {
  selectedEnvelope.value = null
  showCreateModal.value = true
}

const openEditModal = (envelope) => {
  selectedEnvelope.value = { ...envelope }
  showEditModal.value = true
}

const openTransactionModal = (envelope) => {
   selectedEnvelope.value = envelope
   showTransactionModal.value = true
}

const onEnvelopeSaved = () => {
  closeModals()
  emit('refresh')
}

const onTransactionSaved = async (payload) => {
  await store.createTransaction(selectedEnvelope.value.id, payload)
  closeModals()
  emit('refresh')
}

const handleDeleteEnvelope = async (envelope) => {
  if (!confirm(`¿Seguro que querés borrar ${envelope.name}?`)) return

  try {
    await store.delete(envelope.id)
  } catch (e) {
    console.error(e)
  }
}
console.log(envelopes)
</script>

<style scoped>
.envelopes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
