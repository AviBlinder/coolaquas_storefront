<template>
  <div class="px-4 sm:px-0 ">
    <!-- Cart -->
        <Popover class="ml-4 flow-root text-sm lg:mr-4 ">
          <PopoverButton 
          class="group -m-2 p-2 flex flex-row items-center">
            <ShoppingBagIcon
              class="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
              aria-hidden="true"
            />
            <span
              class="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800"
            >
             {{ cartQuantity }} 
            </span>
            <span class="sr-only">items in cart, view bag</span>
          </PopoverButton>
          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
          >
               <!-- bg-white inset-x-0 -->
              <!-- class="absolute top-16 mt-px pb-6 
              w-screen      
              sm:transform -translate-x-16
               shadow-lg sm:px-2 
              lg:top-full lg:left-auto lg:right-0 lg:mt-3 lg:-mr-1.5 
              lg:w-80 lg:rounded-lg lg:ring-1 
              lg:ring-black lg:ring-opacity-5" -->
         <PopoverPanel v-slot="{ close }"
         class="absolute z-10 inset-x-0 w-screen max-w-md px-4 mt-3 
         bg-white shadow-lg border-gray-300 rounded-md
         transform -translate-x-3/4 sm:mr-8 sm:px-1 pb-2 lg:max-w-3xl"
            >
              <h2 class="sr-only">Shopping Cart</h2>

              <form class="max-w-2xl mx-auto px-4">
                <ul role="list" class="divide-y divide-gray-200">
                  <li
                    v-for="product in cartItems"
                    :key="product.id"
                    class="py-6 flex items-center"
                  >
                      <div class="grid grid-cols-9">
                    <img
                      :src="product.imageSrc"
                      :alt="product.imageAlt"
                      class="flex-none col-span-3 w-16 h-16 rounded-md border border-gray-200"
                    />
                    <div class="ml-4 col-span-3">
                        <h3 class="font-medium text-gray-900 ">
                          {{ product.name }}
                        </h3>
                      </div>
                        <div class="block col-span-3">
                          <div class="flex align-middle justify-center" >
                            <PlusIcon
                              @click="
                                modifyQuantity({ id: product.id, quantity: product.quantity + 1 })
                              "
                              class="flex-shrink-0 h-3 w-3 text-gray-400"
                            >
                            </PlusIcon>
                          </div>
                          <div class="my-2">
                            <p class="text-sm">
                              {{ product.quantity }}
                            </p>
                          </div>
                          <div class="flex align-middle justify-center">
                            <MinusIcon
                              @click="
                                modifyQuantity({ id: product.id, quantity: product.quantity - 1 })
                              "
                              class="flex-shrink-0 h-3 w-3 text-gray-400"
                            >
                            </MinusIcon>
                          </div>
                        </div>
                        <!-- <router-link :to="product.slug"> Go </router-link> -->
                    </div>
                  </li>
                </ul>

                <div class="my-6">
                  <p>Total: {{ totalAmountInCart }} <span v-if="totalAmountInCart > 0">$</span></p>
                  <p
                    v-if="totalAmountInCart > 0"
                    class="text-xs mt-3 mb-1 text-left italic"
                  >
                    {{ taxesAndShippingDisclaimer }}
                  </p>
                </div>

                <button
                  type="submit"
                  class="w-full bg-amber-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-amber-500"
                >
                <router-link 
                @click="accept(close)"              
                to="/checkout">
                  Checkout
                </router-link>
                </button>

                <p class="mt-6 text-center">
                  <router-link
                    @click="accept(close)"
                    to="/cart"
                    class="text-sm font-medium text-amber-600 hover:text-amber-500"
                    >View Shopping Bag</router-link>
                </p>
              </form>
            </PopoverPanel>
          </transition>
        </Popover>
  </div>
</template>

<script>
  import { ShoppingBagIcon, PlusIcon, MinusIcon } from '@heroicons/vue/outline';
  import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue';
  import { computed } from 'vue';
  import { useStore } from 'vuex';

  import useCheckout from '@/composition/useCheckout';
  export default {
    components: {
      Popover,
      PopoverButton,
      PopoverPanel,
      ShoppingBagIcon,
      PlusIcon,
      MinusIcon,
    },

    setup() {
      const { taxesAndShippingDisclaimer, totalAmountInCart, modifyQuantity ,cartItems} = useCheckout();

      const store = useStore();
      const cartQuantity = computed( () => store.getters['cart/cartQuantity'])

      
      return {
        taxesAndShippingDisclaimer,
        totalAmountInCart,
        cartItems,
        cartQuantity,
        modifyQuantity,
        accept: async (close) => {
          close()
        },
      }
  }
  }
</script>
