<template>
  <div class="bg-white">
    <div
      class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8"
    >
      <div v-if="loaded">
        <h2 class="text-2xl font-semibold tracking-tight 
         text-secondary-600">
          Featured Products
        </h2>

        <div
          class="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 
          lg:grid-cols-4 xl:gap-x-8"
        >
          <div
            v-for="product in products"
            :key="product.uuid"
            class="group relative shadow-md p-2 border-gray-200"

          >
            <!--  -->
            <div
              v-if="product.content.valueProposition"
              class="absolute flex w-9 h-9 top-2 right-2 bg-green-300 z-1 rounded-full p-1 text-center text-xs justify-center items-center"
            >
              {{ product.content.valueProposition }}
            </div>
            <!--  -->
            <div
              class="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none"
            >
              <img
                :src="product.content.images[0].filename"
                :alt="product.content.images[0].alt"
                class="w-full h-full object-center object-cover lg:w-full lg:h-full"
              />
            </div>
            <div class="mt-4 flex justify-between">
              <div>
                <h3 class="text-sm text-secondary-700">
                  <router-link
                    :to="{ name: 'product', params: { product: product.slug } }"
                  >
                    <span aria-hidden="true" class="absolute inset-0" />
                    {{ product.name }}
                  </router-link>
                </h3>
                <p class="mt-1 text-sm text-gray-500">
                  Size: {{ product.content.size }} oz
                </p>
              </div>
              <p class="text-sm font-medium text-gray-900">
                {{currencySign}}{{ product.content.price }} 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, inject } from 'vue';
  import { useStore } from 'vuex';

  export default {
    setup() {
      const store = useStore();
      const storyapi = inject('storyapi');
      const currencySign = store.getters['general/getCurrencySign'];

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
        currencySign
      };
    },
  };
</script>
