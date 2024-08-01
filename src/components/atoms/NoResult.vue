<script setup lang="ts">
import WarningIcon from '@/components/atoms/icons/WarningIcon.vue';
</script>

<template>
  <div
    class="container absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-10 py-0 text-center"
  >
    <WarningIcon class="mx-auto" />
    <div class="text-3xl">Oops!</div>
    <div>
      It was not possible to obtain data for the Tv Show. Try again later, or try a different name.
    </div>
  </div>
</template>
