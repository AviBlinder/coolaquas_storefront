<template>
  <div class="m-4 p-4">
    <p class="text-2xl m-2 leading-relaxed font-semibold tracking-wide">{{ story.content.title }}</p>

    <div class="text-left m-4 p-3  font-extralight tracking-wider leading-7 text-gray-600" v-html="richTextContent"></div>
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
        this.storyWatch()
      },
    },
    created() {
          this.storyWatch()
    },

    components: {},

    computed: {
      richTextContent() {
        return storyapi.richTextResolver.render(this.story.content.policy);
      },
    },
    methods: {
      storyWatch() {
      window.storyblok.init({
        accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
      });
      window.storyblok.on('change', () => {
        this.getStory(this.$route.params.policy, 'draft');
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          this.getStory(this.$route.params.policy, 'draft');
        } else {
          this.getStory(this.$route.params.policy, 'published');
        }
      })
      },
      getStory(slug, version) {
        storyapi
          .get('cdn/stories' + this.$router.currentRoute._value.path, {
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
