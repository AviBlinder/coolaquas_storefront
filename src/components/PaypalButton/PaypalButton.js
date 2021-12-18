import {ref,onMounted, computed} from 'vue'
import { useStore } from 'vuex';

import SubmitButtonState from '@/utils/checkout/SubmitButtonState.js'


export default {
  props: {
    finalCost: {
      type: Number
    }
  },
  name: 'PaypalButton',
  setup(props,context){  
    const store = useStore();
      const currency = computed( () => store.getters['general/getCurrency']);
      const paypal = ref(null)
      let loaded = ref(false);
      let couponApplied = ref(false);
      const paypalLink = 'https://www.paypal.com/sdk/js';
      const clientIdProd = process.env.VUE_APP_PAYPAL_PROD_CLIENT_ID;
      const clientIdDev = process.env.VUE_APP_PAYPAL_SANDBOX_CLIENT_ID;

      // @ts-ignore
      const { disableButton } = SubmitButtonState;

  onMounted(() => {
    const script = document.createElement('script');
    if (process.env.NODE_ENV === 'production') {
      script.src = `${paypalLink}?currency=${currency.value}&client-id=${clientIdProd}`;
    } else {
      script.src = `${paypalLink}?currency=${currency.value}&client-id=${clientIdDev}`;
    }
    // script.addEventListener('load', this.setLoaded);
    script.addEventListener('load', () => setLoaded());
    document.body.appendChild(script);
  });


      const setLoaded = function()  {
      loaded.value = true;
      // @ts-ignore
      window.paypal
        .Buttons({
          // paypal.FUNDING.PAYPAL = Paypal
          // paypal.FUNDING.CARD = Credit or debit cards
          // paypal.FUNDING.CREDIT = PayPal Credit
          // @ts-ignore
          fundingSource: window.paypal.FUNDING.PAYPAL,
          style: {
            // label: 'pay',
            shape: 'pill',
            color: 'gold',
          },
          // @ts-ignore
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'test product',
                  amount: {
                    value: props.finalCost,
                  },
                },
              ],
            });
          },
          // @ts-ignore
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            const orderId = order.purchase_units[0].payments.captures[0].id;
            context.emit(
              'paymentProcess',orderId
            );

            // this.data;
            // this.paidForFlag = true;
            // couponApplied.value = true;
            if (process.env.NODE_ENV !== 'production') {
              console.log('order approved: ', order);
              console.log('order id: ', orderId);
            }
            //
          },
          onError: (err) => {
            console.log('paypal error: ', err);
          },
        })
        .render(paypal.value);
    }

      return {
        currency,
        loaded,
        couponApplied,
        paypalLink,
        clientIdProd,
        clientIdDev,
        setLoaded,
        paypal,
        disableButton,
      };
  },

};
