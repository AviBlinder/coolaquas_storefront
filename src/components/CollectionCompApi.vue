<template>
  <div class="bg-white">
    <div>
      <main class=" mx-auto px-4 sm:px-6 lg:px-8">
        <section aria-labelledby="products-heading" class="pt-6 pb-24 mx-4">
          <h2 id="products-heading" class="sr-only">Products</h2>
          <div v-if="loaded">
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
              </router-link>
            </div>
          </div>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<script>
  import { ref, inject, watch,watchEffect ,onMounted} from 'vue';
  // import _ from 'lodash'
  export default {
    props: {
      blok: {
        type: String,
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
    setup(props) {
        console.log("props: ",props)
        watchEffect( () => {
          console.log("watchEffect props: ", props)
        })
        watch( 
          [props.blok, 
          props.filterParams.value,
          props.priceRange.value, // deep: true ??
          props.sortParams], 
        ( [blokNew, filterParamsNew, priceRangeNew,sortParamsNew],[blokOld, filterParamsOld, priceRangeOld,sortParamsOld]

        ) => {
              
         console.log("inside watch - ",blokNew, filterParamsNew, priceRangeNew,sortParamsNew )

         if(blokNew !== blokOld){
           console.log("new blok ",blokNew)
           getProducts(blokNew, 'published')
         }

        if(filterParamsNew !== filterParamsOld && filterParamsNew.length){
          console.log("new param ",filterParamsNew  )
          displayProducts.value = sorted.value ? sortProducts(sortParamsNew,filterByFeature(filterParamsNew)) : 
          filterByFeature(filterParamsNew)
        }

        let priceEqual = new Boolean
        if(priceRangeNew[0] === priceRangeOld[0] && priceRangeNew[1] === priceRangeOld[1]){
            console.log("priceQ: ",priceRangeNew[0], priceRangeOld[0])
            priceEqual = true
        } else {
          priceEqual = false
        }
        console.log("priceEqual: ",priceEqual)

        if(!priceEqual){
          console.log("new price ",priceRangeNew)
         displayProducts.value = sorted.value ? sortProducts(sortParamsNew,filterByPrice(priceRangeNew)) : 
          filterByPrice(priceRangeNew)
        }

        if(sortParamsNew !== sortParamsOld && sortParamsNew.length){
          console.log("new sort ",sortParamsNew)
          sorted.value = true
          displayProducts.value = sortProducts(sortParamsNew,displayProducts.value)
        }   
    },
    { deep: true }
    )

      const storyapi = inject('storyapi');

      const mobileMenuOpen = ref(false);
      const mobileFiltersOpen = ref(false);

      const products = ref({})
      const displayProducts = ref({})
      const filteredByPrice = ref({})
      const filteredByFeature = ref({})
      const sorted = ref(false)
      const loaded = ref(false)

      const getProducts = async (uuid,version) => {
        console.log("uuid: ",uuid)
         loaded.value = false
          const response = await storyapi
          .get(
            'cdn/stories/?filter_query[Collections][in_array]=' +
              uuid +
              '&starts_with=products/',
            {
              version,
            }
          )
            products.value = response.data.stories;
            filteredByPrice.value = products.value
            filteredByFeature.value = products.value
            displayProducts.value = products.value  
            loaded.value = true         
      }

      const sortProducts = (sortKey,payload) => {
      const sortKeys = sortKey.split('.')

      return [...payload].sort((a, b) => {
        if(sortKeys[1] === 'asc'){
          return a.content[sortKeys[0] ] > b.content[sortKeys[0]] ? 1 : -1
        } else {        
          return a.content[sortKeys[0] ] < b.content[sortKeys[0]] ? 1 : -1
        }
      })        
      }
      const filterByPrice = (priceRangeNew) => {
            let filterResults = new Array(0)
            // 
            filteredByFeature.value.map( (product ) => {
              if(product.content.price >= priceRangeNew[0] && 
                 product.content.price <= priceRangeNew[1])
              {
                filterResults.push(product)
              }
            })
            filteredByPrice.value = filterResults
            return filteredByPrice.value 
      }
      const filterByFeature = (filterParams) => {
        const filters = filterParams.map( (p) => p.split('.'));
        //
        if (filters.length) {
          //
          // create Object of filter parameters
          //sample output format: {'size': [40,20]}
          let filtersObject = this.reduceFilters(filters)

          let filterResults = new Array(0)
            console.log("filterResults length: ",filterResults.length + '>>>' + filterResults + '<<<')
            console.log("filterResults = ", filterResults)

          // @ts-ignore
          for (const [key, value] of Object.entries(filtersObject)) {
            value.map( val => {
              filteredByPrice.value.map( (product ) => {
                  // if the product has the filtered value on 'key' property:
                  if (product.content[key] !== undefined && 
                      product.content[key].indexOf(val) !== -1 
                      ){
                      filterResults.push(product)
                }
              })
            })
        }
          filteredByFeature.value = filterResults
          filterResults = new Array()
        } else {
          filteredByFeature.value = products.value 
        }
          return filteredByFeature.value
      }
    
      const reduceFilters = (filters) => {

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
      }
    
    onMounted( () => {
      console.log('onMounted getProducts')
      getProducts(props.blok,'published')

    })
      
      return {
        mobileMenuOpen,
        mobileFiltersOpen,
        getProducts,
        sortProducts,
        filterByPrice,
        filterByFeature,
        reduceFilters,
        products,
        displayProducts,
        filteredByPrice,
        filteredByFeature,
        sorted,
        loaded
      };
    },

  }
</script>
