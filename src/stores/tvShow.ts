import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { TTvShowResponse } from '@/types';

export const useTvShowStore = defineStore('tvShow', () => {
  const tvShowData = ref<TTvShowResponse>();
  const tvShowName = ref<string>('');

  function setName(name: string): void {
    if (name) {
      tvShowName.value = name;
    }
  }

  async function syncTvShowData(): Promise<void> {
    const baseUrl = 'https://api.tvmaze.com/';
    try {
      //fetch and set value for tvShow generic data
      const res = await fetch(`${baseUrl}singlesearch/shows?q=${tvShowName.value}`);
      tvShowData.value = await res.json();

      if (tvShowData.value && tvShowData.value.id) {
        //fetch and set value for tvShow episodes
        const episodesRes = await fetch(`${baseUrl}shows/${tvShowData.value.id}/episodes`);
        tvShowData.value.episodes = await episodesRes.json();
      }
    } catch (error) {
      return;
    }
  }

  return { tvShowData, tvShowName, syncTvShowData, setName };
});
