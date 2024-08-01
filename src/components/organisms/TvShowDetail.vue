<script setup lang="ts">
import UpArrow from '@/components/atoms/icons/UpArrow.vue';
import EpisodeListItem from '@/components/molecules/EpisodeListItem.vue';
import NoResult from '@/components/atoms/NoResult.vue';
import { useRoute } from 'vue-router';
import { useTvShowStore } from '@/stores/tvShow';
import { onMounted, onBeforeUnmount, ref, watchEffect } from 'vue';
//Package to clean v-html content, to prevent XSS attacks
import DOMPurify from 'isomorphic-dompurify';

const tvShowStore = useTvShowStore();
const route = useRoute();

const defaultName = 'The powerpuff Girls';
const episodesListElement = ref<HTMLDivElement | null>(null);
const isListInView = ref(false);
const observerIsSet = ref(false);

let observer: IntersectionObserver;

onMounted(() => {
  //set tv show name, either by the param passed or by the default value
  tvShowStore.setName(route.params.showName ? (route.params.showName as string) : defaultName);
  tvShowStore.syncTvShowData();

  /**
   * Intersection Observer for arrow back to top,
   * to only be visible when episodes list is in view
   * */
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      isListInView.value = entry.isIntersecting;
    });
  });
  if (episodesListElement.value) {
    observer.observe(episodesListElement.value);
    observerIsSet.value = false;
  }
});

onBeforeUnmount(() => {
  observer.disconnect();
});

/**
 *  Check if observer was set or not, because
 *  episodesListElement only has value after
 *  render, that happens after the tv show data fetch
 * */
watchEffect(() => {
  if (!observerIsSet.value && tvShowStore.tvShowData && episodesListElement.value) {
    observer.observe(episodesListElement.value);
  }
});
</script>

<template>
  <div id="tvShowListContainer" class="container">
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
            ref="episodesListElement"
            class="mt-2 flex max-h-[90vh] snap-y snap-mandatory flex-col gap-2 overflow-y-auto pr-2 lg:max-h-[75vh]"
          >
            <template v-for="(episode, index) in tvShowStore.tvShowData.episodes" :key="index">
              <EpisodeListItem :data="episode" :index="index" />
            </template>
          </div>
        </div>
      </div>
      <a
        href="#tvShowListContainer"
        :class="[
          'fixed bottom-10 right-10 rounded-full bg-slate-100 bg-opacity-50 p-6 duration-300 ease-in-out hover:bg-opacity-85 lg:hidden',
          { hidden: !isListInView },
        ]"
      >
        <UpArrow />
      </a>
    </div>

    <NoResult v-else />
  </div>
</template>
