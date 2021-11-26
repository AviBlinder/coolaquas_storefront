const state = {
  allProducts: [],
  collections: []
};

const getters = {
  getAllProducts(state){
    return state.allProducts
    }
  }

const actions = {
  setProducts({ commit }, payload) {    
    commit('setProducts', payload);
  },
};

const mutations = {
  setProducts(state, payload) {
    state.allProducts = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
