<template>
  <q-layout view="lHh Lpr lff">
    <q-header>
      <q-toolbar>
        <q-toolbar-title class="q-toolbar-title">
          <div class="h4">Pixy<strong>Qr</strong></div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <AppFooter label="CodeByAllan" year="2025" />
  </q-layout>
</template>

<script setup lang="ts">
import AppFooter from 'src/components/AppFooter.vue';
</script>
<style lang="scss" scoped>
.q-header {
  background-color: $color-bg-main;
  color: $color-primary;
  strong {
    color: $color-secondary;
  }
  .q-toolbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 80px;
    width: 100%;

    .q-toolbar-title {
      font-family: $font-secondary;
      font-weight: 700;
      font-size: 32px;
      line-height: 1;
      letter-spacing: 0;
    }
  }
}
</style>
