<template>
<!-- border-t border-gray-200 pt-10 -->
          <div class="mt-10 ">
            <h2 class="text-lg font-medium text-gray-900">Shipping information</h2>
            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <!-- First Name -->
              <FirstName
              @change='updateOrderShippingDetails'             
               v-model="firstName"/>

              <!-- Last Name -->
              <LastName 
              @change='updateOrderShippingDetails'             
               v-model="lastName"/>

            <!-- Company details -->
              <div class="sm:col-span-2">
                <CompanyName
                @change="updateOrderShippingDetails"
                v-model="company" />
              </div>
              <!-- Main address -->
              <div class="sm:col-span-2">
            <Address 
            v-model="address"
              @change="updateOrderShippingDetails"
            />
           </div>
              <!-- Additional Address details (optional) -->
              <div class="sm:col-span-2">
                <AdditionalAddress
                v-model="address2"
                @change="updateOrderShippingDetails"
                />
              </div>

              <!-- City -->
              <div>
                <City
                  v-model="city"
                  @change='updateOrderShippingDetails'
                  />
              </div>

              <!-- Postal Code -->
              <div>
                <PostalCode
                  v-model="postalCode"
                  @change='updateOrderShippingDetails'
                />
              </div>

              <!-- Country -->
              <div class="sm:col-span-2">
                <label for="country" class="block text-sm font-medium text-gray-700"></label>
                <div class="mt-1">
                  <select id="country" name="country" autocomplete="country-name"
                  placeholder="Country"
                  v-model="selected"
                  @change='updateOrderShippingDetails'
                  class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm">
                    <!-- <option data-code="US" value="United States">United States</option> -->
                    <option                     
                    v-for="country in countriesList" :key="country.name">{{country.name}}</option>
                  </select>
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="phone" class="block text-sm font-medium text-gray-700"></label>
                <div class="mt-1">
                  <input 
                  v-model="phone"
                  @change='updateOrderShippingDetails'
                  placeholder="Phone"
                  type="text" name="phone" id="phone" autocomplete="tel" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm" />
                </div>
              </div>
            </div>
          </div>

</template>

<script>// @ts-nocheck

import {ref, reactive, computed, toRefs} from 'vue'
import {useStore} from 'vuex';

// Form fields
import FirstName from '@/components/formFields/FirstName.vue'
import LastName from '@/components/formFields/LastName.vue'
import CompanyName from '@/components/formFields/CompanyName.vue'
import Address from '@/components/formFields/MainAddress.vue'
import AdditionalAddress from '@/components/formFields/AdditionalAddress.vue'
import City from '@/components/formFields/CityField.vue'
import PostalCode from '@/components/formFields/PostCode.vue'

export default {
  components: {
     FirstName,
     LastName,
     CompanyName,
     Address,
     AdditionalAddress,
     City,
    PostalCode     
  },
  setup() {
    const store = useStore()

    const selected = ref("Israel")

    const updateOrderShippingDetails =  () => {
      console.log("updateOrderShippingDetails  ", ShippingDetails)
      ShippingDetails.country = selected.value
      store.dispatch('cart/setOrderShippingDetails',ShippingDetails)
    }

    const ShippingDetails = reactive({
      firstName: '',
      lastName: '',
      company: '',
      address: '',
      address2: '',
      city: '',
      postalCode: '',
      country: selected.value,
      phone: ''
    })

    return {
      selected,
      countriesList : computed(() => store.getters['general/getcountriesList']),
      ...toRefs(ShippingDetails),
      updateOrderShippingDetails
    }
  },

}
</script>

<style>

</style>