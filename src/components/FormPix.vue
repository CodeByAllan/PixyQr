<template>
  <q-form @submit.prevent="submitForm" class="q-ma-sm">
    <q-option-group
      class="row q-group"
      dark
      v-model="form.keyType"
      :options="keyTypes"
      type="radio"
      label="Type key"
      color="primary"
    />

    <br />
    <q-input
      class="q-ma-sm"
      dark
      filled
      v-model="form.key"
      label="Key"
      :rules="[
        (val) => !!val || 'Key is required',
        (val) => isValidPixKey(val, form.keyType) || 'Invalid key for selected type',
      ]"
    />
    <q-input
      class="q-ma-sm"
      dark
      filled
      v-model="form.name"
      label="Name"
      :rules="[(val) => !!val || 'Name is required']"
    />
    <q-input
      class="q-ma-sm"
      dark
      filled
      v-model="form.city"
      label="City"
      :rules="[(val) => !!val || 'City is required']"
    />

    <q-btn
      label="Generate"
      :loading="isSubmitting"
      type="submit"
      color="primary"
      outline
      class="q-ma-sm"
    />
  </q-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { generatePix, isValidPixKey } from 'src/utils/pix';
const emit = defineEmits<{
  (e: 'qr-generated', payload: string): void;
}>();
const keyTypes = [
  { label: 'CPF/CNPJ', value: 'cpfcnpj' },
  { label: 'E-mail', value: 'email' },
  { label: 'Phone', value: 'phone' },
  { label: 'Random Key', value: 'rand' },
];
const form = ref({
  key: '',
  name: '',
  city: '',
  keyType: 'cpfcnpj',
});

const isSubmitting = ref(false);

const submitForm = () => {
  isSubmitting.value = true;

  const pix = generatePix({
    key: form.value.key,
    name: form.value.name,
    city: form.value.city,
  });

  emit('qr-generated', pix);

  isSubmitting.value = false;
};
watch(
  () => form.value.keyType,
  (newType, oldType) => {
    if (newType === 'phone') {
      if (!form.value.key.startsWith('+55')) {
        form.value.key = '+55';
      }
    } else if (oldType === 'phone' && form.value.key.startsWith('+55')) {
      form.value.key = '';
    }
  },
);
</script>
<style lang="scss" scoped>
.q-group {
  color: $color-secondary;
}
</style>
