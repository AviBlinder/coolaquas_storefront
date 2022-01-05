<template>
  <div class="bg-white">
    <main>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto pt-16">
          <h1 class="text-3xl font-bold tracking-wide	underline text-secondary-900">
            Shopping Cart
          </h1>
          <form class="mt-12">
            <section aria-labelledby="cart-heading">
              <h2 id="cart-heading" class="sr-only">
                Items in your shopping cart
              </h2>
              <ul
                role="list"
                class="border-t border-b border-gray-200 divide-y divide-gray-200"
              >
                <li
                  v-for="(product, productIdx) in cartItems"
                  :key="product.id"
                  class="flex py-6 sm:py-10"
                >
                  <div class="flex-shrink-0">
                    <router-link :to="product.slug">
                    <img
                      :src="product.imageSrc"
                      :alt="product.imageAlt"
                      class="w-24 h-24 rounded-lg object-center object-cover sm:w-32 sm:h-32"
                    />
                    </router-link>
                  </div>

                  <div
                    class="relative ml-4 flex-1 flex flex-col justify-between sm:ml-6"
                  >
                    <div>
                      <div class="flex justify-between sm:grid sm:grid-cols-2">
                        <div class="pr-6">
                          <h3 class="text-sm">
                            <router-link
                              :to="product.slug"
                              class="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {{ product.name }}
                            </router-link>
                          </h3>
                        </div>

                        <p class="text-sm font-medium text-gray-900 text-right">
                          {{ product.price }} $
                        </p>
                      </div>

                      <div
                        class="mt-4 flex items-center sm:block sm:absolute sm:top-0 sm:left-1/2 sm:mt-0"
                      >
                        <label :for="`quantity-${productIdx}`" class="sr-only"
                          >Quantity, {{ product.name }}</label
                        >
                        <input
                          :value="product.quantity"
                          @input="modifyQuantityWrapper"
                          :id="`quantity-${productIdx}`"
                          :name="`quantity-${productIdx}`"
                          :data-id="product.id"
                          class="block rounded-md border border-gray-300 py-1.5 text-base 
                          sm:w-24
                          leading-5 font-medium text-gray-700 shadow-sm 
                          focus:outline-none focus:ring-1 focus:ring-secondary-500 
                          focus:border-secondary-500 sm:text-sm text-center"
                          type="number"
                          min="1"
                        />
                        <!-- @change="updateQuantity"                    -->
                        <button
                          type="button"
                          @click="removeItem({ id: product.id })"
                          class="ml-4 text-sm font-medium text-secondary-600 hover:text-secondary-500 sm:ml-0 sm:mt-3"
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>

                    <p class="mt-4 flex text-sm text-gray-700 space-x-2">
                      <CheckIcon
                        v-if="product.inStock"
                        class="flex-shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                      <ClockIcon
                        v-else
                        class="flex-shrink-0 h-5 w-5 text-gray-300"
                        aria-hidden="true"
                      />
                      <span>{{
                        product.inStock
                          ? 'In stock'
                          : `Ships in ${product.leadTime}`
                      }}</span>
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <!-- Order summary -->
            <section
              aria-labelledby="summary-heading"
              class="mt-10 sm:ml-32 sm:pl-6"
            >
              <div class="bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8">
                <h2 id="summary-heading" class="sr-only">Order summary</h2>

                <div class="flow-root">
                  <dl class="-my-4 text-sm divide-y divide-gray-200">
                    <div class="py-4 flex items-center justify-between">
                      <dt class="text-gray-600">
                        Subtotal
                      </dt>
                      <dd class="font-medium text-gray-900">
                        {{ totalAmountInCart }} $
                      </dd>
                    </div>
                    <div class="py-4 flex items-center justify-between">
                      <dt class="text-sm italic font-medium text-gray-700">
                        * {{taxesAndShippingDisclaimer}}
                      </dt>
                      <dd class="hidden text-base font-medium text-gray-900">                       
                     </dd>
                    </div>

                  </dl>

                </div>
              </div>

              <div class="mt-10">                
                <button
                  type="button"
                  @click="$router.push({name: 'Checkout'})"                  
                  class="w-full bg-secondary-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-secondary-500"
                >
                  Checkout
                </button>
              </div>

              <div class="mt-6 text-sm text-center text-gray-500">
                <p>
                  or
                  <router-link
                    to="/"
                    class="text-secondary-600 font-medium hover:text-secondary-500"
                    >Continue Shopping<span aria-hidden="true"> &rarr;</span></router-link
                  >
                </p>
              </div>
            </section>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
  import {useStore} from 'vuex';
  
  import { computed} from 'vue';

  import { CheckIcon, ClockIcon } from '@heroicons/vue/solid';
  // @ts-ignore
  import useCheckout from '@/composition/useCheckout';

  export default {
    components: {
      CheckIcon,
      ClockIcon,
    },

    setup() {
      const store = useStore()

      const { taxesAndShippingDisclaimer, totalAmountInCart, cartItems, modifyQuantity, removeItem} = useCheckout();
      const modifyQuantityWrapper = (e) => {
        modifyQuantity({id:e.target.dataset.id,quantity: e.target.value})
      }

      return {
      taxesAndShippingDisclaimer,
      cartItems,
      priceByProduct :computed(() => store.getters['cart/priceByProduct']),
      totalAmountInCart,
      removeItem,
      modifyQuantityWrapper,
      };
    },
  };
</script>
