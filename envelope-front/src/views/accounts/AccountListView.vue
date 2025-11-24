<template>
  <AppLayout>
    <button @click="goToCreate">Nueva cuenta</button>

    <AccountsList 
    :accounts="accountStore.accounts" 
    @refresh="accountStore.loadAccounts"
    />

    <AccountCreateModal
      v-if="showCreateModal"
      @close="showCreateModal = false"
      @saved="onAccountSaved"
    />
  </AppLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAccountStore } from '@/stores/accounts'
import AccountCreateModal from '@/components/accounts/AccountCreateModal.vue'
import AppLayout from '@/components/layout/AppLayout.vue'
import AccountsList from '@/components/accounts/AccountsList.vue'

const showCreateModal = ref(false)

function goToCreate() {
  showCreateModal.value = true
}

function onAccountSaved() {
  showCreateModal.value = false
  accountStore.loadAccounts()
}

const accountStore = useAccountStore()

onMounted(() => {
  accountStore.loadAccounts()
})

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

