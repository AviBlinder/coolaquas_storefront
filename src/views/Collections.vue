<template>
  <div>
    <h2>Collections</h2>

    <div>
      <button
        class="p-2 text-sm rounded m-2 bg-primary-500"
        @click="getProducts(collection.uuid)"
        v-for="collection in story.stories"
        :key="collection.name"
      >
        {{ collection.slug }}
      </button>
    </div>
    <component
        :blok="story.content.body"
        :is="story.content.component"
      ></component>

    <div class="flex flex-row justify-evenly" v-if="products.stories">
      <div  
      v-for="product in products.stories" :key="product.uuid">
        <div >
          {{ product.content.name }}
          <img 
          class="h-64"
          :src="product.content.images[0].filename" alt="" />

          <button
          class="p-2 m-2 bg-secondary-600 rounded"
           @click="$router.push(`/${product.full_slug}`)">Go!</button>
        </div>
      </div>
    </div>
    <div v-else>Select a collection</div>
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
        this.getStory(this.slug, 'draft');
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          this.getStory(this.slug, 'draft');
        } else {
          this.getStory(this.slug, 'published');
        }
      });
    },
    components: {},
    computed: {},
    methods: {
      getStory(slug, version) {
        storyapi
          .get(`cdn/stories/`, {
            version: version,
            starts_with: slug,
          })
          .then((response) => {
            this.story = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getProducts(collection) {
        // storyapi.get(`cdn/stories/?filter_query[price][gt_int]=25&starts_with=products/`,{
        storyapi
          .get(
            'cdn/stories/?filter_query[Collections][in_array]=' +
              collection +
              '&starts_with=products/',
            {
              version: 'published',
            }
          )
          .then((response) => {
            this.products = response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    data() {
      return {
        slug: 'collections/',
        story: {
          content: {
            body: [],
          },
        },
        products: {
          content: {
            body: [],
          },
        },
      };
    },
  };
</script>

<style></style>
