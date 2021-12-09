<template>
  <div class="w-scree bg-bluegray-300" v-if="!isLoading">
    <div class="flex h-8 items-center justify-center">
      <div class="flex" >        
        <p class="font-light text-sm ">
          {{generalSettings.ValueProposition}}
          <span>{{generalSettings.currency}}</span>
          </p>
      </div>
    </div>
  </div>
  <div v-else class="hidden"></div>
</template>

<script>
  import { ref, inject } from 'vue';
  // import { useStore } from 'vuex';
export default {
    setup(){
      const slug = 'generalsettings'
      // const store = useStore();
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
          return fetchSettings.value;
        } catch (e) {
          console.log('error : ', e);
        }
      };
      // storyblok editor event listener
      //init done on App.vue
      window.storyblok.on('change', () => {
        getGeneralSettings(slug, 'draft');
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          getGeneralSettings(slug, 'draft');
        } else {
          getGeneralSettings(slug, 'published');
        }
      });

      const generalSettings = ref({});
      getGeneralSettings(slug, 'published').then((res) => {
        generalSettings.value = res.stories[0].content;
      });

      return {slug, generalSettings,isLoading}
    }
}
</script>

<style>

</style>