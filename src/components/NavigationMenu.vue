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
            <DisclosureButton
            @click="$router.push({name:'Home'})"
            > 
            <img
              class="block h-12 w-auto"
              src="../assets/CoolAquasLogo.png"
              alt="Coolaquas"
            />
            </DisclosureButton>
          </div>
        </div>
        <!-- Search Bar sm:absolute + inset-0 -->
        <div
          class="relative z-10 flex-1 px-2 
          
          flex items-center justify-center sm:absolute sm:inset-0 lg:relative"
        >
          <div class="
          lg:w-3/5 
          sm:max-w-xs 
          lg:max-w-lg">
            <label for="search" class="sr-only">Search</label>
            <div class="relative">
              <div
                class="pointer-events-none absolute 
                inset-y-0 left-0 pl-3 flex items-center"
              >
                <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <search></search>
            </div>
          </div>
        </div>
        <!-- Cart + Hamburger menu sm + md -->
        <div class="relative z-10 flex items-center lg:hidden">
          <div class="flex justify-between">
            <div class="relative z-40 flex items-center lg:hidden">
              <Cart></Cart> 
            </div>
            <div class="ml-2 p-1 flex items-center  justify-center" >
              <!-- Mobile menu hamburger button -->
                 <!-- focus:outline-none focus:ring-2 focus:ring-secondary-500" -->
              <DisclosureButton
                class="rounded-md p-2 inline-flex items-center justify-center text-gray-400 
                hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 
                focus:ring-inset "
                    :class="[
                      open ? 'ring-secondary-500' : 'ring-transparent' ]"                
                >
                <span class="sr-only">Open menu</span>
                <MenuIcon
                  v-if="!open"
                  class="block h-6 w-6 "
                  aria-hidden="true"
                />
                <XIcon v-else class="block h-6 w-6 " aria-hidden="true" />
              </DisclosureButton>
            </div>
          </div>
        </div>
        <!-- lg screens: Cart + User Menu -->
        <div class="hidden lg:relative lg:z-40 lg:ml-4 lg:flex lg:items-center">
          <Cart></Cart>
          <!-- Profile dropdown -->
          <div v-if="loggedInUser">
          <!-- v-for="item in userNavigation" :key="item.name" 
          as="a" :href="item.href"  -->

