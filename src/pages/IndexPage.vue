<template>
  <q-page>
    <div class="row full-height full-width q-pl-xl q-pr-xl">
      <div class="col-12 col-md-6">
        <FormPix @qr-generated="handleQr" />
      </div>

      <div class="col-12 col-md-6 flex flex-start column items-center">
        <div class="q-mb-md" style="min-height: 260px; min-width: 260px; position: relative">
          <div class="text-h4 q-ma-sm flex flex-center items-center justify-center">
            <p class="qrcode-title">QrCode</p>
          </div>
          <q-inner-loading class="spinner" :showing="state.isLoad">
            <q-spinner-dots color="primary" size="64px" />
          </q-inner-loading>
          <img
            v-if="state.qrImage && !state.isLoad"
            ref="qrImgRef"
            :src="state.qrImage"
            alt="QR Code Pix"
            class="q-img-full-width"
            style="height: 260px; width: 260px; object-fit: contain"
          />

          <div
            v-if="!state.qrImage && !state.isLoad"
            class="flex flex-center items-center justify-center placeholder_container"
          >
            <q-icon name="qr_code" size="260px" class="qr_placeholder" />
          </div>
        </div>
        <AppButton v-if="state.qrImage && !state.isLoad" label="Download" @click="downloadQrCode" />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { generateQrCode } from 'src/utils/qrcode';
import FormPix from 'src/components/FormPix.vue';
import AppButton from 'src/components/AppButton.vue';

const state = reactive({
  qrImage: null as string | null,
  qrImgRef: null as HTMLImageElement | null,
  isLoad: false,
});

const handleQr = async (pixPayload: string) => {
  state.isLoad = true;
  state.qrImage = null;

  state.qrImage = await generateQrCode(pixPayload);
  setTimeout(() => {
    state.isLoad = false;
  }, 3000);
};

const downloadQrCode = () => {
  if (!state.qrImage) return;

  const link = document.createElement('a');
  link.href = state.qrImage;
  link.download = 'qrcode-pix.png';
  link.click();
};
</script>
<style lang="scss" scoped>
.qrcode-title {
  color: $color-primary;
  font-family: $font-secondary;
}

.spinner {
  background-color: transparent;
}

.placeholder_container {
  height: 260px;
  width: 260px;
  border: 5px solid $color-highlight;
  border-radius: 8px;
}
.qr_placeholder {
  color: $color-secondary;
}
</style>
