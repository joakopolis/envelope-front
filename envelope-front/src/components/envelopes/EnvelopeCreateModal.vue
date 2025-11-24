<template>
    <div class="modal-backdrop">

        <div class="modal">
            <h3>Crear sobre</h3>

            <form @submit.prevent="save">
                <label>Nombre</label>
                <input v-model="form.name" />

                <div class="actions">
                <button type="submit">Crear</button>
                <button type="button" @click="cancel">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEnvelopesStore } from '@/stores/envelopes'

const emit = defineEmits(['close', 'saved'])

const store = useEnvelopesStore()

const form = ref({
  name: ''
})

const save = async () => {
  try {
    await store.create(form.value)
    emit('saved', 'create')
  } catch (e) {
    console.error(e)
  }
}

const cancel = () => {
    emit('close')
}
</script>

<!--
<style scoped>
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

.actions {
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
}

.actions button {
  margin-left: 0.5rem;
}
</style>
-->
