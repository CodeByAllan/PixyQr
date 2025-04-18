<template>
  <q-page>
    <div class="row q-col-gutter-md full-height full-width q-pa-xl">
      <div class="col-12 col-md-6">
        <FormPix @qr-generated="handleQr" />
      </div>

      <div class="col-12 col-md-6 flex flex-center column items-center">
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
          />
        </div>
        <q-btn
          outline
          v-if="state.qrImage && !state.isLoad"
          label="Download"
          color="primary"
          @click="downloadQrCode"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { generateQrCode } from 'src/utils/qrcode';
import FormPix from 'src/components/FormPix.vue';

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
</style>
