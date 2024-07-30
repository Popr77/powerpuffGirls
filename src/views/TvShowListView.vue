<script setup lang="ts">
import EpisodeListItem from '@/components/molecules/EpisodeListItem.vue';
import { useTvShowStore } from '@/stores/tvShow';
//Package to clean v-html content, to prevent XSS attacks
import DOMPurify from 'isomorphic-dompurify';

const tvShowStore = useTvShowStore();

const defaultName = 'The powerpuff Girls';

tvShowStore.setName(defaultName);
tvShowStore.syncTvShowData();
</script>

<template>
  <div class="container">
    <div v-if="tvShowStore.tvShowData" class="flex gap-10 max-lg:flex-col">
      <a
        :href="tvShowStore.tvShowData.url"
        class="relative h-fit min-w-64 max-w-96 max-lg:mx-auto lg:max-w-60"
      >
        <div
          class="lef-0 absolute top-0 z-1 h-full w-full opacity-30 duration-300 ease-in-out hover:rounded hover:bg-black"
        ></div>
        <img class="w-full" :src="tvShowStore.tvShowData.image.original" alt="tvShowImage" />
      </a>
      <div class="flex flex-col gap-4">
        <h2 class="text-3xl font-bold">{{ tvShowStore.tvShowData.name }}</h2>
        <div v-html="DOMPurify.sanitize(tvShowStore.tvShowData.summary)"></div>
        <div>
          <h2 class="text-xl font-bold">Episodes:</h2>
          <div
            class="mt-2 flex max-h-[90vh] snap-y snap-mandatory flex-col gap-2 overflow-y-auto pr-2 lg:max-h-[75vh]"
          >
            <template v-for="(episode, index) in tvShowStore.tvShowData.episodes" :key="index">
              <EpisodeListItem :data="episode" :index="index" />
            </template>
          </div>
        </div>
      </div>
    </div>
    <div v-else>It was not possible to obtain the tv show information</div>
  </div>
</template>
