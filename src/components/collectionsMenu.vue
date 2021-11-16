<template>
  <div class="flex justify-center ">
      <div
       v-for="collection in collections.stories" :key="collection.uuid">
        <button 
        class="p-2 m-2 bg-secondary-600 rounded"
        @click="$router.push({name:'collection',params:{collection: collection.slug}})">
        {{collection.name}}
        </button>
      </div>
  </div>
</template>

<script>
  import StoryblokClient from 'storyblok-js-client';
  let storyapi = new StoryblokClient({
    accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
  });
  export default {
    created() {
      window.storyblok.init({
        accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
      });
      window.storyblok.on('change', () => {
        this.getCollections(this.slug, 'draft');
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          this.getCollections(this.slug, 'draft');
        } else {
          this.getCollections(this.slug, 'published');
        }
      });
    },
    components: {},
    computed: {},
    methods: {

      getCollections(slug,version) {
        storyapi
          .get(`cdn/stories/`, {
            version,
            starts_with: slug,
          })
          .then((response) => {
            this.collections = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    data() {
      return {
        slug: 'collections/',
        collections: {
          content: {
            body: [],
          },
        },
      };
    },
  };
</script>