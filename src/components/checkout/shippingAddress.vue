<template>
<!-- border-t border-gray-200 pt-10 -->
          <div class="mt-10 ">
            <h2 class="text-lg font-medium text-gray-900">Shipping information</h2>
            <!-- <p>disableButton: {{disableButton}}</p> -->
            <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <!-- First Name -->
              <!-- @change='updateOrderShippingDetails' -->
              <FirstName
              :isRequired="true"
              @update:modelValue='updateOrderShippingDetails'
               v-model="firstName"/>

              <!-- Last Name -->
              <!-- @change='updateOrderShippingDetails' -->
              <LastName 
              :isRequired="true"
              @update:modelValue='updateOrderShippingDetails'              
               v-model="lastName"/>

            <!-- Company details -->
              <div class="sm:col-span-2">
                <!-- @change='updateOrderShippingDetails' -->
                <CompanyName
              :isRequired="false"
                @update:modelValue='updateOrderShippingDetails'                
                v-model="company" />
              </div>
              <!-- Main address -->
              <div class="sm:col-span-2">
              <!-- @change='updateOrderShippingDetails' -->
            <Address 
              :isRequired="true"
              @update:modelValue='updateOrderShippingDetails'              
              v-model="address"
            />
           </div>
              <!-- Additional Address details (optional) -->
              <div class="sm:col-span-2">
                <!-- @change='updateOrderShippingDetails' -->
                <AdditionalAddress
              :isRequired="false"
                @update:modelValue='updateOrderShippingDetails'                
                v-model="address2"
                />
              </div>

              <!-- City -->
              <div>
                  <!-- @change='updateOrderShippingDetails' -->
                <City
                :isRequired="true"
                  @update:modelValue='updateOrderShippingDetails'                  
                  v-model='city'
                  />
              </div>

              <!-- Postal Code -->
              <div>
                <!-- @change='updateOrderShippingDetails' -->
                <PostalCode
              :isRequired="true"
                @update:modelValue='updateOrderShippingDetails'                  
                v-model='postalCode'
                />
              </div>

              <!-- Country -->
              <div class="sm:col-span-2">
                 <!-- @change='updateOrderShippingDetails' -->
                <Country
              :isRequired="true"
                 @update:modelValue='updateOrderShippingDetails'                  
                 v-model='country'
                />
              </div>
              <!-- Phone -->
              <div class="sm:col-span-2">
                 <!-- @change='updateOrderShippingDetails' -->
                <Phone
              :isRequired="true"
                 @update:modelValue='updateOrderShippingDetails'                  
                 v-model='phone'
                />
              </div>
            </div>
          </div>

</template>

<script>// @ts-nocheck

import {ref, reactive, toRefs} from 'vue'
import {useStore} from 'vuex';
import SubmitButtonState from '@/utils/checkout/SubmitButtonState.js'
import FormValidations from '@/utils/checkout/FormValidations.js'

// Form fields
import FirstName from '@/components/formFields/FirstName.vue'
import LastName from '@/components/formFields/LastName.vue'
import CompanyName from '@/components/formFields/CompanyName.vue'
import Address from '@/components/formFields/MainAddress.vue'
import AdditionalAddress from '@/components/formFields/AdditionalAddress.vue'
import City from '@/components/formFields/CityField.vue'
import PostalCode from '@/components/formFields/PostCode.vue'
import Country from '@/components/formFields/CountryField.vue'
import Phone from '@/components/formFields/PhoneField.vue'

export default {
  components: {
     FirstName,
     LastName,
     CompanyName,
     Address,
     AdditionalAddress,
     PostalCode,
     City,
     Country,
     Phone     
  },
  
  setup(_,context) {
    const store = useStore()
    let {disableButton} = SubmitButtonState()
    const mandatoryFields = reactive({
      email: '',
      firstName: '',
      lastName: '',
      Address: '',
      City: '',
      postalCode: '',
      Phone: ''
    })
    const { error } = FormValidations();
    const { isSignupButtonDisabled } = SubmitButtonState(mandatoryFields, error);


    const isDisable = ref(false)

    const updateOrderShippingDetails =  () => {
      isDisable.value = isSignupButtonDisabled()
       context.emit('disablePayment',isDisable.value)
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
      country: '',
      phone: ''
    })

    return {
      ...toRefs(ShippingDetails),
      updateOrderShippingDetails,
      mandatoryFields,
      disableButton,
      isSignupButtonDisabled,
      isDisable
    }
  },

}
</script>

<style>

</style>