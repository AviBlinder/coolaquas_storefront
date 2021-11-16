<template>
  <div>
    <div class="flex flex-grow justify-center items-center">
      <div class="grid grid-cols-6 mt-4">
        <div class="col-span-5">
          <label for="couponCode"></label>
          <input
            type="text"
            placeholder="Enter Discount Code"
            name="couponCode"
            id="couponCode"
            class="text-xl font-normal rounded-md"
            v-model="couponField"
          />
        </div>
        <button
          @click.prevent="couponCheck"
          class="mt-6 sm:px-1 md:px-1 sm:ml-2 ml-4 
      rounded-md max-h-12   hover:bg-yellow-400 focus:ring-yellow-400 hover:text-gray-600
      font-sans font-semibold tracking-tighter text-center text-opacity-90 text-blue-700
      text-lg "
        >
          <BadgeCheckIcon class="h-15 w-15"></BadgeCheckIcon>
        </button>
      </div>
    </div>
    <div v-if="invalidCoupon" class="text-lg text-red-500 text-center mt-2 ">
      {{ couponErrorMessage }}
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import { BadgeCheckIcon } from '@heroicons/vue/solid';

  export default {
    props: {},
    data() {
      return {
        couponField: '',
        invalidCoupon: false,
        couponErrorMessage: '',
      };
    },
    components: { BadgeCheckIcon },
    computed: {
      ...mapGetters(['couponCode', 'couponDiscount', 'couponMaxDate']),
    },
    methods: {
      ...mapActions(['setOrderCouponCode', 'setOrderCouponDiscount']),

      couponCheck() {
        this.couponErrorMessage = '';
        this.invalidCoupon = false;
        if (this.couponField === '') {
          this.couponErrorMessage = 'Empty coupon code';
          this.invalidCoupon = true;
          return;
        }
        if (this.couponField === this.couponCode) {
          if (this.couponMaxDate >= new Date()) {
            this.setOrderCouponCode(this.couponCode);
            this.setOrderCouponDiscount(this.couponDiscount);
            this.$emit('couponApplied');
            return;
          } else {
            this.couponErrorMessage = `Coupon "${this.couponField}" is no longer valid`;
            this.invalidCoupon = true;
            this.couponField = ''
            return;
          }
        } else {
          this.couponErrorMessage = `Coupon code "${this.couponField}" not found`;
          this.invalidCoupon = true;
          this.couponField = ''
        }
      },
    },
  };
</script>

<style></style>
