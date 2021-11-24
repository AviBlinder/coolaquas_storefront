<template>
  <div class="h-screen ">
    <simple-typeahead
	id="typeahead_id"
	placeholder="Search"
	:items="products"
  :minInputLength="2"
	:itemProjection="p => { return  p}"
	@selectItem="selectItemEventHandler"
	@onInput="onInputEventHandler"
	@onFocus="onFocusEventHandler"
	@onBlur="onBlurEventHandler"
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
import SimpleTypeahead from '@/components/vue3-simple-typeahead';
import {computed } from 'vue'
import { useStore } from 'vuex';
import router from "@/router";

export default {
components: {
  SimpleTypeahead
},
setup(){
    const store = useStore();

    // const itemProjection = ref([])

    const onInputEventHandler = () => {
      return false
      // console.log("onInputEventHandler ", event.input)
      // console.log("onInputEventHandler items", event.items)
    }

    const selectItemEventHandler = (event) => {
      router.push(`/products/${event}`)
  }

  const onFocusEventHandler = () => {
    return false
  }

  const onBlurEventHandler = () => {
      return false
  }

  return {
      // itemProjection,
      onInputEventHandler,
      selectItemEventHandler,
      onFocusEventHandler,
      onBlurEventHandler,
      products: computed(
          () => 
          {
            const products = store.getters['products/getAllProducts']   
            return products      
            // return products.map( p => p.name)
          })
      }
},
methods: {
}
}
</script>

<style>

</style>