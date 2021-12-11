import { useStore } from 'vuex';
import { computed, ref, reactive} from 'vue';

export default function(){
        const store = useStore();
        // const eventBus = inject('eventBus');
        const temp = ref(0)
        const taxesAndShippingDisclaimer =
          'Taxes and shipping are calculated at checkout';

        const totalAmountInCart = computed(
          () => store.getters['cart/totalAmountInCart']
        );
        
        // const cartItems = ref(store.getters['cart/cartItems'])
        let cartItems = computed( () => 
        {
          console.log("computed cartItems ")
          return reactive(store.getters['cart/cartItems'])
        })

        const modifyQuantity = (payload) => {
          console.log("inside modifyQuantity func ", payload)
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