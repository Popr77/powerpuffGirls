<script setup lang="ts">
import LoaderComponent from '@/components/atoms/LoaderComponent.vue';
import { defineAsyncComponent } from 'vue';

const AsyncTvShowDetail = defineAsyncComponent(
  () => import('@/components/organisms/TvShowDetail.vue'),
);
</script>

<template>
  <Suspense>
    <template #default>
      <AsyncTvShowDetail />
    </template>
    <template #fallback>
      <LoaderComponent />
    </template>
  </Suspense>
</template>
