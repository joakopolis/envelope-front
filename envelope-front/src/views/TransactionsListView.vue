<template>
  <div>
    <h3>Transacciones</h3>

    <!-- <p v-if="envelopeStore.loading">Cargando...</p> -->
    <div class="'list'">
      <TransactionCard
        v-for="tx in transactions"
        :key="tx.id"
        :transaction="tx"
      />
    </div>
  </div>
</template>

<script setup>
import { useRoute} from 'vue-router'
import { onMounted, computed } from 'vue'
import { useEnvelopesStore } from '@/stores/envelopes'
import TransactionCard from '@/components/transactions/TransactionCard.vue'

const route = useRoute()
const envelopeId = Number(route.params.envelopeId)
const envelopeStore = useEnvelopesStore()
const envelope = computed(() => 
    envelopeStore.envelopes.find(e => e.id === envelopeId)
)
const transactions = computed(() => envelope.value?.transactions || [])

onMounted(async () => {
    if (!envelopeStore.accountId) {
    envelopeStore.setAccount(Number(route.params.accountId))
  }

  await envelopeStore.loadTransactions(Number(route.params.envelopeId), Number(route.params.accountId))
})
console.log('route.params:', route.params)
console.log(
  'Llamando loadTransactions con:',
  Number(route.params.envelopeId),
  Number(route.params.accountId)
)

</script>
