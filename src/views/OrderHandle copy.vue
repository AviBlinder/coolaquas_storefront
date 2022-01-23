<template>
  <div>
    <div class="bg-white">
      <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
        <div
          class="flex justify-center items-center bg-secondary-100 p-3 rounded-full"
        >
          <div class="max-w-xl">
            <h1
              class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
            >
              Order Details
            </h1>
          </div>
        </div>

        <!-- Update order's status -->
        <div class="flex justify-start">
          <button class="bg-blue-300 rounded-xl p-3 m-2">
            <router-link :to="{ name: 'OrdersHandle' }">
              Back to Orders List
            </router-link>
          </button>
        </div>

        <div v-if="orderLoaded">
          <!--  -->
          <div class="w-full px-2 py-16 sm:px-0">
            <TabGroup>
              <TabList class="flex p-1 space-x-1 bg-blue-900/20 rounded-xl">
                <Tab as="template" v-slot="{ selected }">
                  <button
                    :class="[
                      'tabButton',
                      selected ? 'tabSelected' : 'tabUnSelected ',
                    ]"
                  >
                    General Info
                  </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                  <button
                    :class="[
                      'tabButton',
                      selected ? 'tabSelected' : 'tabUnSelected ',
                    ]"
                  >
                    Shipping and Billing
                  </button>
                </Tab>
                <Tab as="template" v-slot="{ selected }">
                  <button
                    :class="[
                      'tabButton',
                      selected ? 'tabSelected' : 'tabUnSelected ',
                    ]"
                  >
                    Products
                  </button>
                </Tab>
              </TabList>

              <TabPanels class="mt-2">
                <TabPanel
                  :class="[
                    'bg-white rounded-xl p-3',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  ]"
                >
                  <div class="sm:flex">
                    <div class="flex">
                      <p>Paypal OrderId: {{ Order.paypalOrderId }}</p>
                      <p>Shipping Type: {{ Order.shippingType }}</p>
                      <p>
                        Shipping Cost: {{ Order.shippingCost }}
                        {{ Order.total.currency }}
                      </p>
                    </div>
                    <div class="flex">
                      <p>Order Date: {{ dateFormat(Order.createdAt) }}</p>
                    </div>
                    <div class="flex">
                      <p>Order Status: {{ orderStatus }}</p>
                      <button
                        @click="updateStatus"
                        class="mt-4 mx-2 flex align-middle justify-start text-sm font-medium text-gray-700 bg-green-400 rounded-xl p-2"
                      >
                        Update Order Status
                      </button>

                      <select
                        id="status"
                        name="status"
                        v-model="statusUpdated"
                        class="mt-1 block w-auto px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                      >
                        <option selected></option>
                        <option>NEW</option>
                        <option>SHIPPED</option>
                        <option>IN_PROGRESS</option>
                        <option>DELIVERED</option>
                      </select>
                      <div v-if="updateMessage" class="flex">{{updateMessage}}</div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel
                  :class="[
                    'bg-white rounded-xl p-3',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  ]"
                >
                  <!-- <p> Shipping Details :{{Order.shippingDetails}} </p> -->
                  <div class="flex justify-evenly">
                    <div class="justify-start">
                      <p class="underline p-2">Shipping Details</p>
                      <ul class="p-2 m-2">
                        <li>
                          Name: {{ Order.shippingDetails.firstName }}
                          {{ Order.shippingDetails.lastName }}
                        </li>
                        <li v-if="Order.shippingDetails.company">
                          Company: {{ Order.shippingDetails.company }}
                        </li>
                        <li>
                          Address: {{ Order.shippingDetails.address }}
                          <span v-if="Order.shippingDetails.address2"></span>
                        </li>
                        <li>
                          City & Country: {{ Order.shippingDetails.city }} /
                          {{ Order.shippingDetails.country }}
                        </li>
                        <li>Zip Code {{ Order.shippingDetails.postalCode }}</li>
                      </ul>
                    </div>
                    <div class="justify-end">
                      <p class="underline p-2">Billing Details</p>
                      <ul class="p-2 m-2">
                        <li>
                          Name: {{ Order.billingDetails.firstName }}
                          {{ Order.billingDetails.lastName }}
                        </li>
                        <li v-if="Order.billingDetails.company">
                          Company: {{ Order.billingDetails.company }}
                        </li>
                        <li>
                          Address: {{ Order.billingDetails.address }}
                          <span v-if="Order.billingDetails.address2"></span>
                        </li>
                        <li>
                          City & Country: {{ Order.billingDetails.city }} /
                          {{ Order.billingDetails.country }}
                        </li>
                        <li>Zip Code {{ Order.billingDetails.postalCode }}</li>
                      </ul>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel
                  :class="[
                    'bg-white rounded-xl p-3',
                    'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60',
                  ]"
                >
                  <table class="mt-4 w-full text-gray-500 sm:mt-6">
                    <caption class="sr-only">
                      Products
                    </caption>
                    <thead
                      class="sr-only text-sm text-gray-500 text-left sm:not-sr-only"
                    >
                      <tr>
                        <th
                          scope="col"
                          class="sm:w-2/5 lg:w-1/4 py-3 font-normal"
                        >
                          <div class="ml-12">Product</div>
                        </th>
                        <th
                          scope="col"
                          class="hidden w-2/5 py-3 font-normal sm:table-cell"
                        >
                          <div class="flex justify-center mr-8">Price</div>
                        </th>
                        <th
                          scope="col"
                          class="hidden w-2/5 py-3 font-normal sm:table-cell"
                        >
                          <div class="flex justify-center mr-8">Quantity</div>
                        </th>
                        <th scope="col" class="w-0 py-3 font-normal text-right">
                          <div class="mr-6">Info</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody
                      class="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t"
                    >
                      <tr v-for="product in Order.products" :key="product.id">
                        <td class="py-6">
                          <div class="flex items-center">
                            <img
                              :src="product.image"
                              :alt="product.name"
                              class="w-16 h-16 object-center object-cover rounded mr-6"
                            />
                            <div>
                              <div class="font-medium text-gray-900">
                                {{ product.name }}
                              </div>
                              <div class="mt-1 sm:hidden">
                                {{ product.price }} {{ Order.total.currency }} X
                                {{ product.quantity }}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td class="hidden py-6 pr-8 sm:table-cell">
                          {{ product.price }} {{ Order.total.currency }}
                        </td>
                        <td class="hidden py-6 pr-8 sm:table-cell">
                          {{ product.quantity }}
                        </td>
                        <td
                          class="py-6 font-medium text-right whitespace-nowrap"
                        ></td>
                      </tr>
                    </tbody>
                  </table>
                </TabPanel>
              </TabPanels>
            </TabGroup>
          </div>

          <!--  -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { useRoute } from 'vue-router';
  import { ref } from 'vue';
  import { API } from 'aws-amplify';
  import * as queries from '@/graphql/queries';
  import { updateOrder } from '@/graphql/mutations';

  import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue';

  export default {
    components: {
      TabGroup,
      TabList,
      Tab,
      TabPanels,
      TabPanel,
    },

    setup() {
      const route = useRoute();
      let orderLoaded = ref(false);

      const statusUpdated = ref('');
      const updateMessage = ref('');
      const orderStatus = ref('')

      const updateStatus = async () => {
        updateMessage.value = '';
        if (statusUpdated.value === '') {
          updateMessage.value = 'Please select a status to update';
        } else {
          updateMessage.value = ''
          const payload = {
            id: Order.value.id,
            status: statusUpdated.value,
            _version: Order.value._version 
          };
          try {
            await API.graphql({
              query: updateOrder,
              variables: { input: payload },
            }).then (res => {
              orderStatus.value = res.data.updateOrder.status
              statusUpdated.value = ''

            })
            updateMessage.value = 'Status Successfully updated ';
          } catch (e) {
            console.log('updateOrder error :', );
            updateMessage.value = e.errors[0].message;
          }

        }
      };
      const dateFormat = (date) => {
        return date.substring(0, 10) + ' ' + date.substring(11, 16);
      };

      const getOrder = async () => {
        orderLoaded.value = false;
        const orderData = await API.graphql({
          query: queries.getOrder,
          variables: {
            id: route.params.orderId,
          },
        });

        return orderData.data.getOrder;
      };

      let Order = ref({});
      getOrder().then((res) => {
        Order.value = res;
        orderStatus.value = Order.value.status
        orderLoaded.value = true;
      });

      return {
        orderLoaded,
        Order,
        dateFormat,
        statusUpdated,
        updateStatus,
        updateMessage,
        orderStatus
      };
    },
  };
</script>

<style scoped>
  .tabSelected {
    @apply bg-secondary-300 shadow;
  }
  .tabUnSelected {
    @apply bg-secondary-100 shadow;
  }

  .tabButton {
    @apply w-full py-2.5 text-sm leading-5 font-medium text-gray-700 rounded-lg  focus:outline-none focus:ring-2 ring-offset-2 ring-offset-gray-400 ring-white ring-opacity-60;
  }
</style>
