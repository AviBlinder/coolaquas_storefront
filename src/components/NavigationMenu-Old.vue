<template>
  <div class="bg-white mx-4">
    <!-- Mobile menu -->
    <TransitionRoot as="template" :show="open">
      <Dialog
        as="div"
        class="fixed inset-0 flex z-40 lg:hidden"
        @close="open = false"
      >
        <TransitionChild
          as="template"
          enter="transition-opacity ease-linear duration-300"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <DialogOverlay class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <div
            class="relative max-w-xs w-full bg-white shadow-xl pb-12 flex flex-col overflow-y-auto"
          >
            <div class="px-4 pt-5 pb-2 flex">
              <button
                type="button"
                class="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                @click="open = false"
              >
                <span class="sr-only">Close menu</span>
                <XIcon class="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div class="border-t border-gray-200 py-6 px-4 space-y-6">
              <router-link
                v-for="collection in collections.stories"
                @click="open = false"
                class="-m-2 p-2 block font-medium text-gray-900 border-l"
                :key="collection.uuid"
                :to="{
                  name: 'collection',
                  params: { collection: collection.slug },
                }"
              >
                {{ collection.name }}
              </router-link>
            </div>
          </div>
        </TransitionChild>
      </Dialog>
    </TransitionRoot>

    <header class="relative bg-white">
      <nav aria-label="Top" class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="border-b border-gray-200">
          <div class="h-16 flex items-center justify-between">
            <div class="flex-1 flex items-center lg:hidden">
              <button
                type="button"
                class="-ml-2 bg-white p-2 rounded-md text-gray-400"
                @click="open = true"
              >
                <span class="sr-only">Open menu</span>
                <MenuIcon class="h-6 w-6" aria-hidden="true" />
              </button>
              <div class="flex justify-center items-center mb-4 ml-2 w-full">
                <search></search>
              </div>
            </div>

            <!-- Logo -->
            <router-link to="/">
              <span class="sr-only">Coolaquas Logo</span>
              <img class="h-12" src="../assets/CoolAquasLogo.png" alt="" />
            </router-link>

            <!-- Flyout menus -->
            <!-- <div class="hidden lg:flex-1 lg:block lg:self-stretch z-40 lg:ml-4"> -->
            <div class="hidden lg:flex lg:flex-1 ml-4">
              <div v-if="isLoading"></div>
              <div v-else class="h-full flex space-x-8 items-center text-sm">
                <div
                  v-for="category in collections.stories"
                  :key="category.uuid"
                  class="inline-flex"
                >
                  <div class="relative flex">
                    <div id="collection-link">
                      <router-link
                        class="hover:underline"
                        :to="{
                          name: 'collection',
                          params: { collection: category.slug },
                        }"
                      >
                        {{ category.name }}
                      </router-link>
                    </div>
                  </div>
                </div>

                <div
                  id="pages-link"
                  class="lg:flex items-center justify-between sm:hidden"
                >
                  <div class="md:flex-1 mb-2 mx-6 h-1/5">
                    <search></search>
                  </div>
                  <div>
                    <router-link
                      v-for="page in navigation.pages"
                      :key="page.name"
                      :to="{ name: page.name }"
                      class="mx-2 flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {{ page.description }}
                    </router-link>
                  </div>

                  <!-- Account -->
                  <!-- <a href="#" class="p-2 text-gray-400 hover:text-gray-500 lg:ml-4">
                <span class="sr-only">Account</span>
                <UserIcon class="w-6 h-6" aria-hidden="true" />
              </a> -->

                  <!-- Cart -->
                  <div class="ml-4 lg:ml-6 sm:ml-2">
                    <div class="group -m-2 p-2 flex items-center">
                      <!-- {{cartOpen}} -->
                      <!-- <ShoppingBagIcon class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500" aria-hidden="true" /> -->
                      <Cart
                        class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
                      >
                      </Cart>
                    </div>
                  </div>
                  <!-- cart end -->
                </div>
                <!-- right sidebar end -->
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
  import { computed, ref, inject } from 'vue';

  import { useStore } from 'vuex';

  import search from './fields/search.vue';
  import {
    Dialog,
    DialogOverlay,
    TransitionChild,
    TransitionRoot,
  } from '@headlessui/vue';
  import { MenuIcon, XIcon } from '@heroicons/vue/outline';

  import Cart from './Cart.vue';

  export default {
    components: {
      Cart,
      Dialog,
      DialogOverlay,
      TransitionChild,
      TransitionRoot,
      MenuIcon,
      XIcon,
      search,
    },
    setup() {
      const navigation = {
        pages: [{ name: 'About', description: 'Company' }],
      };
      const store = useStore();

      const storyapi = inject('storyapi');

      const cartQuantity = computed(() => store.getters['cart/cartQuantity']);

      const open = ref(false);
      const slug = 'collections/';
      const isLoading = ref(false);

      //
      const getCollections = async (slug, version) => {
        try {
          let fetchCollections = ref({});
          isLoading.value = true;
          const fetch = await storyapi.get(`cdn/stories/`, {
            version,
            starts_with: slug,
          });
          fetchCollections.value = await fetch.data;
          isLoading.value = false;
          return fetchCollections.value;
        } catch (e) {
          console.log('error : ', e);
        }
      };

      // storyblok editor event listener
      //init done on App.vue
      window.storyblok.on('change', () => {
        getCollections(slug, 'draft');
      });
      window.storyblok.pingEditor(() => {
        if (window.storyblok.isInEditor()) {
          getCollections(slug, 'draft');
        } else {
          getCollections(slug, 'published');
        }
      });

      const collections = ref({});
      getCollections(slug, 'published').then((res) => {
        collections.value = res;
      });
      return {
        collections,
        isLoading,
        cartQuantity,
        navigation,
        open,
        slug,
      };
    },
  };
</script>

<style scoped>
  #collection-link a.router-link-exact-active,
  #pages-link a.router-link-exact-active {
    @apply bg-blue-100 rounded-md p-1;
  }
</style>
