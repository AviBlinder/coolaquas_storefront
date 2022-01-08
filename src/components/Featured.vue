<template>
  <div class="bg-white">
    <div class="inset-0 mx-auto px-4 py-6 sm:px-6 lg:px-8">
      <div class="bg-gray-50 rounded-2xl px-6 py-16 sm:p-16">
        <div class="max-w-xl mx-auto lg:max-w-none">
          <div class="text-center">
          <h2 id="products-heading" class="sr-only">Products</h2>
          </div>
          <div v-if="loaded">
            <div class="flex justify-center items-center">
              <div
                class="text-2xl text-centered bg-secondary-200 rounded-full 
                px-4 py-4
                mb-6 md:px-60"
              >
                Featured Products
              </div>
            </div>
            <div
              class="grid sm-grid-cols-2 md:grid-cols-9 gap-x-3 gap-y-8 sm:ml-6 "
            >
              <!-- Product grid -->
              <div
                class="relative grid gap-y-10 gap-x-2 
                md:col-span-3 md:gap-x-2 sm:grid-2 sm:border-b-2 
                max-w-4xl w-3/4 sm:ml-6 md:ml-12 pb-3"
                v-for="product in products"
                :key="product.uuid"
              >
                <div
                  v-if="product.content.valueProposition"
                  class="absolute flex w-9 h-9 top-2 right-2 bg-green-300 z-1 rounded-full p-1 text-center text-xs justify-center items-center"
                >
                  {{ product.content.valueProposition }}
                </div>

                <router-link
                  :to="{ name: 'product', params: { product: product.slug } }"
                  class="group text-sm"
                >
                  <div
                    class="w-full aspect-w-1 aspect-h-1 rounded-lg overflow-hidden group-hover:opacity-80 hover:border-gray-400 border-2 shadow-lg bg-white"
                  >
                    <img
                      :src="product.content.images[0].filename"
                      :alt="product.content.images[0].alt"
                      class="w-full h-full object-center object-cover"
                    />
                  </div>
                  <div class="bg-green-100 mt-2 py-2">
                    <h3 class="mt-4 font-medium text-gray-900">
                      {{ product.name }}
                    </h3>
                    <p class="mt-2 font-medium text-gray-900">
                      {{ product.content.price }} {{ product.content.currency }}
                    </p>
                    <p>Size: {{ product.content.size }}</p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  // import { ref } from 'vue';
  import { ref, inject } from 'vue';

  export default {
    setup() {
      const storyapi = inject('storyapi');

      const getProducts = async (version) => {
        try {
          let fetchData = ref({});
          const fetch = await storyapi.get(
            'cdn/stories/?filter_query[featured][in]=true&starts_with=products',
            { version }
          );
          fetchData.value = fetch.data.stories;
          return fetchData.value;
          // return fetch
        } catch (e) {
          console.log('error : ', e);
        }
      };

      const products = ref({});
      const loaded = ref(false);
      getProducts().then((res) => {
        products.value = res;
        loaded.value = true;
      });

      return {
        products,
        loaded,
      };
    },
  };
</script>
