<template>
  <div class="">
    <div>
      <component
        :blok="story.content"
        :is="story.content.component"
      ></component>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      const slug = 'landing_page';
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

    components: {},
    computed: {},
    methods: {
      getStory(slug, version) {
        this.storyapi
          .get('cdn/stories/' + slug, {
            version: version,
          })
          .then((response) => {
            this.story = response.data.story;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    data() {
      return {
        story: {
          content: {
            body: [],
          },
        },
      };
    },
  };
</script>
