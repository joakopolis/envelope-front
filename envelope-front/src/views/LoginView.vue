<script setup>
    import { ref } from 'vue'
    import { useAuthStore } from '@/stores/auth'
    import { useRouter } from 'vue-router'

    const email = ref('')
    const password = ref('')
    const errorMessage = ref('')
    const auth = useAuthStore()
    const router = useRouter()

    const handleLogin = async () => {
        try {
            await auth.login(email.value, password.value)
            router.push('/accounts')
        } catch (error) {
            errorMessage.value = 'Usuario o contraseña incorrectos.'
            console.error('Login failed:', error)
        }
    }
</script>

<template>
    <div>
        <h1>Iniciar sesión</h1>
        <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Correo electrónico" required/>
            <input v-model="password" type="password" placeholder="Contraseña" required/>
            <button type="submit">Acceder</button>
        </form>

        <p v-if="errorMessage" style="color:red; margin-top:10px;">{{ errorMessage }}</p>
    </div>
</template>
