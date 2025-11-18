<template>
  <AppLayout>
    <button @click="createAccount">Nuevo sobre</button>

    <AccountsList :accounts="accountStore.accounts" />
  </AppLayout>
</template>

<script setup>
//import { ref } from 'vue'
import { onMounted } from 'vue'
import { useAccountStore } from '@/stores/accounts'
import AppLayout from '@/components/layout/AppLayout.vue'
import AccountsList from '@/components/accounts/AccountsList.vue'

// const accounts = ref([
//   { id: 1, name: 'Hogar', balance: 1200 },
//   { id: 2, name: 'Taller', balance: 500 }
// ])
const accountStore = useAccountStore()

onMounted(() => {
  accountStore.loadAccounts()
})

// function openCreateModal() {
//    alert('Acá después abrimos el modal para crear')
//  }
</script>

<style scoped>
h1 {
  margin-bottom: 1rem;
}

button {
  margin-bottom: 2rem;
  padding: 0.5rem 1rem;
}
</style>

