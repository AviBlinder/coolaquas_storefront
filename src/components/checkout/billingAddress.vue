<template>
  <div v-show="!sameAsShipping">
    <!-- border-t border-gray-200 pt-10 -->
    <div class="mt-10 ">
      <p>sameAsShipping:{{ sameAsShipping }}</p>
      <!-- <h2 class="text-lg font-medium text-gray-900">Billing information</h2> -->
      <!-- First Name -->
      <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
        <FirstName
          @update:modelValue="updateOrderBillingDetails"
          v-model="firstName"
        />

        <!-- Last Name -->
        <div>
          <LastName
            @update:modelValue="updateOrderBillingDetails"
            v-model="lastName"
          />
        </div>

        <!-- Company details -->
        <div class="sm:col-span-2">
          <CompanyName
            @update:modelValue="updateOrderBillingDetails"
            v-model="company"
          />
        </div>

        <!-- Main address -->
        <div class="sm:col-span-2">
          <Address
            @update:modelValue="updateOrderBillingDetails"
            v-model="address"
          />
        </div>

        <!-- Additional Address details (optional) -->
        <div class="sm:col-span-2">
          <AdditionalAddress
            @update:modelValue="updateOrderBillingDetails"
            v-model="address2"
          />
        </div>

        <!-- City -->
        <div>
          <City @update:modelValue="updateOrderBillingDetails" v-model="city" />
        </div>
        <!-- Postal Code -->
        <div>
          <PostalCode
            @update:modelValue="updateOrderBillingDetails"
            v-model="postalCode"
          />
        </div>

        <!-- Country -->
        <div class="sm:col-span-2">
          <Country
            @update:modelValue="updateOrderBillingDetails"
            v-model="country"
          />
        </div>

        <!-- Phone -->
        <div class="sm:col-span-2">
          <Phone
            @update:modelValue="updateOrderBillingDetails"
            v-model="phone"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref, reactive, computed, toRefs, watch } from 'vue';
  import { useStore } from 'vuex';
  // Form fields
  import FirstName from '@/components/formFields/FirstName.vue';
  import LastName from '@/components/formFields/LastName.vue';
  import CompanyName from '@/components/formFields/CompanyName.vue';
  import Address from '@/components/formFields/MainAddress.vue';
  import AdditionalAddress from '@/components/formFields/AdditionalAddress.vue';
  import City from '@/components/formFields/CityField.vue';
  import PostalCode from '@/components/formFields/PostCode.vue';
  import Country from '@/components/formFields/CountryField.vue';
  import Phone from '@/components/formFields/PhoneField.vue';

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
      Phone,
    },

    props: {
      sameAsShipping: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const store = useStore();

      const selected = ref('Israel');

      watch(
        () => props.sameAsShipping,
        (currentValue) => {
          if (currentValue === false) {
            (BillingDetails.firstName = ''),
              (BillingDetails.lastName = ''),
              (BillingDetails.company = ''),
              (BillingDetails.address = ''),
              (BillingDetails.address2 = ''),
              (BillingDetails.city = ''),
              (BillingDetails.postalCode = ''),
              (BillingDetails.country = ''),
              (BillingDetails.phone = '');
            updateOrderBillingDetails();
          } else {
            Object.assign(
              BillingDetails,
              store.state.cart.order.shippingDetails
            );
            updateOrderBillingDetails();
          }
        }
      );

      const updateOrderBillingDetails = () => {
        BillingDetails.country = selected.value;
        store.dispatch('cart/setOrderBillingDetails', BillingDetails);
      };

      const BillingDetails = reactive({
        firstName: '',
        lastName: '',
        company: '',
        address: '',
        address2: '',
        city: '',
        postalCode: '',
        country: selected.value,
        phone: '',
      });

      return {
        selected,
        countriesList: computed(
          () => store.getters['general/getcountriesList']
        ),
        ...toRefs(BillingDetails),
        updateOrderBillingDetails,
      };
    },
  };
</script>

<style></style>
