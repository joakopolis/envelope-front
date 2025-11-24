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
            if (window.confetti) {
                window.confetti({
                    particleCount: 200,
                    spread: 80,
                    origin: { y: 0.6 }
                })
            }
            router.push('/accounts')
        } catch (error) {
            errorMessage.value = 'Usuario o contraseña incorrectos.'
            console.error('Login failed:', error)
        }
    }
</script>

<template>
    <div class="card" style="max-width: 400px; margin: auto;">
        <h2>Iniciar sesión</h2>
        <form @submit.prevent="handleLogin">
            <input v-model="email" type="email" placeholder="Correo electrónico" required/>
            <input v-model="password" type="password" placeholder="Contraseña" required/>
            <button type="submit">Acceder</button>
        </form>

        <p v-if="errorMessage" style="color:red; margin-top:10px;">{{ errorMessage }}</p>
    </div>
</template>
