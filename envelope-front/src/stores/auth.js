import { defineStore } from 'pinia'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null
    }),

    actions: {
        async login(email, password) {
            const response = await api.post('/login', {
                user: { email, password }
            })

            const authHeader = response.headers['authorization']

            if (!authHeader) {
                throw new Error("Sin autorización")
            }

            const token = authHeader.split(' ')[1]
            this.token = token
            this.user = response.data.status.data.user

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(this.user))

            return response.data
        },

        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
        },
        loadFromStorage() {
        const token = localStorage.getItem('token')
        const user = localStorage.getItem('user')

        if (token) this.token = token
        if (user) this.user = JSON.parse(user)
    }
    }
})
