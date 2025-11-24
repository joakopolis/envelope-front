<template>
  <div class="accounts-list">
    <AccountCard 
      v-for="account in accounts" 
      :key="account.id" 
      :account="account"
      @edit="openEditModal"
      @delete="handleDeleteAccount" 
    />

    <AccountEditModal
      v-if="selectedAccount"
      :account="selectedAccount"
      @close="selectedAccount = null"
      @saved="onAccountSaved"
    />
  </div>
</template>

<script setup>
import AccountCard from './AccountCard.vue'
import { deleteAccount } from '@/services/accounts'
//import { defineEmits } from 'vue'
import { ref } from 'vue'
import AccountEditModal from './AccountEditModal.vue'

const emit = defineEmits(['refresh'])
const selectedAccount = ref(null)

defineProps({
  accounts: {
    type: Array,
    required: true
  }
})

const openEditModal = (account) => {
  selectedAccount.value = { ...account }
}

const onAccountSaved = () => {
  selectedAccount.value = null
  emit('refresh')
}


const handleDeleteAccount = async (account) => {
  if (!confirm(`¿Seguro que querés borrar ${account.name}?`)) return

  try {
    await deleteAccount(account.id)
    emit('refresh')
  } catch (e) {
    console.error(e)
  }
}
</script>

<style scoped>
.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
