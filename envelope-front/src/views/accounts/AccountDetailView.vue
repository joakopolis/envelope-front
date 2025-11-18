<template>
  <AppLayout>
    <div v-if="loading">Cargando cuenta...</div>

    <div v-else>
      <h1>{{ account.name }}</h1>

      <p><strong>Moneda:</strong> {{ account.currency }}</p>
      <p><strong>Balance:</strong> {{ account.balance }}</p>

      <button @click="goBack">Volver</button>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAccountStore } from '@/stores/accounts'
import AppLayout from '@/components/layout/AppLayout.vue'

const route = useRoute()
const router = useRouter()

const accountStore = useAccountStore()

//const account = ref(null)
const loading = ref(true)

// const loadAccount = async () => {
//   loading.value = true
//   account.value = await accountStore.loadAccount(route.params.id)
//   loading.value = false
// }

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
})
</script>

<style scoped>
h1 {
  margin-bottom: 1rem;
}
</style>
