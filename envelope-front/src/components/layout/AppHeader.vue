<template>
    <header class="header">
        <div class="left">
            <span class="logo">More envelopes</span>
        </div>

        <div class="right">
            <span class="user">{{ userEmail }}</span>
            <button @click="logout">Salir</button>
        </div>
    </header>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const userEmail = computed(() => auth.user?.email)
const router = useRouter()

const auth = useAuthStore()
        
const logout = () => {
    auth.logout()
    router.push('/login')
}
</script>

<style scoped>
    .header {
        display: flex;
        justify-content: space-between;
        padding: 1rem;
        border-bottom: 1px solid #333;
    }

    .logo {
        font-weight: bold;
        font-size: 1.2rem;
    }

    .right {
        display: flex;
        align-items: center;
        gap: 1rem;
    }
</style>
