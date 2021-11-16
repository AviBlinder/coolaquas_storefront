import { mapGetters } from "vuex";
export default {
  props: {
    finalCost: {
      type: Number
    }
  },
  name: 'PaypalButton',
  computed: {
    ...mapGetters({
      currency: 'general/getCurrency',
    }),
  },
  data: function() {
    return {
      loaded: false,
      couponApplied: false,
      paypalLink: 'https://www.paypal.com/sdk/js',
      clientIdProd: process.env.VUE_APP_PAYPAL_PROD_CLIENT_ID,
      clientIdDev: process.env.VUE_APP_PAYPAL_SANDBOX_CLIENT_ID,
    };
  },
  mounted: function() {
    const script = document.createElement('script');
    if (process.env.NODE_ENV === 'production') {
      script.src = `${this.paypalLink}?currency=${this.currency}&client-id=${this.clientIdProd}`;
    } else {
      script.src = `${this.paypalLink}?currency=${this.currency}&client-id=${this.clientIdDev}`;
    }

    // script.addEventListener('load', this.setLoaded);
    script.addEventListener('load', () => this.setLoaded());

    document.body.appendChild(script);
  },
  methods: {
    setLoaded: function() {
      this.loaded = true;
      window.paypal
        .Buttons({
          // paypal.FUNDING.PAYPAL = Paypal
          // paypal.FUNDING.CARD = Credit or debit cards
          // paypal.FUNDING.CREDIT = PayPal Credit
          fundingSource: window.paypal.FUNDING.PAYPAL,
          style: {
            // label: 'pay',
            shape: 'pill',
            color: 'gold',
          },
          createOrder: (data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  description: 'test product',
                  amount: {
                    value: this.finalCost,
                  },
                },
              ],
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            // this.data;
            this.paidForFlag = true;
            this.couponApplied = true;
            if (process.env.NODE_ENV !== 'production') {
              console.log('order approved: ', order);
              console.log(
                'order id: ',
                order.purchase_units[0].payments.captures[0].id
              );
            }
            //
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(this.$refs.paypal);
    },
  },
};
