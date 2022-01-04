    <template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:pb-24 lg:px-8">
        <div class="flex justify-center items-center bg-secondary-100 p-3 rounded-full">
        <div class="max-w-xl">
           <h1 class="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">Orders History</h1>
        </div>
      </div>

      <div class="mt-16">
        <h2 class="sr-only">Recent orders</h2>
        <div class="space-y-20">
          <div v-for="order in Orders.items" :key="order.id">
            <h3 class="sr-only">
              Order placed on <time :datetime="formatDateTime(order.createdAt)">
                {{formatDateTime(order.createdAt)}}</time>
            </h3>

            <div class="bg-gray-50 rounded-lg py-6 px-4 sm:px-6 sm:flex sm:items-center
             sm:justify-between sm:space-x-6 lg:space-x-8">
              <dl class="divide-y divide-gray-200 space-y-6 text-sm text-gray-600 
              flex-auto sm:divide-y-0 
              sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-x-6 
              lg:w-4/5 lg:flex lg:justify-evenly lg:gap-x-8">
                <div class="flex justify-between sm:block">
                  <dt class="font-medium text-gray-900 underline">Date placed</dt>
                  <dd class="sm:mt-1">
                    <time :datetime="formatDateTime(order.createdAt)">{{ formatDateTime(order.createdAt) }}</time>
                  </dd>
                </div>
                <!--  -->
                <div class="flex justify-between pt-6 sm:block sm:pt-0">
                  <dt class="font-medium text-gray-900 underline">Status</dt>
                  <dd class="sm:mt-1">
                    {{order.status}}
                  </dd>
                </div>
                <!--  -->
                <div class="flex justify-between pt-6 sm:block sm:pt-0">
                  <dt class="font-medium text-gray-900 underline">Order number</dt>
                  <dd class="sm:mt-1">
                    {{ order.paypalOrderId }}
                  </dd>
                </div>
                
                <div class="flex justify-between pt-6 font-medium text-gray-900 sm:block sm:pt-0">
                  <dt class="underline">Total amount</dt>
                  <dd class="sm:mt-1">
                    {{ order.total.amount }} {{order.total.currency}}
                  </dd>
                </div>
                <div class="flex justify-between pt-6 sm:block sm:pt-0">
                  <dt class="font-medium text-gray-900 underline">Shipping Method</dt>
                  <dd class="sm:mt-1">
                    {{ order.shippingType }}
                  </dd>
                </div>

              </dl>
           </div>
            <table class="mt-4 w-full text-gray-500 sm:mt-6">
              <caption class="sr-only">
                Products
              </caption>
              <thead class="sr-only text-sm text-gray-500 text-left sm:not-sr-only">
                <tr>
                  <th scope="col" class="sm:w-2/5 lg:w-1/4 py-3 font-normal">
                  <div class=" ml-12">
                  Product
                  </div>
                  </th>
                  <th scope="col" class="hidden w-2/5  py-3 font-normal sm:table-cell">
                  <div class="flex justify-center mr-8">
                  Price
                  </div>
                  </th>
                  <th scope="col" class="hidden w-2/5  py-3 font-normal sm:table-cell">
                  <div class="flex justify-center mr-8">
                  Quantity
                  </div>
                  </th>
                  <th scope="col" class="w-0 py-3 font-normal text-right">
                    <div class="mr-6">
                    Info
                    </div>
                    </th>
                </tr>
              </thead>
              <tbody class="border-b border-gray-200 divide-y divide-gray-200 text-sm sm:border-t">
                <tr v-for="product in order.products" :key="product.id">
                  <td class="py-6">
                    <div class="flex items-center">
                      <img :src="product.image" :alt="product.name" class="w-16 h-16 object-center object-cover rounded mr-6" />
                      <div>
                        <div class="font-medium text-gray-900">{{ product.name }}</div>
                        <div class="mt-1 sm:hidden">{{ product.price }} {{order.total.currency}} X {{ product.quantity }}</div>
                      </div>
                    </div>
                  </td>
                  <td class="hidden py-6 pr-8 sm:table-cell">
                    {{ product.price }} {{order.total.currency}}
                  </td>
                  <td class="hidden py-6 pr-8 sm:table-cell">
                     {{ product.quantity }}
                  </td>
                  <td class="py-6 font-medium text-right whitespace-nowrap">
                    
                    <router-link :to="product.slug" class="text-secondary-600"
                      >View<span class="hidden lg:inline"> Product</span><span class="sr-only">, {{ product.name }}</span>
                    </router-link>


                  </td>
                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { API } from 'aws-amplify';
import * as queries from '@/graphql/queries';
import {ref, computed} from 'vue';
import {useStore} from 'vuex';
import moment from 'moment'

export default {
  
  setup() {
  const store = useStore()
  const getOrders = async ()=> {
    // Get User details
    const ownerId = computed( () => store.getters['general/getDynamoDbUserId'])
    // console.log("ownerId: ",ownerId.value)

    const userData = await API.graphql({
      query: queries.byOwner,
      variables: { 
        owner:  ownerId.value,
        sortDirection: "DESC"
        },
      
    });
    // console.log('userData = ',userData.data.byOwner)
    return userData.data.byOwner
  }

      let Orders = ref({});
      getOrders().then(
        res => Orders.value = res
      )

    const formatDateTime =  function(value) {
    if (value) {
      return moment(String(value)).format('MMMM Do YYYY')
      // return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
}

    return {
      Orders,
      getOrders,
      formatDateTime
    }
  },
}
</script>