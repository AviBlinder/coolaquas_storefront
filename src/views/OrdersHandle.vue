<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
      <div
        class="flex justify-center items-center bg-secondary-100 p-3 rounded-full"
      >
        <div class="max-w-xl">
          <h1
            class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl"
          >
            Orders
          </h1>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 md:grid-cols-3 md:gap-4 mt-4">
        <div class="my-2">
          <label
            for="status"
            class="flex align-middle justify-start text-sm font-medium text-gray-700"
            >Status</label
          >
          <select
            id="status"
            name="status"
            v-model="status"
            @blur="filterOrders('status')"
            class="mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm rounded-md"
          >
            <option selected></option>
            <option >NEW</option>
            <option>SHIPPED</option>
            <option>IN_PROGRESS</option>
            <option>DELIVERED</option>
          </select>
        </div>
        <div class="my-2">
          <label
            for="email"
            class="flex align-middle justify-start text-sm font-medium text-gray-700"
            >Email</label
          >
          <input
            type="text"
            class="rounded-md mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm "
            name="email"
            id="email"
            @blur="filterOrders('email')"
            v-model="email"
          />
        </div>
        <div class="my-2">
          <label
            for="creationDate"
            class="flex align-middle justify-start text-sm font-medium text-gray-700"
            >Order Date</label
          >
          <input
            type="text"
            class="rounded-md mt-1 block w-auto pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm "
            name="creationDate"
            id="creationDate"
            placeholder="YYYY-MM-DD (or part)"
            @blur="filterOrders('creationDate')"
            v-model="creationDate"
          />
        </div>
      </div>
      <div class="mt-16" v-if="ordersLoaded && Orders.items.length">
        <h2 class="sr-only">Recent orders</h2>
        <div class="space-y-20">
          <div
            v-for="(order, index) in Orders.items"
            :id="`order` + index"
            :key="order.id"
          >
            <h3 class="sr-only">
              Order placed on
              <time :datetime="formatDateTime(order.createdAt)">
                {{ formatDateTime(order.createdAt) }}</time
              >
            </h3>
            <div
              class="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8"
            ></div>
            <div
              class="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center sm:justify-between sm:space-x-6 lg:space-x-8"
            >
              <dl
                class="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 flex-auto sm:divide-y-0 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 lg:w-4/5 lg:flex lg:justify-evenly lg:gap-x-8"
              >
                <div class="mt-4">
                  <span>({{ index + 1 }})</span>
                </div>
                <div class="flex justify-between sm:block">
                  <dt class="font-medium text-gray-900 underline">
                    Date placed
                  </dt>
                  <dd class="sm:mt-1">
                    <time :datetime="formatDateTime(order.createdAt)">{{
                      formatDateTime(order.createdAt)
                    }}</time>
                  </dd>
                </div>
                <!--  -->
                <div class="flex justify-between pt-6 sm:block sm:pt-0">
                  <dt class="font-medium text-gray-900 underline">Status</dt>
                  <dd class="sm:mt-1 text-green-500">
                    {{ order.status }}
                  </dd>
                </div>
                <!--  -->
                <div class="flex justify-between pt-6 sm:block sm:pt-0">
                  <dt class="font-medium text-gray-900 underline">
                    Paypal Order #
                  </dt>
                  <dd class="sm:mt-1">
                    {{ order.paypalOrderId }}
                  </dd>
                </div>

                <div
                  class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0"
                >
                  <dt class="underline">Total amount</dt>
                  <dd class="sm:mt-1">
                    {{ order.total.amount }} {{ order.total.currency }}
                  </dd>
                </div>
                <div class="flex justify-between pt-6 sm:block sm:pt-0">
                  <dt class="font-medium text-gray-900 underline">
                    Shipping Method
                  </dt>
                  <dd class="sm:mt-1">
                    {{ order.shippingType }}
                    <span class="text-xs font-thin text-gray-600"
                      >({{ order.shippingCost }}
                      {{ order.total.currency }})</span
                    >
                  </dd>
                </div>
                <div class="flex justify-between pt-6 sm:block sm:pt-0">
                  <dt class="font-medium text-gray-900 underline">
                    Order Email
                  </dt>
                  <dd class="sm:mt-1">
                    {{ order.email }}
                  </dd>
                </div>
              </dl>
            </div>
            <table class="mt-4 w-full text-gray-500 sm:mt-6">
              <caption class="sr-only">
                Products
              </caption>
              <thead
                class="sr-only text-sm text-gray-500 text-left sm:not-sr-only"
              >
                <tr>
                  <th scope="col" class="sm:w-2/5 lg:w-1/4 py-3 font-normal">
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
                <tr v-for="product in order.products" :key="product.id">
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
                          {{ product.price }} {{ order.total.currency }} X
                          {{ product.quantity }}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="hidden py-6 pr-8 sm:table-cell">
                    {{ product.price }} {{ order.total.currency }}
                  </td>
                  <td class="hidden py-6 pr-8 sm:table-cell">
                    {{ product.quantity }}
                  </td>
                  <td class="py-6 font-medium text-right whitespace-nowrap">
                    <!--  :to="{ name: 'product', params: { product: product.slug } }"-->
                    <router-link
                      :to="{
                        name: 'OrderHandle',
                        params: { orderId: order.id },
                      }"
                      class="text-secondary-600"
                      >Edit<span class="hidden lg:inline"> Order</span
                      ><span class="sr-only">, {{ product.name }}</span>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No order to display</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { API } from 'aws-amplify';
  import * as queries from '@/graphql/queries';
  // import { updateOrder } from '@/graphql/mutations';

  import { ref } from 'vue';

  import moment from 'moment';

  export default {
    setup() {
      let status = ref('NEW');
      let email = ref('')
      let creationDate = ref('')

      let ordersLoaded = ref(false);

      // let filter = {
      //       or: [{ priority: {eq:1} },
      //            { priority: {eq:2} }]
      //   };
      const getOrders = async () => {
        let filter = {};
        if (status.value) {
          filter = Object.assign({}, { status: { eq: status.value } });
        }
        if(email.value) {
          filter = Object.assign({}, { email: { eq: email.value } });
        }
        if(creationDate.value) {
          filter = Object.assign({}, { createdAt: { contains: creationDate.value } });
        }

        console.log("filter = ",filter)
        const ordersData = await API.graphql({
          query: queries.listOrders,
          variables: {
            filter: filter,
            // {
            //   status: { eq: status.value },
            // },
          },
        });
        return ordersData.data.listOrders;
      };

      ordersLoaded.value = false;
      let Orders = ref({});
      getOrders().then((res) => {
        Orders.value = res;
        ordersLoaded.value = true;
      });

      const filterOrders = (filterField) => {
        switch (filterField){
        case 'status':
            email.value = ''
            creationDate.value = ''
            break
        case 'email':
          status.value = ''
          creationDate.value = ''
        break
        case 'creationDate':
          status.value = ''
          email.value = ''
        break
        }

        console.log("filterOrders")
        getOrders().then((res) => {
          Orders.value = res;
        });
      };

      const formatDateTime = function (value) {
        if (value) {
          return moment(String(value)).format('MMMM Do YYYY');
          // return moment(String(value)).format('MM/DD/YYYY hh:mm')
        }
      };

      const orderUpdate = async (id, event) => {
        console.log('id: ', id);
        console.log('event: ', event);
        const payload = {
          id: id,
          status: event.target.value,
        };
        try {
          console.log('payload: ', payload);
          // await API.graphql({
          //   query: updateOrder,
          //   variables: { input: payload },
          // });
        } catch (e) {
          console.log('updateOrder error :', e);
        }
      };

      return {
        Orders,
        status,
        email,
        creationDate,
        filterOrders,
        ordersLoaded,
        getOrders,
        orderUpdate,
        formatDateTime,
      };
    },
  };
</script>
