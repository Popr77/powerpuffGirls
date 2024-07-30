<script setup lang="ts">
import DOMPurify from 'isomorphic-dompurify';
import type { TEpisode } from '@/types';

defineProps<{ data: TEpisode }>();

const getFormattedDate = (timestamp: string): string => {
  const date = new Date(timestamp);

  return `${date.getUTCDate()}/${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`;
};
</script>
<template>
  <a
    :href="data.url"
    class="flex gap-10 rounded border-2 p-4 duration-300 ease-in-out hover:cursor-pointer hover:border-slate-300 hover:bg-slate-50"
  >
    <div class="min-h-36 w-64">
      <img
        v-if="data.image"
        class="h-full w-full rounded object-cover"
        :src="data.image.original"
        alt="tvShowImage"
      />
      <div v-else class="h-full w-full rounded bg-slate-200 object-cover"></div>
    </div>
    <div class="flex flex-1 flex-col">
      <span class="text-lg font-bold">{{ data.name }}</span>
      <div class="text-sm" v-html="DOMPurify.sanitize(data.summary)"></div>

      <div class="flex h-full flex-col justify-end">
        <span class="flex justify-end">{{ getFormattedDate(data.airstamp) }}</span>
      </div>
    </div>
  </a>
</template>
