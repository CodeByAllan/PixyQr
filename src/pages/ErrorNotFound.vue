<template>
  <div class="fullscreen text-white text-center q-pa-md flex flex-center">
    <div>
      <div class="code">404</div>

      <div class="text-h2">Oops. Nothing here...</div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.code {
  color: $color-primary;
  font-size: 30vh;
}
.text-h2 {
  color: $color-secondary;
}

@media (max-width: 600px) {
  .code {
    font-size: 10vh;
  }

  .text-h2 {
    font-size: 4vh;
  }
}
</style>
