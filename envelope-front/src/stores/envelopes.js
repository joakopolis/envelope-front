import { defineStore } from 'pinia'
import {
  fetchEnvelopes,
  fetchEnvelope,
  createEnvelope,
  updateEnvelope,
  deleteEnvelope
} from '@/services/envelopes'
import { fetchTransactions, createTransaction } from '@/services/transactions'

export const useEnvelopesStore = defineStore('envelopes', {
  state: () => ({
    accountId: null,
    envelopes: [],
    current: null,
    loading: false,
    error: null
  }),

  actions: {
    setAccount(id) {
       this.accountId = id 
    },

    async loadEnvelopes(accountId = this.accountId) {
      if (!accountId) throw new Error('accountId no definido')
      this.accountId = accountId
      this.loading = true
      
      try {
        const { data } = await fetchEnvelopes(accountId)
        this.envelopes = data
      } finally {
        this.loading = false
      }
    },

    async loadEnvelope(envelopeId, accountId = this.accountId) {
      if (!accountId) throw new Error('accountId no definido')
      this.accountId = accountId
      this.loading = true
      
      try {
        const { data } = await fetchEnvelope(accountId, envelopeId)
        this.current = data
      } finally {
        this.loading = false
      }
    },

    async create(payload, accountId = this.accountId) {
      if (!accountId) throw new Error('accountId no definido')
      const { data } = await createEnvelope(accountId, payload)
      this.envelopes.push(data)
      return data
    },

    async update(envelopeId, payload) {
      const { data } = await updateEnvelope(this.accountId, envelopeId, payload)
      const idx = this.envelopes.findIndex(e => e.id === envelopeId)
      if (idx !== -1) this.envelopes[idx] = data
      return data
    },

    async delete(envelopeId, accountId = this.accountId) {
      if (!accountId) throw new Error('accountId no definido')
      await deleteEnvelope(accountId, envelopeId)
      this.envelopes = this.envelopes.filter(a => a.id !== envelopeId)
    },

    async loadTransactions(envelopeId) {
      if (!this.accountId) throw new Error('accountId no definido')
      this.loading = true
      
      try {
        const { data } = await fetchTransactions(this.accountId, envelopeId)
        const envelope = this.envelopes.find(e => e.id === envelopeId)
        if (envelope) {
          envelope.transactions = data
        }
      } finally {
        this.loading = false
      }
    },

    async createTransaction(envelopeId, payload) {
      const {data} = await createTransaction(this.accountId, envelopeId, payload)
      const envelope = this.envelopes.find(e => e.id === envelopeId)
      if (envelope) {
        envelope.transactions ||= []
        envelope.transactions.push(data)
      }
    }
  }
})
