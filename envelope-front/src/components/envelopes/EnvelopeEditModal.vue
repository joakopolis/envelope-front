<template>

  <div class="modal-backdrop">

    <div class="modal">
      <h3>Editar sobre</h3>

      <form @submit.prevent="save">
        <label>Nombre</label>
        <input v-model="form.name" />

        <div class="actions">
          <button type="submit">Guardar</button>
          <button type="button" @click="cancel">
            Cancelar
          </button>
        </div>
      </form>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useEnvelopesStore } from '@/stores/envelopes'

const emit = defineEmits(['saved', 'close'])

const props = defineProps({
  envelope: {
    type: Object,
    required: true
  }
})

const store = useEnvelopesStore()

const form = ref({ ...props.envelope })

const save = async () => {
  try {
    await store.update(
      props.envelope.id,
      form.value
    )
    emit('saved', 'edit')
  } catch (e) {
    console.error(e)
  }
}

const cancel = () => {
  form.value = { ...props.envelope }
  emit('close')
}
</script>

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
