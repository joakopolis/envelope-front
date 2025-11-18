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

            localStorage.setItem('token', token)

            this.user = response.data.user
            return response.data
        },

        logout() {
            this.user = null
            this.token = null
            localStorage.removeItem('token')
        }
    }
})
