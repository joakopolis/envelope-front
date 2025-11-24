<template>
    <div class="modal-backdrop">

        <div class="modal">
            <h3>Nueva transacción</h3>

            <form @submit.prevent="save">
                <label>Descripción</label>
                <input v-model="form.description" type="text" />

                <label>Monto</label>
                <input v-model="form.amount" type="number" step="0.01" required/>

                <div>
                    <label>
                    <input
                        type="radio"
                        value="credit"
                        v-model="form.transaction_type"
                    />
                    Ingreso
                    </label>

                    <label>
                    <input
                        type="radio"
                        value="debit"
                        v-model="form.transaction_type"
                    />
                    Gasto
                    </label>
                </div>

                <label>Fecha</label>
                <input
                    type="date"
                    v-model="form.date"
                />

                <div class="actions">
                <button type="submit">Ok</button>
                <button type="button" @click="cancel">Cancelar</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
//import { useEnvelopesStore } from '@/stores/envelopes'

const emit = defineEmits(['close', 'createTx'])
defineProps({
  envelope: { type: Object, required: true }
})
//const store = useEnvelopesStore()

const form = ref({
    description: '',
    amount: '',
    transaction_type: 'credit',
    date: new Date().toISOString().slice(0, 10)
})

const save = () => {
  emit('createTx', { ...form.value })
}

const cancel = () => {
    emit('close')
}
</script>
