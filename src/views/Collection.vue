<template>
  <div>
<div>
    <!-- <p> {{collection.content.Description}}</p> -->
    <!-- <p>({{collection.uuid}})</p> -->
    <br>
    
      <component
        :blok="collection"
        :is="collection.content.component"
      ></component>
    </div>
  </div>
</template>

<script>
  import StoryblokClient from 'storyblok-js-client';

  let storyapi = new StoryblokClient({
    accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
  });

  export default {
        watch: {
      $route() {
        this.loadCollection()
      },
    },

    created() {
        this.loadCollection()
    },
    components: {},
    computed: {
    },
    methods: {
      loadCollection(){
      const slug = `collections/${this.$route.params.collection}`
      window.storyblok.init({
        accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
      });
      window.storyblok.on('change', () => {
        this.getStory(slug, 'draft');
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          this.getStory(slug, 'draft');
        } else {
          this.getStory(slug, 'published');
        }
      });
      },
      getStory(slug, version) {
         storyapi
          .get(`cdn/stories/${slug}`, {
            version: version,
          })
          .then((response) => {
            this.collection = response.data.story;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },

    data() {
      return {
        collection: {
          content: {
            body: [],
          },
        },
      };
    },
  };
</script>
