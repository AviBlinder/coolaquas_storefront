<template>
  <div class="bg-white">
    <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div class="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        <!-- Image gallery -->
        <TabGroup as="div" class="flex flex-col-reverse">
          <!-- Image selector -->
          <div class="hidden mt-6 w-full max-w-2xl mx-auto sm:block lg:max-w-none">
            <TabList class="grid grid-cols-4 gap-6">
              <Tab v-for="image in blokProp.images" :key="image.id" class="relative h-24 bg-white rounded-md flex items-center justify-center text-sm font-medium uppercase text-gray-900 cursor-pointer hover:bg-gray-50 focus:outline-none focus:ring focus:ring-offset-4 focus:ring-opacity-50" v-slot="{ selected }">
                <span class="sr-only">
                  {{ blokProp.name }}
                </span>
                <span class="absolute inset-0 rounded-md overflow-hidden">
                  <img :src="image.filename" alt="" class="w-full h-full object-center object-cover" />
                </span>
                <span :class="[selected ? 'ring-indigo-500' : 'ring-transparent', 'absolute inset-0 rounded-md ring-2 ring-offset-2 pointer-events-none']" aria-hidden="true" />
              </Tab>
            </TabList>
          </div>

          <TabPanels class="w-full aspect-w-1 aspect-h-1">
            <TabPanel v-for="image in blokProp.images" :key="image.id">
              <img :src="image.filename" :alt="image.alt" class="w-full h-full object-center object-cover sm:rounded-lg" />
            </TabPanel>
          </TabPanels>
        </TabGroup>

        <!-- Product info -->
        <div class="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">{{ blokProp.name }}</h1>

          <div class="mt-3">
            <h2 class="sr-only">Product information</h2>
            <div class="flex justify-center">
            <p class="text-3xl text-gray-900 p-2">{{ blokProp.price }}</p> <span class="text-3xl p-2">{{blokProp.currency}}</span>
            </div>
          </div>

          <div class="mt-6">
            <h3 class="sr-only">Description</h3>

            <div class="text-base text-gray-700 space-y-6 text-left" v-html="richTextContent" />
          </div>

          <form class="mt-6">
            <div class="mt-10 flex sm:flex-col1">
              <button type="button" 
              @click.prevent="addToCart( {blok:blokProp, route:$route.fullPath})"
              class="max-w-xs flex-1 bg-amber-600 border border-transparent rounded-md py-3 px-8 flex 
              items-center justify-center text-base font-medium text-white hover:bg-amber-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-300 
              sm:w-full">Add to Bag</button>

              <!-- <button
              type="button" class="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                <HeartIcon class="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                <span class="sr-only">Add to favorites</span>
              </button> -->
            </div>
          </form>

          <section aria-labelledby="details-heading" class="mt-12">
            <h2 id="details-heading" class="sr-only">Additional details</h2>

            <div class="border-t divide-y divide-gray-200">
              <Disclosure as="div"  v-slot="{ open }">
                <h3>
                  <DisclosureButton class="group relative w-full py-6 flex justify-between items-center text-left">
                    <span :class="[open ? 'text-indigo-600' : 'text-gray-900', 'text-md font-medium']">
                      Fearures
                    </span>
                    <span class="ml-6 flex items-center">
                      <PlusSmIcon v-if="!open" class="block h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                      <MinusSmIcon v-else class="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500" aria-hidden="true" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel as="div" class="pb-6 prose prose-sm">
                  <ul role="list">
                    <li class="text-left" v-for="item in blokProp.features" :key="item">{{ item.feature }}</li>
                  </ul>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/vue'
// import { StarIcon } from '@heroicons/vue/solid'
import {MinusSmIcon, PlusSmIcon } from '@heroicons/vue/outline'

const product = {
  rating: 5,
  colors: [
    { name: 'Washed Black', bgColor: 'bg-gray-700', selectedColor: 'ring-gray-700' },
    { name: 'White', bgColor: 'bg-white', selectedColor: 'ring-gray-400' },
    { name: 'Washed Gray', bgColor: 'bg-gray-500', selectedColor: 'ring-gray-500' },
  ],
  details: [
    {
      name: 'Features',
      items: [
        'Multiple strap configurations',
        'Spacious interior with top zip',
        'Leather handle and tabs',
        'Interior dividers',
        'Stainless strap loops',
        'Double stitched construction',
        'Water-resistant',
      ],
    },
  ],
}

import {useStore} from 'vuex';
import { ref, reactive , inject} from 'vue'

export default {
    props: {
      blok: {
        Type: Object,
      },
    },
    computed: {
      richTextContent() {
        return this.storyapi.richTextResolver.render(this.blok.description);
      },
    },

  components: {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
    // HeartIcon,
    MinusSmIcon,
    PlusSmIcon,
    // StarIcon,
  },
  setup(props) {
    const selectedColor = ref(product.colors[0])
    const store = useStore()
    const eventBus = inject('eventBus');
    
    const blokProp = reactive(props.blok);

    const addToCart =  (payload) => {
      store.dispatch('cart/addToCart',payload)
      eventBus.emit('cartUpdate');
    } 


    return {
      blokProp,
      product,
      selectedColor,
      addToCart
    }
  },
}
</script>