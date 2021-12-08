<template>
  <div class="">
    <simple-typeahead
      id="typeahead_id"
      placeholder="Search"
      :items="products"
      :minInputLength="2"
      :itemProjection="p => { return  p}"
      @selectItem="selectItemEventHandler"
    >
	<!-- <template #list-header>
		LIST HEADER
	</template> -->
	<template #list-item-text="slot">
    <!-- <span v-html="slot.boldMatchText(slot.itemProjection(slot.item))"></span> -->
    <span v-html="slot.itemProjection(slot.item)"></span>
  </template>
	<!-- <template #list-footer>
		LIST FOOTER
	</template> -->

</simple-typeahead>

  </div>

</template>
<script>
import SimpleTypeahead from '@/components/search/vue3-simple-typeahead';
import {computed , onMounted, inject} from 'vue'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'



export default {
components: {
  SimpleTypeahead
},
setup(){
    const store = useStore();
    const router = useRouter()
    const storyapi = inject('storyapi');

     onMounted(async () => {
      if(store.state.products.allProducts.length === 0){
        await storyapi
          .get('cdn/stories' + '?starts_with=products', {
            version: 'published',
          })
          .then((response) => {
            store.dispatch('products/setProducts',response.data.stories)
          })
          .catch((error) => {
            console.log(error);
          });
        }
  })


    const selectItemEventHandler = (event) => {
      // router.push(`/products/${event}`)
     router.push({name: 'product', params: {product: event}})      
  }

  return {
      selectItemEventHandler,
      products: computed(
          () => 
          {
            const products = store.getters['products/getAllProducts']   
            return products      
          })
      }
},
}
</script>