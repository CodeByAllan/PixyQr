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

    <div class="row q-mt-md">
      <div class="color-picker-container">
        <div class="color-title">Foreground Color</div>
        <q-color
          v-model="form.foregroundColor"
          flat
          bordered
          hide-cancel
          hide-header
          class="q-ma-sm color-picker"
          format-model="hex"
        />
      </div>
      <div class="color-picker-container">
        <div class="color-title">Background Color</div>
        <q-color
          v-model="form.backgroundColor"
          flat
          bordered
          hide-cancel
          hide-header
          class="q-ma-sm color-picker"
          format-model="hex"
        />
      </div>
    </div>

    <AppButton label="Generate" :loading="isSubmitting" type="submit" />
  </q-form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { generatePix, isValidPixKey } from 'src/utils/pix';
import AppButton from 'src/components/AppButton.vue';

const emit = defineEmits<{
  (
    e: 'qr-generated',
    payload: {
      payload: string;
      colors: {
        foregroundColor: string;
        backgroundColor: string;
      };
    },
  ): void;
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
  foregroundColor: '#000000',
  backgroundColor: '#ffffff',
});

const isSubmitting = ref(false);

const submitForm = () => {
  isSubmitting.value = true;

  const pix = generatePix({
    key: form.value.key,
    name: form.value.name,
    city: form.value.city,
  });

  emit('qr-generated', {
    payload: pix,
    colors: {
      foregroundColor: form.value.foregroundColor,
      backgroundColor: form.value.backgroundColor,
    },
  });
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

.color-picker-container {
  text-align: center;
  margin-right: 10px;
}

.color-title {
  margin-bottom: 5px;
  font-weight: bold;
  color: $color-secondary;
}

.color-picker {
  width: 120px;
  height: 70px;
  border-radius: 8px;
  border: 2px solid #ccc;
  background-color: white;
  transition: all 0.3s ease;
}
</style>
