const state = {
  settings : {
    currency: 'USD',
    currencySign: '$'
  },

loggedInUser : '',
dynamoDbUserId :'',

freeShippingAmount: 0,
deliveryMethods : [
  { id: 1, title: 'Pickup from store', turnaround: '1 business day ', 
  price: 0,currency: '$',checked:false ,name: 'PICKUP'},
  { id: 2, title: 'Standard', turnaround: '4–10 business days',
   price: 5.00,currency: '$' ,checked:false, name: 'STANDARD'},
  { id: 3, title: 'Express', turnaround: '2–5 business days',
  price: 16.50, currency: '$',checked:false, name: 'EXPRESS' },
],
afterSaleMessage: "Thanks for your purchase. \
  Your payment was successfully processed. ",

countries : [
{value:"AS", name:"American Samoa"},
{value:"AG", name:"Antigua and Barbuda"},
{value:"AR", name:"Argentina"},
{value:"AM", name:"Armenia"},
{value:"AW", name:"Aruba"},
{value:"AU", name:"Australia"},
{value:"AT", name:"Austria (Österreich)"},
{value:"BS", name:"Bahamas"},
{value:"BH", name:"Bahrain"},
{value:"BD", name:"Bangladesh"},
{value:"BB", name:"Barbados"},
{value:"BE", name:"Belgium"},
{value:"BZ", name:"Belize"},
{value:"BM", name:"Bermuda"},
{value:"BQ", name:"Bonaire, Saba and Saint Eustatius"},
{value:"VG", name:"British Virgin Islands"},
{value:"BG", name:"Bulgaria"},
{value:"KH", name:"Cambodia"},
{value:"CA", name:"Canada"},
{value:"IC", name:"Canary Islands"},
{value:"KY", name:"Cayman Islands"},
{value:"CL", name:"Chile"},
{value:"CN", name:"China"},
{value:"CX", name:"Christmas Island"},
{value:"CC", name:"Cocos (Keeling) Island"},
{value:"CO", name:"Colombia"},
{value:"CK", name:"Cook Islands"},
{value:"CR", name:"Costa Rica"},
{value:"HR", name:"Croatia"},
{value:"CW", name:"Curaçao"},
{value:"CY", name:"Cyprus"},
{value:"CZ", name:"Czechia"},
{value:"DK", name:"Denmark"},
{value:"DM", name:"Dominica"},
{value:"DO", name:"Dominican Republic"},
{value:"EG", name:"Egypt"},
{value:"SV", name:"El Salvador"},
{value:"EE", name:"Estonia"},
{value:"FK", name:"Falkland Islands (Malvinas)"},
{value:"FO", name:"Faroe Islands"},
{value:"FJ", name:"Fiji"},
{value:"FI", name:"Finland"},
{value:"FR", name:"France"},
{value:"PF", name:"French Polynesia"},
{value:"DE", name:"Germany"},
{value:"GI", name:"Gibraltar"},
{value:"GD", name:"Grenada"},
{value:"GP", name:"Guadeloupe"},
{value:"GU", name:"Guam "},
{value:"GT", name:"Guatemala"},
{value:"GG", name:"Guernsey (Channel Islands)"},
{value:"HT", name:"Haiti"},
{value:"HK", name:"Hong Kong"},
{value:"HU", name:"Hungary"},
{value:"IS", name:"Iceland"},
{value:"IN", name:"India"},
{value:"IE", name:"Ireland"},
{value:"IL", name:"Israel"},
{value:"IT", name:"Italy"},
{value:"JM", name:"Jamaica"},
{value:"JP", name:"Japan"},
{value:"JE", name:"Jersey (Channel Islands)"},
{value:"LV", name:"Latvia"},
{value:"LB", name:"Lebanon"},
{value:"LI", name:"Liechtenstein"},
{value:"LT", name:"Lithuania"},
{value:"LU", name:"Luxembourg"},
{value:"MO", name:"Macau"},
{value:"MY", name:"Malaysia"},
{value:"MT", name:"Malta"},
{value:"MH", name:"Marshall Islands"},
{value:"MQ", name:"Martinique"},
{value:"MU", name:"Mauritius"},
{value:"MX", name:"Mexico"},
{value:"UM2",name:"Midway Islands"},
{value:"MC", name:"Monaco"},
{value:"NL", name:"Netherlands"},
{value:"NZ", name:"New Zealand"},
{value:"NI", name:"Nicaragua"},
{value:"NF", name:"Norfolk Island"},
{value:"MP", name:"Northern Mariana Islands"},
{value:"NO", name:"Norway"},
{value:"OM", name:"Oman"},
{value:"PK", name:"Pakistan"},
{value:"PG", name:"Papua New Guinea"},
{value:"PY", name:"Paraguay"},
{value:"PH", name:"Philippines"},
{value:"PL", name:"Poland"},
{value:"PR", name:"Puerto Rico"},
{value:"QA", name:"Qatar"},
{value:"RE", name:"Reunion"},
{value:"RO", name:"Romania"},
{value:"LC", name:"Saint Lucia"},
{value:"SX", name:"Saint Maarten"},
{value:"VC", name:"Saint Vincent and the Grenadines"},
{value:"MF", name:"Saint-Martin"},
{value:"SM", name:"San Marino"},
{value:"SC", name:"Seychelles"},
{value:"SG", name:"Singapore"},
{value:"SK", name:"Slovakia"},
{value:"SI", name:"Slovenia"},
{value:"SB", name:"Solomon Islands"},
{value:"ZA", name:"South Africa"},
{value:"KR", name:"South Korea"},
{value:"ES", name:"Spain"},
{value:"ES3",name:"Spain (Ceuta Only)"},
{value:"KN1",name:"St. Kitts and Nevis"},
{value:"SE", name:"Sweden"},
{value:"CH", name:"Switzerland"},
{value:"TW", name:"Taiwan"},
{value:"TH", name:"Thailand"},
{value:"TT", name:"Trinidad and Tobago"},
{value:"TR", name:"Turkey"},
{value:"AE", name:"United Arab Emirates"},
{value:"GB", name:"United Kingdom"},
{value:"UY", name:"Uruguay"},
{value:"US", name:"USA"},
{value:"VU", name:"Vanuatu"},
{value:"VE", name:"Venezuela"},
{value:"VI", name:"Virgin Islands (USVI)"},
{value:"UM3",name:"Wake Islan"}
]
}
const getters = {
  getLoggedInUser(state) {
    return state.loggedInUser;
  },
  getDynamoDbUserId(state) {
    return state.dynamoDbUserId;
  },

  getCurrency(state) {
    return state.settings.currency;
  },
  getCurrencySign(state) {
    return state.settings.currencySign;
  },

  getDeliveryMethods(state) {
    return state.deliveryMethods;
  },
  getcountriesList(state) {
    return state.countries;
  },
  getFreeShippingAmount(state) {
    return state.freeShippingAmount.toFixed(2);
  },
  getafterSaleMessage(state) {
    return state.afterSaleMessage;
  },
};
const actions = {
  setLoggedInUser({ commit, dispatch }, payload) {
    commit('setLoggedInUser', payload);
    dispatch('cart/setOrderUsername', payload, { root: true });
  },
  setDynamoDbUserId({ commit }, payload) {
    commit('setDynamoDbUserId', payload);
  },
  setFreeShippingAmount({ commit }, payload) {
    commit('setFreeShippingAmount', payload);
  },
  setCurrency({ commit }, payload) {
    commit('setCurrency', payload);
  },
  setCurrencySign({ commit }, payload) {
    commit('setCurrencySign', payload);
  },
};

const mutations = {
  setLoggedInUser(state, payload) {
    state.loggedInUser = payload;
  },
  setDynamoDbUserId(state, payload) {
    state.dynamoDbUserId = payload;
  },

  setFreeShippingAmount(state, payload) {
    state.freeShippingAmount = Number(payload);
  },
  setCurrency(state, payload) {
    state.settings.currency = payload;
  },
  setCurrencySign(state, payload) {
    state.settings.currencySign = payload;
  },
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
