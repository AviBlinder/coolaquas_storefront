<template>
  <div class="bg-white">
    <div>
      <!-- Mobile filter dialog -->
      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <section aria-labelledby="products-heading" class="pt-6 pb-24 mx-4">
          <h2 id="products-heading" class="sr-only">Products</h2>

          <div class="grid grid-cols-1 lg:grid-cols-4 lg:col-start-2  gap-x-10 gap-y-8">
            <!-- Product grid -->
            <div class="grid grid-cols-1 gap-y-10 gap-x-3 sm:grid-cols-2 lg:col-span-3 lg:gap-x-8	
            ">
              <router-link :to="{name: 'product', params: {product:product.slug}}" v-for="product in products.stories" :key="product.uuid" 
              class="group text-sm">
                <div class="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 group-hover:opacity-80
                hover:border-gray-400	border-2 	
                ">
                  <img :src="product.content.images[0].filename" :alt="product.content.images[0].alt" 
                  class="w-full h-full object-center object-cover" />
                </div>
                <h3 class="mt-4 font-medium text-gray-900">
                  {{ product.name }}
                </h3>
                <p class="mt-2 font-medium text-gray-900">
                  {{ product.content.price }} {{product.content.currency}}
                </p>
              </router-link>
            </div>
          </div>
        </section>
      </main>

    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

  import StoryblokClient from 'storyblok-js-client';
  let storyapi = new StoryblokClient({
    accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
  });

export default {
  components: {
  },
  setup() {
    const mobileMenuOpen = ref(false)
    const mobileFiltersOpen = ref(false)

    return {
      mobileMenuOpen,
      mobileFiltersOpen,
    }
  },
    props: {
      blok: {
        Type: Object,
      },
    },
    watch: {
      blok() {
        this.getProducts(this.blok.uuid,'published');
      },
    },

    created() {
      window.storyblok.init({
        accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
      });
      window.storyblok.on('change', () => {
        this.getProducts(this.blok.uuid, 'draft');
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          this.getProducts(this.blok.uuid, 'draft');
        } else {
          this.getProducts(this.blok.uuid, 'published');
        }
      });
    },
    methods: {
      getProducts(slug,version) {
        storyapi
          .get(
            'cdn/stories/?filter_query[Collections][in_array]=' +
              slug +
              '&starts_with=products/',
            {
              version,
            }
          )
          .then((response) => {
            this.products = response.data
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    data() {
      return {
        products: {
        },
      };
    },  
}
</script>