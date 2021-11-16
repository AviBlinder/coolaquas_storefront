import { createStore } from 'vuex';

import cart from './modules/cart';
import general from './modules/general';

// const debug = process.env.NODE_ENV !== 'production';

export default createStore({
  modules: {
    general,
    cart,
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : [],
});


