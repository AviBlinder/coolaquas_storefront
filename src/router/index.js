import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import NotFound from '../views/404.vue';
// import { computed } from 'vue';
// import { useStore } from 'vuex';
import modules from '../store/index';


// const store = useStore();

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/account/register',
    name: 'Signup',
    component: () =>
      import(/* webpackChunkName: "Signup" */ '../views/Auth/Signup.vue'),
  },
  {
    path: '/account/signin',
    name: 'Signin',
    component: () =>
      import(/* webpackChunkName: "Signin" */ '../views/Auth/Signin.vue'),
  },

  {
    path: '/about',
    name: 'About',
    component: () =>
      import(/* webpackChunkName: "About" */ '../views/About.vue'),
  },
  {
    path: '/search',
    name: 'Search',
    component: () =>
      import(/* webpackChunkName: "Search" */ '../views/Search.vue'),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () =>
      import(
        /* webpackChunkName: "ShoppingCart" */ '../views/ShoppingCart.vue'
      ),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () =>
      import(/* webpackChunkName: "Checkout" */ '../views/Checkout.vue'),
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () =>
      import(
        /* webpackChunkName: "OrdersHistory" */ '../views/OrdersHistory.vue'
      ),
  },
  {
    path: '/handleOrders',
    name: 'OrdersHandle',
    component: () =>
      import(
        /* webpackChunkName: "OrdersHandle" */ '../views/OrdersHandle.vue'
      ),
    beforeEnter: (to, from, next) => {
      // Only staff members can navigate to OrdersHandle view
        const isStaff = modules.state.general.staffMember;
        if (isStaff) {
          next()
        } else
        { next({name: 'Home'})
      }
    },
  },
  {
    path: '/handleOrders/:orderId',
    name: 'OrderHandle',
    component: () =>
      import(
        /* webpackChunkName: "OrderHandle" */ '../views/OrderHandle.vue'
      ),
    beforeEnter: (to, from, next) => {
      // Only staff members can navigate to OrdersHandle view
        const isStaff = modules.state.general.staffMember;
        if (isStaff) {
          next()
        } else
        { next({name: 'Home'})
      }
    },
  },
  {
    path: '/pages/:policy',
    name: 'policy-page',
    component: () =>
      import(/* webpackChunkName: "PolicyPage" */ '../views/PolicyPage.vue'),
  },
  {
    path: '/collections/:collection',
    name: 'collection',
    component: () =>
      import(/* webpackChunkName: "Collection" */ '../views/Collection.vue'),
  },
  {
    path: '/products/:product',
    name: 'product',
    props: (router) => ({ product: router.params.product }),
    component: () =>
      import(/* webpackChunkName: "Product" */ '../views/Product.vue'),
  },
  { path: '/404', component: NotFound },
  // { path: '*', redirect: '/404' },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: NotFound },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   console.log("beforeEach - to: ", to.name)
//     console.log("to params: ", to.params.product)
//    next();
// });
// router.beforeEach((to, from, next) => {
//   if (isStaff) next()
//   else next({name: 'Home'});
// });


export default router
