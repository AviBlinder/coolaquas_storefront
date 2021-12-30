<template>
  <div class="px-4 sm:px-0">
    <!-- Cart -->
    <!-- :open="productAdded" -->
    <Popover class="ml-4 flow-root text-sm lg:mr-4"
    >
      <PopoverButton
        :disabled="disableCart"
        class="group -m-2 p-2 flex flex-row items-center"
      >
      <!-- text-gray-400 -->
        <ShoppingBagIcon
          class="flex-shrink-0 h-6 w-6  group-hover:text-secondary-600
          text-gray-400
          "
          aria-hidden="true"
        />
        <span
          class="ml-2 text-sm font-medium text-gray-700 group-hover:text-secondary-800"
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
        <PopoverPanel
          v-slot="{  close }"
          class="absolute z-10 inset-x-0 w-screen max-w-md px-4 mt-3 
          bg-white shadow-lg border-gray-300 rounded-md 
          transform -translate-x-3/4 sm:mr-8 sm:px-1 pb-2 lg:max-w-xl"
        >
          <h2 class="sr-only">Shopping Cart</h2>

          <form class="max-w-xl mx-auto px-4">
            <ul role="list" class="divide-y divide-gray-200">
              <li
                v-for="(product, productIdx) in cartItems"
                :key="product.id"
                class="py-6 flex  items-center "
              >
                <!-- justify-evenly -->
                <div class="grid grid-cols-12">
                  <div class="lg:ml-4 col-span-3">
                    <div class="flex justify-start">
                    <img
                      class="sm:w-16 sm:h-16 
                       md:w-24 md:h-24
                       rounded-md border border-gray-200"
                      :src="product.imageSrc"
                      :alt="product.imageAlt"
                    />
                      </div>
                  </div>
                  <div class="ml-4 col-span-3 flex items-center">
                    <h3 class="font-medium text-gray-900">
                      {{ product.name }}
                    </h3>
                  </div>
                  <div class="ml-4 col-span-2 flex items-center justify-end">
                    <h3 class="font-medium text-gray-900">
                      {{currencySign}} {{ product.price }} 
                    </h3>
                  </div>

                  <div class="flex col-span-2 items-center justify-end ">
                    <div class="block "> 
                    <div class="flex align-middle justify-center">
                      <PlusIcon
                        @click="
                          modifyQuantityWrapper({
                            id: product.id,
                            quantity: product.quantity,
                            sign: '+',
                          })
                        "
                        class="flex-shrink-0 h-3 w-3 text-gray-400"
                      >
                      </PlusIcon>
                    </div>
                    <div class="my-2">
                      <p class="text-sm">
                        <span
                          class="sr-only"
                          :id="`quantity-${productIdx}`"
                        ></span>
                        {{ product.quantity }}
                      </p>
                    </div>
                    <div class="flex align-middle justify-center">
                      <MinusIcon
                        @click="
                          modifyQuantityWrapper({
                            id: product.id,
                            quantity: product.quantity,
                            sign: '-',
                          })
                        "
                        class="flex-shrink-0 h-3 w-3 text-gray-400"
                      >
                      </MinusIcon>
                    </div>
                    </div>
                  </div>
                  <!-- <router-link :to="product.slug"> Go </router-link> -->
                </div>
              </li>
            </ul>

            <div class="my-6">
              <p>
                Total: {{currencySign}} {{ totalAmountInCart }} 
                <span v-if="totalAmountInCart > 0">{{currencySign}}</span>
              </p>
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
              <router-link @click="accept(close)" :to="{name: 'Checkout'}">
                Checkout
              </router-link>
            </button>

            <p class="mt-6 text-center">
              <router-link
                @click="accept(close)"
                :to="{name: 'Cart'}"
                class="text-sm font-medium text-amber-600 hover:text-amber-500"
                >View Shopping Bag</router-link
              >
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
  import { computed, watch, ref, inject } from 'vue';
  import { useStore } from 'vuex';
  import { useRoute } from 'vue-router';

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
      const route = useRoute();
      const eventBus = inject('eventBus');
      const productAdded = ref(false)
      
      const {
        taxesAndShippingDisclaimer,
        totalAmountInCart,
        modifyQuantity,
        cartItems,
        currencySign,
      } = useCheckout();
      
// cartUpdate event listener
eventBus.on('cartUpdate', () => {
  console.log("cart updated")
  productAdded.value=true
})

      const disableCart = ref(false);
      watch(
        () => route.fullPath,
        async (newValue) => {
          if (newValue.includes('/checkout') || newValue.includes('/cart')) {
            disableCart.value = true;
          } else {
            disableCart.value = false;
          }
        }
      );

      const modifyQuantityWrapper = (e) => {
        if (e.sign === '+') {
          Number((e.quantity += 1));
        } else {
          if (e.quantity > 1) {
            Number((e.quantity -= 1));
          } else {
            e.quantity = 1;
          }
        }
        modifyQuantity({ id: e.id, quantity: e.quantity });
      };

      const store = useStore();
      const cartQuantity = computed(() => store.getters['cart/cartQuantity']);

      return {
        taxesAndShippingDisclaimer,
        totalAmountInCart,
        cartItems,
        cartQuantity,
        disableCart,
        currencySign,
        modifyQuantityWrapper,
        productAdded,
        accept: async (close) => {
          productAdded.value = false
          close();
        },
      };
    },
  };
</script>
