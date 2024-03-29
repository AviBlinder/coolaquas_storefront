import { useStore } from 'vuex';
import { computed,  } from 'vue';

export default function () {
  const store = useStore();
  // const eventBus = inject('eventBus');
  const currencySign = store.getters['general/getCurrencySign'];

  const taxesAndShippingDisclaimer =
    'Taxes and shipping are calculated at checkout';

  const totalAmountInCart = computed( () => 
  {
    return store.getters['cart/totalAmountInCart']
  }
  );

  let cartItems = computed(() => {
    return store.getters['cart/cartItems']
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
    currencySign,
  };
}
