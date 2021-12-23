const state = {
  added: [],
  cartQuantity: 0,
  //
  order: {
    username: '',
    orderId: '',
    email: '',
    shippingCost: 0,
    shippingType: '',
    status: 'new',
    // products: [],
    total: {
      amount: 0,
      currency: '',
    },
    shippingDetails: {
      firstName: '',
      lastName: '',
      company: '',
      country: '',
      city: '',
      address: '',
      postalCode: '',
    },
    billingDetails: {
      firstName: '',
      lastName: '',
      company: '',
      country: '',
      city: '',
      address: '',
      postalCode: '',
    },
  },
};

const getters = {
  cartItems(state) {
    let cartItems = JSON.parse(localStorage.getItem('customerCart')) || [];
    state.added = cartItems;
    return state.added;
  },
  priceByProduct: (state) => (id) => {
    console.log('id =', id);
    return state.added[id].quantity * state.added[id].price;
  },
  totalAmountInCart(state, getters) {
    let totalAmount = 0;
    totalAmount = getters.cartItems.reduce((total, p) => {
      return total + p.price * p.quantity;
    }, 0);
    return +totalAmount.toFixed(2);
  },
  cartQuantity(state) {
    let cartQuantity =
      JSON.parse(localStorage.getItem('customerCartQuantity')) || 0;

    state.cartQuantity = Number(cartQuantity);
    return state.cartQuantity;
  },
  getOrder(state) {
    return state.order
  },
  getShippingCost(state){
    if (state.order.shippingCost === 0) {
      return 0
    } else { 
      return state.order.shippingCost;
    }
  },
  getOrderTotal(state){
    return state.order.total;
  },
  getUsername(state){
    return state.order.username;
  }
};

const actions = {
  modifyCart({ commit }, value) {
    commit('modifyCart', value);
  },
  totalProductPrice({ commit }, value) {
    commit('totalProductPrice', value);
  },
  addToCart({ commit, dispatch }, payload) {
    commit('addToCart', payload);
    dispatch('totalQuantity');
  },
  modifyQuantity({ commit, dispatch }, payload) {
    commit('modifyQuantity', payload);
    dispatch('totalQuantity');
  },
  removeItem({ commit, dispatch }, payload) {
    commit('removeItem', payload);
    dispatch('totalQuantity');
  },
  totalQuantity({ commit }) {
    commit('totalQuantity');
  },
  setOrderEmail({ commit }, payload) {
    commit('setOrderEmail', payload);
  },
  setOrderUsername({commit}, username) {
    commit('setOrderUsername',username)
  },

  setOrderShippingDetails({ commit,dispatch }, payload) {
    commit('setOrderShippingDetails', payload);
    dispatch('setOrderBillingDetails',payload);
  },
  setOrderBillingDetails({ commit }, payload) {
    commit('setOrderBillingDetails', payload);
  },
  setShippingCost({commit}, payload) {
    commit('setShippingCost', payload);
  },
  setShippingType({commit}, payload) {
    commit('setShippingType', payload);
  },
  setOrderTotal({commit}, payload) {
    commit('setOrderTotal', payload);
  }
};

const mutations = {
  setOrderProperty(state, {property,value}) {
    state.order[property] = value;
  },

  setOrderEmail(state, payload) {
    state.order.email = payload;
  },

  setOrderUsername(state, username) {
    state.order.username = username;
  },
  setShippingCost(state, amount) {
    state.order.shippingCost = Number(amount);
  },
  setShippingType(state, type) {
    state.order.shippingType = type;
  },
  setOrderTotal(state, { amount, currency }) {
    state.order.total.amount = Number(amount);
    state.order.total.currency = currency;
  },
  setOrderShippingDetails(state, payload) {
    Object.assign(state.order.shippingDetails, payload);
  },

  setOrderBillingDetails(state, payload) {
    Object.assign(state.order.billingDetails, payload);
  },

  addToCart(state, { blok, route }) {
    let record = state.added.findIndex((p) => p.id === blok._uid);

    if (record === -1) {
      state.added.push({
        id: blok._uid,
        quantity: 1,
        name: blok.name,
        price: blok.price,
        status: 'new',
        currency: blok.currency,
        imageSrc: blok.images[0].filename,
        imageAlt: blok.images[0].alt,
        //
        leadTime: blok.leadTime ? blok.leadTime : 'Ships in 3–4 weeks',
        inStock: blok.inStock ? blok.inStock : true,
        //
        slug: route,
      });
    } else {
      state.added[record].quantity++;
    }
    // update the current state of the cart as 'customerCart' locatStorage item
    localStorage.setItem('customerCart', JSON.stringify(state.added));
  },
  modifyCart(state, value) {
    state.added = value;
    // update the current state of the cart as 'customerCart' locatStorage item
    localStorage.setItem('customerCart', JSON.stringify(state.added));
  },
  totalProductPrice(state, id) {
    return state.added.map((p) => {
      if (p.id === id) {
        let val = p.quantity * p.price;
        return val.toFixed(2);
      }
    });
  },

  removeItem(state, { id }) {
    const index = state.added.findIndex((p) => p.id === id);
    if (index !== -1) {
      state.added.splice(index, 1);
      // update the current state of the cart as 'customerCart' locatStorage item
      localStorage.setItem('customerCart', JSON.stringify(state.added));
      return state.added;
    }
  },
  modifyQuantity(state, { id, quantity }) {
    return state.added.map((p) => {
      if (p.id === id) {
        p.quantity = Number(quantity);
        // update the current state of the cart as 'customerCart' locatStorage item
        localStorage.setItem('customerCart', JSON.stringify(state.added));
      }
    });
  },

  //update property state.cartQuantity based on the quantity of each product
  //  on the cart
  totalQuantity(state) {
    const quantities = state.added.map((p) => {
      return Number(p.quantity);
    });
    let cartQuantity = 0;
    if (quantities.length) {
      cartQuantity = quantities.reduce((total, p) => {
        return Number(total + p);
      });
    }
    state.cartQuantity = cartQuantity;
    localStorage.setItem(
      'customerCartQuantity',
      JSON.stringify(state.cartQuantity)
    );
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