<!--  -->

          <Menu as="div" class="flex-shrink-0 relative ml-4">
            <div>
              <!-- focus:ring-2 focus:ring-offset-2  -->
              <MenuButton class="bg-white rounded-full flex 
              focus:outline-none 
              focus:ring-secondary-500
              ">
                <span class="sr-only">Open user menu</span>
                <UserIcon class="h-6 w-6 text-secondary-600" aria-hidden="true" />
                <!-- <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" /> -->
              </MenuButton>
            </div>
            <transition 
            enter-active-class="transition ease-out duration-100" 
            enter-from-class="transform opacity-0 scale-95" 
            enter-to-class="transform opacity-100 scale-100" 
            leave-active-class="transition ease-in duration-75" 
            leave-from-class="transform opacity-100 scale-100" 
            leave-to-class="transform opacity-0 scale-95">

              <MenuItems 
              class="origin-top-right absolute 
              right-0 mt-2 w-56 rounded-md shadow-lg 
              focus:outline-none">
                <!-- <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                  <a :href="item.href" :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700']">{{ item.name }}</a>
                </MenuItem> -->

                <MenuItem 
                as="div"
                 v-slot="{ active }"
                :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700']"                
                class="mb-2 bg-white  hover:bg-gray-100 hover:cursor-pointer" 
                >
                 {{loggedInUser}}
                </MenuItem>
                <MenuItem 
                as="div"
                 v-slot="{ active }"
                class="mb-2 bg-white  hover:bg-gray-100 hover:cursor-pointer	"
                :class="[active ? 'bg-gray-100' : '', 'block py-2 px-4 text-sm text-gray-700']"                
                @click="signOutUser"
                >
                  Sign Out
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
         </div>
          <div v-else class="text-sm font-medium text-gray-800 border-l-2">
            <div class="flex justify-between ">
              <div class="mx-2">
              <router-link :to="{name: 'Signin'}">Login</router-link>
              </div>
              <div class="mx-2">
              <router-link :to="{name: 'Signup'}">Signup</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Second Row Menu -->
      <!-- sm/md: hidden - Categories -->
      <nav id="collections" class="hidden lg:pt-2 lg:flex lg:space-x-8" aria-label="Global">
              <router-link
                v-for="collection in collections.stories"
                @click="open = false"
                class="ml-3 p-2 block font-medium text-gray-900 hover:bg-gray-200 hover:rounded-md
                 "
                :key="collection.uuid"
                :to="{
                  name: 'collection',
                  params: { collection: collection.slug },
                }"
              >
                {{ collection.name }}
              </router-link>
      </nav>
    </div>

    <!-- lg: hidden - Categories -->
    <DisclosurePanel as="nav" class="lg:hidden" aria-label="Global">
      <div class="pt-2 pb-3 px-2 space-y-1">
         <DisclosureButton
                as="router-link"
                v-for="collection in collections.stories"
                @click="$router.push({name:'collection',params:{collection: collection.slug}})"
                class="ml-3 p-2 block font-medium text-gray-900 hover:bg-gray-200 hover:rounded-md
                hover:cursor-pointer
                "
                :key="collection.uuid"
              >
                {{ collection.name }}
          </DisclosureButton
        >
      </div>

      <!-- User Sub-menu -->
      <div class="border-t border-gray-200 pt-4 pb-3">
        <div class="">
          <div >
        <div v-if="loggedInUser">
          <div>
            {{loggedInUser}}
          </div>
         <div class="mt-3 px-2 space-y-1">
                 <DisclosureButton
                  @click="signOutUser">
                 Sign Out
                 </DisclosureButton>           
        </div>
        </div>
        <div v-else>
          <DisclosureButton
          as="router-link" 
                class="ml-3 p-2 block font-medium text-gray-900 hover:bg-gray-200 hover:rounded-md
                hover:cursor-pointer"
          >
              <router-link :to="{name: 'Signup'}">SignUp</router-link>
        </DisclosureButton>   
            <DisclosureButton
            as="router-link" 
                class="ml-3 p-2 block font-medium text-gray-900 hover:bg-gray-200 hover:rounded-md
                hover:cursor-pointer"
            >           
              <router-link class="ml-2" :to="{name: 'Signin'}">Login</router-link>
            </DisclosureButton>
          </div>
          </div>
        </div>
      </div>

      <!-- User Sub-menu end -->
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
  import { MenuIcon, XIcon, UserIcon, } from '@heroicons/vue/outline';

  import {ref, inject , computed} from 'vue';
  import {useStore} from 'vuex'
  import Cart from './Cart/Cart.vue';

  import search from './fields/search.vue';

  const SampleUser = {
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
    { name: 'Profile', href: '/Profile' },
    { name: 'Sign out', href: '/Signout' },
  ];

import useAuth from '@/composition/useAuth';
import router from '@/router';

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
      UserIcon,
      // SearchIcon,
      XIcon,
      search,
      Cart,
      // BellIcon      
    },
    setup() {
      // const navigation = {
      //   pages: [{ name: 'About', description: 'Company' }],
      // };
      
      // Auth
      const store = useStore()
      const loggedInUser =  computed( () => store.getters['general/getLoggedInUser'])
      const storyapi = inject('storyapi');
      
      
      const slug = 'collections/';
      const isLoading = ref(false);

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

      const {  signOut } = useAuth();

      const signOutUser = () => {
          signOut()
          router.push({name: 'Home'})      

      }

      return {
        loggedInUser,
        SampleUser,
        navigation,
        userNavigation,
        collections,
        isLoading,
        cartState: (e) => console.log('inside cart ', e),
        signOutUser
        };
    },
    // 
  };
</script>

<style scoped>
   #collections a.router-link-exact-active {
  @apply border-b-2 border-bluegray-400
  }

</style>