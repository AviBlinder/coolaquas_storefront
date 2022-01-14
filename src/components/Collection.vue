<template>
  <div class="bg-white">

    <div>
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
              v-for="product in displayProducts"
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
                <div
                class="inline-block mx-1 border-gray-500"                
                v-for="(color,index) in product.content.color" :key="index">
               <CheckIcon v-if="color!=='white'"
               class="w-5 h-5"
               :style="{stroke:color}"></CheckIcon>              
               <CheckIcon v-else
               class="w-5 h-5"
               style="stroke:black"
               >
               </CheckIcon>
               <!-- style="stroke:black" -->
              <p>
                {{color}}
              </p>
                </div>
              </router-link>
            </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
  import {
      CheckIcon

    } from '@heroicons/vue/outline'

  import { ref } from 'vue';
  export default {
    components: {
      CheckIcon
    },
    setup() {
      const mobileMenuOpen = ref(false);
      const mobileFiltersOpen = ref(false);

      return {
        mobileMenuOpen,
        mobileFiltersOpen,
      };
    },
    props: {
      blok: {
        type: Object,
      },
      filterParams: {
        type: Array,
      },
      priceRange: {
        type: Array,
        default: function () {
        return [0,100]
        }
      },
      sortParams: {
        Type: Array,
      },
    },
    watch: {
      blok() {
        this.getProducts(this.blok.uuid, 'published');
      },
      filterParams() {
        this.displayProducts = this.sorted ? this.sortProducts(this.sortParams,this.filterByFeature()) : this.filterByFeature()
      },
     priceRange: {
      handler: function () {
        this.displayProducts = this.sorted ? this.sortProducts(this.sortParams,this.filterByPrice()) : this.filterByPrice()
        },
      deep: true
    },

      sortParams() {
        this.sorted = true
        this.displayProducts = this.sortProducts(this.sortParams,this.displayProducts)
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
      sortProducts(sortKey,payload){
      const sortKeys = sortKey.split('.')
      return [...payload].sort((a, b) => {
        if(sortKeys[1] === 'asc'){
          return a.content[sortKeys[0] ] > b.content[sortKeys[0]] ? 1 : -1
        } else {        
          return a.content[sortKeys[0] ] < b.content[sortKeys[0]] ? 1 : -1
        }
      })        
      },
      filterByPrice(){
            let filterResults = []
            // 
            this.filteredByFeature.map( (product ) => {
              if(product.content.price >= this.priceRange[0] && product.content.price <= this.priceRange[1])
              {
                filterResults.push(product)
              }
            })
            this.filteredByPrice = filterResults
            return filterResults 
      },
      filterByFeature() {
        const filters = this.filterParams.map( (p) => p.split('.'));
        //
        if (filters.length) {
          //
          // create Object of filter parameters
          //sample output format: {'size': [40,20]}
          let filtersObject = this.reduceFilters(filters)
          // let filterResults = this.products;
          let filterResults = []


          for (const [key, value] of Object.entries(filtersObject)) {
            value.map( val => {
              console.log(`key: ${key} val: ${value}`)
              this.filteredByPrice.map( (product ) => {
                  // if the product has the filtered value on 'key' property:
                  if (product.content[key] !== undefined && product.content[key].indexOf(val) !== -1 ){
                      filterResults.push(product)
                }
              })
            })
        }
          this.filteredByFeature = filterResults
          return filterResults
        } else {
          this.filteredByFeature = this.products
          return this.products
        }
      },
    
      reduceFilters(filters) {

        let reducedFilters = {};
        if (filters.length === 1) {
          reducedFilters[ filters[0][0] ] = [ filters[0][1] ]
        } else {
          filters.reduce((prev, curr, index) => {
            // Initial setup
            if (index === 1) {
              reducedFilters[prev[0]] = [prev[1]];
            }
            // If same key, push value to existing key
            if (Object.keys(reducedFilters).includes(curr[0])) {
              reducedFilters[curr[0]].push(curr[1]);
              return reducedFilters;
              //Different keys
            } else {
              reducedFilters[curr[0]] = [curr[1]];
              return reducedFilters;
            }
          });
        }
        return reducedFilters;
      },
      getProducts(slug, version) {
        this.storyapi
          .get(
            'cdn/stories/?filter_query[Collections][in_array]=' +
              slug +
              '&starts_with=products/',
            {
              version,
            }
          )
          .then((response) => {
            this.products = response.data.stories;
            this.filteredByPrice = this.products
            this.filteredByFeature = this.products
            this.displayProducts = this.products
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    data() {
      return {
        products: {},        
        displayProducts: {},
        filteredByPrice: {},
        filteredByFeature: {},
        sorted : false
      };
    },
  };
</script>