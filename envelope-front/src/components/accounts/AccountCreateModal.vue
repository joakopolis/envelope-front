<template>
  <div class="modal-backdrop">
    <div class="modal">
        <h3>Crear cuenta</h3>

        <form @submit.prevent="save">
        <label>Nombre</label>
        <input v-model="form.name" placeholder="Nombre de la cuenta" required/>
        <input v-model="form.currency" placeholder="ARS"/>

        <button type="submit">Crear</button>
        <button @click="$emit('close')" type="button">Cancelar</button>
        </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createAccount } from '@/services/accounts'

const emit = defineEmits(['close', 'saved'])

const form = ref({
  name: '',
  currency: 'ARS'
})

const save = async () => {
  try {
    await createAccount(form.value)
    emit('saved')
  } catch (e) {
    console.error(e)
  }
}
</script>

<style>
.modal {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background: white;
  width: 400px;
  padding: 2rem;
  border-radius: 6px;
}  
</style>

