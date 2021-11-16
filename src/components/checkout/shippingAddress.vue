<template>
<!-- border-t border-gray-200 pt-10 -->
          <div class="mt-10 ">
            <h2 class="text-lg font-medium text-gray-900">Shipping information</h2>
            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div>
                <label for="first-name" class="block text-sm font-medium text-gray-700"></label>
                <div class="mt-1">
                  <input 
                  v-model="firstName"
                  @change='updateOrderShippingDetails'
                  placeholder="First name"
                  type="text" id="first-name" name="first-name" autocomplete="given-name" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label for="last-name" class="block text-sm font-medium text-gray-700"></label>
                <div class="mt-1">
                  <input 
                  v-model="lastName"
                  @change='updateOrderShippingDetails'
                  placeholder="Last name"
                  type="text" id="last-name" name="last-name" autocomplete="family-name" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="company" class="block text-sm font-medium text-gray-700"></label>
                <div class="mt-1">
                  <input 
                  v-model="company"
                  @change='updateOrderShippingDetails'
                  placeholder="Company (optional)"
                  type="text" name="company" id="company" class="
                  placeholder-opacity-75 placeholder-gray-500	
                  block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="address" class="block text-sm font-medium text-gray-700"></label>
                <div class="mt-1">
                  <input 
                  v-model="address"
                  @change='updateOrderShippingDetails'
                  placeholder="Address"
                  type="text" name="address" id="address" autocomplete="street-address" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm" />
                </div>
              </div>

              <div class="sm:col-span-2">
                <label for="apartment" class="block text-sm font-medium text-gray-700"></label>
                <div class="mt-1">
                  <input 
                  placeholder="Apartment, suite, etc."
                  v-model="address2"
                  @change='updateOrderShippingDetails'
                  type="text" name="apartment" id="apartment" class="
                  placeholder-opacity-75 placeholder-gray-500	                 
                  block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label for="city" class="block text-sm font-medium text-gray-700"></label>
                <div class="mt-1">
                  <input
                  v-model="city"
                  @change='updateOrderShippingDetails'
                  placeholder="City"
                   type="text" name="city" id="city" autocomplete="address-level2" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm" />
                </div>
              </div>
              <div>
                <label for="postal-code" class="block text-sm font-medium text-gray-700"></label>
                <div class="mt-1">
                  <input
                  v-model="postalCode"
                  @change='updateOrderShippingDetails'
                  placeholder="Postal code"
                   type="text" name="postal-code" id="postal-code" autocomplete="postal-code" class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm" />
                </div>
              </div>

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

<script>
import {ref, reactive, computed, toRefs} from 'vue'
import {useStore} from 'vuex';

export default {
  setup() {
    const store = useStore()

    const selected = ref("Israel")

    const updateOrderShippingDetails =  () => {
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