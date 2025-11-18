import { defineStore } from 'pinia'
import {
  fetchAccounts,
  fetchAccount,
  createAccount,
  updateAccount,
  deleteAccount
} from '@/services/accounts'

export const useAccountStore = defineStore('accounts', {
  state: () => ({
    accounts: [],
    current: null,
    loading: false,
    error: null
  }),

  actions: {
    async loadAccounts() {
      this.loading = true
      try {
        const { data } = await fetchAccounts()
        this.accounts = data
      } finally {
        this.loading = false
      }
    },

    async loadAccount(id) {
      this.loading = true
      try {
        const { data } = await fetchAccount(id)
        this.current = data
      } finally {
        this.loading = false
      }
    },

    async create(payload) {
      const { data } = await createAccount(payload)
      this.accounts.push(data)
      return data
    },

    async update(id, payload) {
      const { data } = await updateAccount(id, payload)
      const idx = this.accounts.findIndex(a => a.id === id)
      if (idx !== -1) this.accounts[idx] = data
      return data
    },

    async delete(id) {
      await deleteAccount(id)
      this.accounts = this.accounts.filter(a => a.id !== id)
    }
  }
})
