<template>
  <div class="bg-white">

    <div>
      <!-- Mobile filter dialog -->
      <!-- max-w-7xl -->
      <main class=" mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="products-heading" class="pt-6 pb-24 mx-4">
          <h2 id="products-heading" class="sr-only">Products</h2>
          <div
            class="grid sm-grid-cols-2 md:grid-cols-9 
          gap-x-3 gap-y-8"
          >
            <!-- Product grid -->
            <div
              class="
            relative
            grid gap-y-10 gap-x-2  
            md:col-span-3 md:gap-x-2
            sm:grid-2  sm:border-b-2
            max-w-4xl w-3/4 md:ml-6"
              v-for="product in products"
              :key="product.uuid">
              <div v-if="product.content.valueProposition"
                class="absolute flex w-9 h-9 top-2 right-2 bg-green-300 z-1 rounded-full 
                p-1 shadow-sm
                text-center text-xs  justify-center items-center
            "> {{ product.content.valueProposition }}
              </div>

              <router-link
                :to="{ name: 'product', params: { product: product.slug } }"
                class="group text-sm"
              >
                <div
                  class="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100 group-hover:opacity-80
                hover:border-gray-400	border-2 	
                "
                >
                  <img
                    :src="product.content.images[0].filename"
                    :alt="product.content.images[0].alt"
                    class="w-full h-full object-center object-cover"
                  />
                </div>
                <h3 class="mt-4 font-medium text-gray-900">
                  {{ product.name }}
                </h3>
                <p class="mt-2 font-medium text-gray-900">
                  {{ product.content.price }} {{ product.content.currency }}
                </p>
                <p>Size: {{ product.content.size }}</p>
              </router-link>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
  // import { ref } from 'vue';
  export default {
    created() {
      window.storyblok.init({
        accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
      });
      window.storyblok.on('change', () => {
        this.getProducts('draft');
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          this.getProducts('draft');
        } else {
          this.getProducts('published');
        }
      });
    },
    methods: {
      getProducts( version) {
        this.storyapi
          .get(
            'cdn/stories/?filter_query[featured][in]=true&starts_with=products',
            {version}
          )
          .then((response) => {
            console.log("featured: ",response)
            this.products = response.data.stories;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    data() {
      return {
        products: {},        
      };
    },
  }
</script>
