<template>
  <q-btn
    v-bind="$attrs"
    :label="label"
    :loading="isLoading"
    :type="type"
    color="primary"
    outline
    class="q-ma-sm"
    @click="onClick"
  />
</template>

<script lang="ts" setup>
defineProps<{
  label?: string;
  isLoading?: boolean;
  type?: string;
}>();

const emit = defineEmits<{
  (e: 'click', evt: Event, go?: () => void): void;
}>();

function onClick(evt: Event, go?: () => void) {
  emit('click', evt, go);
}
</script>
