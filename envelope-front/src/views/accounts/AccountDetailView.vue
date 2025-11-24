<template>
  <AppLayout>
    <div v-if="loading">Cargando cuenta...</div>

    <div v-else>
      <h1>{{ account.name }}</h1>
      <button @click="goBack">Volver</button>

      <p><strong>Moneda:</strong> {{ account.currency }}</p>
      <p><strong>Balance:</strong> {{ account.balance }}</p>

     <EnvelopesList
        :envelopes="envelopeStore.envelopes" 
        @refresh="() => envelopeStore.loadEnvelopes(route.params.id)"
        />
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/accounts'
import { useEnvelopesStore } from '@/stores/envelopes'
import AppLayout from '@/components/layout/AppLayout.vue'
import EnvelopesList from '@/components/envelopes/EnvelopesList.vue'

const route = useRoute()
const router = useRouter()

const accountStore = useAccountStore()
const envelopeStore = useEnvelopesStore()

const loading = ref(true)

const loadAccount = async () => {
  loading.value = true
  await accountStore.loadAccount(route.params.id)
  loading.value = false
}

const account = computed(() => accountStore.current)

const goBack = () => {
  router.push('/accounts')
}

onMounted(() => {
  loadAccount()
  envelopeStore.loadEnvelopes(route.params.id)
})
</script>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
</style>
