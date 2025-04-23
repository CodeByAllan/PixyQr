<template>
  <q-footer class="text-white text-center q-pa-sm">
    <div class="footer-text text-wrap">© {{ year }} {{ label }}. All rights reserved.</div>
  </q-footer>
</template>
<script setup lang="ts">
defineProps<{
  label?: string;
  year?: string;
}>();
</script>
<style scoped lang="scss">
.q-footer {
  background-color: $color-primary;
  .footer-text {
    font-family: $font-secondary;
    font-size: 14px;
    color: $color-secondary;
  }
}
</style>
