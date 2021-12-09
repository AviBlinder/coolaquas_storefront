<template>
  <Disclosure as="header" class="bg-white shadow" v-slot="{ open }">
    <div
      class="max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8"
    >
      <!-- First Row Menu: -->
      <div class="relative h-16 flex justify-between">
        <!-- Left side Logo -->
        <div class="relative z-10 px-2 flex lg:px-0">
          <div class="flex-shrink-0 flex items-center">
            <img
              class="block h-12 w-auto"
              src="../assets/CoolAquasLogo.png"
              alt="Coolaquas"
            />
          </div>
        </div>
        <!-- Search Bar sm:absolute + inset-0 -->
        <div
          class="relative z-10 flex-1 px-2 flex items-center justify-center sm:absolute sm:inset-0"
        >
          <div class="w-full sm:max-w-xs">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center"
              >
                <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <search></search>
            </div>
          </div>
        </div>
        <!-- Hamburger menu sm + md -->
        <div class="relative z-10 flex items-center lg:hidden">
          <div class="flex justify-between">
            <div class="relative z-10 flex items-center lg:hidden">
              <Cart></Cart>
            </div>
            <div>
              <!-- Mobile menu hamburger button -->
              <DisclosureButton
                class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                <span class="sr-only">Open menu</span>
                <MenuIcon
                  v-if="!open"
                  class="block h-6 w-6"
                  aria-hidden="true"
                />
                <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>
        <!-- lg screens: Cart + User Menu -->
        <div class="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center">
          <Cart></Cart>
          <!-- Profile dropdown -->
            <div v-if="userAuthenticated">
          <Menu as="div" class="flex-shrink-0 relative ml-4">
            <div>
              <MenuButton
                class="bg-white rounded-full flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Open user menu</span>
                <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
              </MenuButton>
            </div>
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <MenuItems
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none"
              >
                <MenuItem
                  v-for="item in userNavigation"
                  :key="item.name"
                  v-slot="{ active }"
                >
                  <a
                    :href="item.href"
                    :class="[
                      active ? 'bg-gray-100' : '',
                      'block py-2 px-4 text-sm text-gray-700',
                    ]"
                    >{{ item.name }}</a
                  >
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
          </div>
          <div v-else class="text-sm font-medium text-gray-800 border-l-2">
            <div class="ml-2">
            Sign In
            </div>
          </div>
        </div>
      </div>

      <!-- Second Row Menu -->
      <!-- sm/md: hidden - Categories -->
      <nav class="hidden lg:py-2 lg:flex lg:space-x-8" aria-label="Global">
        <a
          v-for="item in navigation"
          :key="item.name"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
        >
          {{ item.name }}
        </a>
      </nav>
    </div>

    <!-- lg: hidden - Categories -->
    <DisclosurePanel as="nav" class="lg:hidden" aria-label="Global">
      <div class="pt-2 pb-3 px-2 space-y-1">
        <DisclosureButton
          v-for="item in navigation"
          :key="item.name"
          as="a"
          :href="item.href"
          :class="[
            item.current
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-900 hover:bg-gray-50 hover:text-gray-900',
            'block rounded-md py-2 px-3 text-base font-medium',
          ]"
          :aria-current="item.current ? 'page' : undefined"
          >{{ item.name }}</DisclosureButton
        >
      </div>
      <div class="border-t border-gray-200 pt-4 pb-3">
        <div v-if="userAuthenticated">
        <div  class="px-4 flex items-center">
          <div class="flex-shrink-0">
            <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
          </div>
          <div class="ml-3">
            <div class="text-base font-medium text-gray-800">
             {{ user.name }}
            </div>
            <div class="text-sm font-medium text-gray-500">
              {{ user.email }}
            </div>
          </div>
        </div>
        <div class="mt-3 px-2 space-y-1">
          <DisclosureButton
            v-for="item in userNavigation"
            :key="item.name"
            as="a"
            :href="item.href"
            class="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
            >{{ item.name }}</DisclosureButton>
        </div>
        </div>
        <div v-else class="text-base font-medium text-gray-800">
            <p>Sign In</p>
        </div>
      </div>
    </DisclosurePanel>
  </Disclosure>
</template>
<script>
  import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
  } from '@headlessui/vue';
  // import { SearchIcon } from '@heroicons/vue/solid'
  import { MenuIcon, XIcon } from '@heroicons/vue/outline';

  import { computed, ref, inject } from 'vue';
  import { useStore } from 'vuex';
  import Cart from './Cart.vue';

  import search from '../components/fields/search.vue';

  const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  };
  const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
  ];
  const userNavigation = [
    { name: 'Sign out', href: '#' },
  ];

  export default {
    components: {
      Disclosure,
      DisclosureButton,
      DisclosurePanel,
      Menu,
      MenuButton,
      MenuItem,
      MenuItems,
      MenuIcon,
      // SearchIcon,
      XIcon,
      search,
      Cart,
    },
    setup() {
      // const navigation = {
      //   pages: [{ name: 'About', description: 'Company' }],
      // };
      const store = useStore();
      const storyapi = inject('storyapi');
      const cartQuantity = computed(() => store.getters['cart/cartQuantity']);
      const slug = 'collections/';
      const isLoading = ref(false);

      const userAuthenticated = ref(false)

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
        user,
        navigation,
        userNavigation,
        cartQuantity,
        collections,
        isLoading,
        cartState: (e) => console.log('inside cart ', e),
        userAuthenticated
      };
    },
  };
</script>
