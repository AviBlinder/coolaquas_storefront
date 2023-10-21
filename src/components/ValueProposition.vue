<template>
  <div class="w-scree bg-bluegray-300" v-if="!isLoading">
    <div
      v-if="
        generalSettings.ValueProposition && generalSettings.freeShippingAmount
      "
      class="flex h-8 items-center justify-center"
    >
      <div class="flex">
        <p class="font-light text-sm">
          {{ generalSettings.ValueProposition }}
          {{ generalSettings.freeShippingAmount }}
          <span>{{ generalSettings.currency }}</span>
        </p>
      </div>
    </div>
  </div>
  <div v-else class="hidden"></div>
</template>

<script>
  import { ref, inject } from 'vue';
  import { useStore } from 'vuex';
  export default {
    setup() {
      const slug = 'generalsettings';
      const store = useStore();
      const isLoading = ref(false);
      const storyapi = inject('storyapi');

      const getGeneralSettings = async (slug, version) => {
        try {
          let fetchSettings = ref({});
          isLoading.value = true;
          const fetch = await storyapi.get(`cdn/stories/`, {
            version,
            starts_with: slug,
          });
          fetchSettings.value = await fetch.data;
          isLoading.value = false;
          store.dispatch(
            'general/setFreeShippingAmount',
            fetchSettings.value.stories[0].content.freeShippingAmount
          );
          store.dispatch(
            'general/setCurrency',
            fetchSettings.value.stories[0].content.currency
          );
          store.dispatch(
            'general/setCurrencySign',
            fetchSettings.value.stories[0].content.currencySign
          );
          return fetchSettings.value;
        } catch (e) {
          console.log('error : ', e);
        }
      };
      // storyblok editor event listener
      //init done on App.vue
      window.storyblok.init({
        accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
      });

      window.storyblok.on('change', () => {
        getGeneralSettings(slug, 'draft').then((res) => {
          generalSettings.value = res.stories[0].content;
        });
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          getGeneralSettings(slug, 'draft').then((res) => {
            generalSettings.value = res.stories[0].content;
          });
        } else {
          getGeneralSettings(slug, 'published').then((res) => {
            generalSettings.value = res.stories[0].content;
          });
        }
      });

      const generalSettings = ref({});
      getGeneralSettings(slug, 'published').then((res) => {
        generalSettings.value = res.stories[0].content;
      });

      return { slug, generalSettings, isLoading };
    },
  };
</script>

<style></style>
