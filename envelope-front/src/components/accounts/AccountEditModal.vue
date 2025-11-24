<template>
    <div class="modal-backdrop">
        <div class="modal">
            <h3>Editar cuenta</h3>

            <form @submit.prevent="save">
            <label>Nombre</label>
            <input v-model="form.name" />

            <button type="submit">Guardar</button>
            <button @click="$emit('close')" type="button">Cancelar</button>
            </form>
        </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { updateAccount } from '@/services/accounts'

const emit = defineEmits(['close', 'saved'])

const props = defineProps({
  account: { type: Object, required: true }
})

const form = ref({ ...props.account })

const save = async () => {
  try {
    await updateAccount(props.account.id, form.value)
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

.modal form {
  background: white;
  padding: 2rem;
  border-radius: 6px;
  width: 400px;
}   </style>

