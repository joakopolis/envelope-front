import api from './api'

export function fetchTransactions(accountId, envelopeId) {
  return api.get(`/accounts/${accountId}/envelopes/${envelopeId}/transactions`)
}

export function createTransaction(accountId, envelopeId, payload) {
  return api.post(`/accounts/${accountId}/envelopes/${envelopeId}/transactions`, payload)
}
