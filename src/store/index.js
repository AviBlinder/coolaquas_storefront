import { createStore } from 'vuex';

import cart from './modules/cart';
import general from './modules/general';
import products from './modules/products';

export default createStore({
  modules: {
    general,
    cart,
    products,
  },
});


