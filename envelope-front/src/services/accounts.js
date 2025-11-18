import api from './api'

export function fetchAccounts() {
  return api.get('/accounts')
}

export function fetchAccount(id) {
  return api.get(`/accounts/${id}`)
}

export function createAccount(payload) {
  return api.post('/accounts', payload)
}

export function updateAccount(id, payload) {
  return api.put(`/accounts/${id}`, payload)
}

export function deleteAccount(id) {
  return api.delete(`/accounts/${id}`)
}
