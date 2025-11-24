<template>
    <div>
    <h2>Transacciones</h2>

    <!-- <p v-if="store.loading">Cargando...</p> -->

    <TransactionCard
      v-for="tx in transactions"
      :key="tx.id"
      :transaction="tx"
    />
  </div>
</template>

<script setup>
import { useRoute} from 'vue-router'
import { onMounted, computed } from 'vue'
import { useEnvelopesStore } from '@/stores/envelopes'
import TransactionCard from '@/components/transactions/TransactionCard.vue'

const route = useRoute()
const envelopeId = Number(route.params.id)
const envelopeStore = useEnvelopesStore()
const envelope = computed(() => 
    envelopeStore.envelopes.find(e => e.id === envelopeId)
)
const transactions = computed(() => envelope.value?.transactions || [])

onMounted(() => {
    if (!envelopeStore.accountId) {
    envelopeStore.setAccount(route.params.accountId)
  }

  envelopeStore.loadTransactions(route.params.accountId, route.params.envelopeId)
})
</script>