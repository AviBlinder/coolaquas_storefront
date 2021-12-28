<template>
  <div class="bg-white">
    <!-- Background color split screen for large screens -->
    <div
      class="hidden lg:block absolute left-4 w-1/2 h-full bg-white"
      aria-hidden="true"
    />
    <div
      class="hidden lg:block absolute right-4 w-1/2 h-full bg-gray-500 rounded-md"
      aria-hidden="true"
    />

    <div
      class="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2 lg:pt-16"
    >
      <h1 class="sr-only">Checkout</h1>
      <section
        aria-labelledby="summary-heading"
        class="bg-gray-500 rounded-md text-secondary-400 py-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:bg-transparent lg:row-start-1 lg:col-start-2"
      >
        <div class="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
          <h2 id="summary-heading" class="sr-only">Order summary</h2>

          <dl>
            <dt class="text-sm font-medium">Amount due</dt>
            <dd class="mt-1 text-3xl font-extrabold text-white">
              {{ currencySign }}{{ finalCostAmount }}
            </dd>
          </dl>

          <ul
            role="list"
            class="text-sm font-medium divide-y divide-white divide-opacity-10"
          >
            <li
              v-for="product in cartItems"
              :key="product.id"
              class="flex items-start py-6 space-x-4"
            >
              <img
                :src="product.imageSrc"
                :alt="product.imageAlt"
                class="flex-none w-20 h-20 rounded-md object-center object-cover"
              />
              <div class="flex-auto space-y-1">
                <h3 class="text-white">{{ product.name }}</h3>
                <!-- <p>{{ product.color }}</p>
                <p>{{ product.size }}</p> -->
              </div>
              <p class="flex-none text-base font-medium text-white">
                {{ product.quantity }} X {{ currencySign }}{{ product.price }}
              </p>
            </li>
          </ul>

          <dl
            class="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6"
          >
            <div class="flex items-center justify-between">
              <dt>Subtotal</dt>
              <dd>{{ currencySign }}{{ totalAmountInCart }}</dd>
            </div>

            <div class="flex items-center justify-between">
              <dt>Shipping</dt>
              <dd>{{ currencySign }}{{ shippingCost }}</dd>
            </div>

            <div class="flex items-center justify-between">
              <dt>Taxes:</dt>
              <dd>{{ currencySign }} {{ taxCost }}</dd>
            </div>

            <div
              class="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6"
            >
              <dt class="text-base">Total</dt>
              <dd class="text-base">{{ currencySign }}{{ finalCostAmount }}</dd>
            </div>
          </dl>
        </div>
      </section>

      <section
        aria-labelledby="payment-and-shipping-heading"
        class="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
      >
        <h2 id="payment-and-shipping-heading" class="sr-only">
          Payment and shipping details
        </h2>
<!--  -->
        <!-- <button @click="CreateOrder('abc123456')"
        class="m-2 p-2 bg-secondary-500 rounded-full"
        >CreateOrder</button>
        <button @click="CreateUser"
        class="m-2 p-2 bg-secondary-500 rounded-full"
        >CreateUser</button> -->
