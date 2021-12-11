import { useStore } from 'vuex';
import { computed, ref, reactive } from 'vue';

export default function () {
  const store = useStore();
  // const eventBus = inject('eventBus');
  const temp = ref(0);
  const taxesAndShippingDisclaimer =
    'Taxes and shipping are calculated at checkout';

  const totalAmountInCart = computed(
    () => ref(store.getters['cart/totalAmountInCart'])
  );

  // const cartItems = ref(store.getters['cart/cartItems'])
  let cartItems = computed(() => {
    // console.log('computed cartItems ', cartItems.value);
    return reactive(store.getters['cart/cartItems']);
  });

  const modifyQuantity = (payload) => {
    store.dispatch('cart/modifyQuantity', payload);
  };

  const removeItem = (payload) => {
    store.dispatch('cart/removeItem', payload);
  };

  return {
    taxesAndShippingDisclaimer,
    totalAmountInCart,
    cartItems,
    modifyQuantity,
    removeItem,
    temp,
  };
}
