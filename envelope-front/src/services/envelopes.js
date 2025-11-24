import api from './api'

export function fetchEnvelopes(accountId) {
  return api.get(`/accounts/${accountId}/envelopes`)
}

export function fetchEnvelope(accountId, envelopeId) {
  return api.get(`/accounts/${accountId}/envelopes/${envelopeId}`)
}

export function createEnvelope(accountId, payload) {
  return api.post(`/accounts/${accountId}/envelopes`, payload)
}

export function updateEnvelope(accountId,envelopeId, payload) {
  return api.put(`/accounts/${accountId}/envelopes/${envelopeId}`, payload)
}

export function deleteEnvelope(accountId, envelopeId) {
  return api.delete(`/accounts/${accountId}/envelopes/${envelopeId}`)
}