<!--  -->

        <form @submit.prevent>
          <div class="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
            <div>
              <h3
                id="contact-info-heading"
                class="text-lg font-medium text-gray-900"
              >
                Contact information
              </h3>

              <!-- email field -->
              <EmailField 
              @update:modelValue="updateEmail" 
              v-model="email" />
            </div>

            <div class="mt-10">
              <h3 class="text-lg font-medium text-gray-900">
                Delivery details
              </h3>
              <!-- Shipping Method  -->
              <shipping-method> </shipping-method>
              <!--  -->
              <!-- Shipping Address -->
              <shipping-address @disablePayment="updateDisableStatus">
              </shipping-address>
            </div>

            <!-- Same as Shipping -->
            <div class="mt-10">
              <h3 class="text-lg font-medium text-gray-900">
                Billing information
              </h3>

              <div class="mt-6 flex items-center">
                <input
                  v-model="billingAsShipping"
                  id="same-as-shipping"
                  name="same-as-shipping"
                  type="checkbox"
                  checked
                  class="h-4 w-4 border-gray-300 rounded text-secondary-600 focus:ring-secondary-500"
                />
                <div class="ml-2">
                  <label
                    for="same-as-shipping"
                    class="text-sm font-medium text-gray-900"
                    >Same as shipping information</label
                  >
                </div>
              </div>

              <!-- <div v-if="!billingAsShipping"> -->
              <div>
                <billing-address
                  :sameAsShipping="billingAsShipping"
                ></billing-address>
              </div>
            </div>

            <div class="mt-10 flex justify-end pt-6">
              <!-- <button type="submit" class="bg-secondary-600 border border-transparent rounded-md shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-secondary-500">Pay now</button> -->
            </div>
          </div>
        </form>
        <div>
          <paypalButton
            v-show="!disablePaymentButton"
            :finalCost="finalCostAmount"
            @paymentProcess="postCheckout"
          >
          </paypalButton>
          <div
            v-if="postCheckoutMessage"
            class="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0 bg-green-400 rounded-lg"
          >
            <div class="block w-full">
              <p class="p-4 text-center text-2xl">{{ postCheckoutMessage }}</p>
              <p class="p-4 text-left italic text-xl">
                {{ postCheckoutMessage2 }}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex';

  import { ref, computed, inject } from 'vue';
  import paypalButton from '../components/PaypalButton/PaypalButton.vue';
  import shippingMethod from '../components/checkout/shippingMethod.vue';
  import shippingAddress from '../components/checkout/shippingAddress.vue';
  import billingAddress from '../components/checkout/billingAddress.vue';
  // Form fields
  import EmailField from '../components/formFields/EmailField.vue';
  // Amplify
  // import { DataStore } from '@aws-amplify/datastore';
  // import { Order } from './models';
  import { Auth } from 'aws-amplify';
  import { API } from 'aws-amplify';
  import { createOrder } from '@/graphql/mutations';
  import * as mutations from '@/graphql/mutations';


  export default {
    components: {
      paypalButton,
      shippingMethod,
      shippingAddress,
      billingAddress,
      // form fields
      EmailField,
    },
    setup() {
      const store = useStore();
      const disablePaymentButton = ref(true);

      const email = ref('');
      const billingAsShipping = ref(true);

      const currencySign = store.getters['general/getCurrencySign'];
      const totalAmountInCart = computed(
        () => store.getters['cart/totalAmountInCart']
      );
      const freeShippingAmount = store.getters['general/getFreeShippingAmount'];
      const cartShippingCost = computed(
        () => store.getters['cart/getShippingCost']
      );

      let cartItems = ref(store.getters['cart/cartItems']);

      const eventBus = inject('eventBus');
      eventBus.on('cartUpdate', () => {
        cartItems.value = store.getters['cart/cartItems'];
      });

      //shippingCost logic:
      //If amount of products > freeShippingAmount then shipping cost is 0,
      //  else shipping cost depends on shipping method (standard, express, etc)
      const shippingCost = computed(() => {
        {
          if (totalAmountInCart.value > freeShippingAmount) {
            return 0;
          } else {
            return cartShippingCost.value;
          }
        }
      });
      const taxCost = computed(() => {
        let tax = (totalAmountInCart.value + shippingCost.value) * 0.17;
        return +tax.toFixed(2);
      });
      const finalCostAmount = computed(() => {
        let finalCost =
          totalAmountInCart.value + shippingCost.value + taxCost.value;
          const finalCostValue = +finalCost.toFixed(2)
        return finalCostValue
      });
      const updateDisableStatus = (event) => {
        disablePaymentButton.value = event;
      };
      const findUser = async () => {
        let currentUser = {} 
        
        try{
          currentUser = await Auth.currentAuthenticatedUser();
          let currentSession = await Auth.currentSession()
          let currentUserInfo = await Auth.currentUserInfo()
          console.log('currentUser',currentUser)
          console.log('currentSession',currentSession)
          console.log('currentUserInfo',currentUserInfo)
        } catch (e) {
            console.log("error: ",e)

        }
        finally {
          if(currentUser.username === undefined){
            currentUser.username = ''
          }
        }        
          return currentUser
      }
      // Amplify API   
      const CreateUser = async () => {    
        const currentUser = await findUser()
        const loggedInUser =   store.getters['general/getLoggedInUser']
        try{
        const userDetails = {
          username: loggedInUser,
          owner: currentUser.username          
        }
        const newUser = await API.graphql({
          query: mutations.createUser,
          variables: { input: userDetails },
      })
      console.log('after mutation ', newUser);
      } catch (e) {
        console.log("createUser error : " + JSON.stringify(e) )
       }
      }

      const CreateOrder = async (paypalOrderId) => {
        const currentUser = await findUser()
        // const loggedInUser =   store.getters['general/getLoggedInUser']

        const order = store.getters['cart/getOrder']
        let payload = order
        payload.owner = currentUser.username          

        payload.paypalOrderId = paypalOrderId
        // const {amount, currency} = store.getters['cart/getOrderTotal']
        const amount = finalCostAmount.value
        const currency = store.getters['general/getCurrency']
        payload.total = {amount: amount,currency: currency}

        payload.products = []       
        const products = store.getters['cart/cartItems']

        products.map( product => {
          payload.products.push({
          productId: product.id, 
          price: product.price,
          name: product.name,
          currency:  product.currency ,
          quantity: product.quantity
          })
        })      
        try {
           await API.graphql({
            query: createOrder,
            variables: { input: payload },
          })
        } catch (err) {
          console.log('CreateOrder - error: ', err);
        }
      };
      //

      const postCheckoutMessage = ref('');
      const postCheckoutMessage2 = ref('');
      const postCheckout = async (event) => {
        // Set the orderId as the Paypal OrderId
        const payload = {}
        const paypalOrderId = event
        payload.property = 'paypalOrderId'
        payload.value = paypalOrderId
        await store.dispatch('cart/setOrderProperty',payload)

        postCheckoutMessage.value =
          store.getters['general/getafterSaleMessage'];
        postCheckoutMessage2.value = `Your orderId is ${event}`;

        // Amplify
        await CreateOrder(paypalOrderId)
      };

      const updateEmail = () => {
        store.dispatch('cart/setOrderEmail', email.value);
      };

      return {
        cartItems,
        priceByProduct: computed(() => store.getters['cart/priceByProduct']),
        // Trigger mutation directly
        updateEmail,
        billingAsShipping,
        totalAmountInCart,
        shippingCost,
        taxCost,
        finalCostAmount,
        currencySign,
        email,
        disablePaymentButton,
        updateDisableStatus,
        postCheckout,
        postCheckoutMessage,
        postCheckoutMessage2,
        CreateOrder,
        CreateUser        
      };
    },
  };
</script>
