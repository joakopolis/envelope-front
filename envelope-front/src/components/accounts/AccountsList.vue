<template>
  <div class="accounts-list">
    <AccountCard 
      v-for="account in accounts" 
      :key="account.id" 
      :account="account" 
    />
  </div>
</template>

<script setup>
import AccountCard from './AccountCard.vue'

defineProps({
  accounts: {
    type: Array,
    required: true
  }
})
</script>

<style scoped>
.accounts-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
