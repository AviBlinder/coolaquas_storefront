import { createStore } from 'vuex';

import cart from './modules/cart';
import general from './modules/general';
import products from './modules/products';

// const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    general,
    cart,
    products,
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : [],
});


