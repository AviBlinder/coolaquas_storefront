import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
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
    path: '/searchSample',
    name: 'SearchSample',
    component: () =>
      import(
        /* webpackChunkName: "SearchSample" */ '../views/SearchSample.vue'
      ),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () =>
      import(/* webpackChunkName: "Cart" */ '../views/ShopingCart.vue'),
  },
  {
    path: '/checkout',
    name: 'Checkout',
    component: () =>
      import(/* webpackChunkName: "Checkout" */ '../views/Checkout.vue'),
  },
  {
    path: '/pages/:policy',
    name: 'policy-page',
    component: () =>
      import(/* webpackChunkName: "PolicyPage" */ '../views/PolicyPage.vue'),
  },
  {
    path: '/collections/',
    name: 'collections',
    component: () =>
      import(/* webpackChunkName: "Collections" */ '../views/Collections.vue'),
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
    component: () =>
      import(/* webpackChunkName: "Product" */ '../views/Product.vue'),
  },
  // Extra routes (sample routes)
  {
    path: '/carousel',
    name: 'Carousel',
    component: () =>
      import(/* webpackChunkName: "carousel" */ '../views/Carousel.vue'),
  },
  {
    path: '/CategorySample',
    name: 'CategorySample',
    component: () =>
      import(
        /* webpackChunkName: "carousel" */ '../components/category_sample.vue'
      ),
  },
  {
    path: '/transition',
    name: 'Transition',
    component: () =>
      import(/* webpackChunkName: "carousel" */ '../views/Transition.vue'),
  },
  {
    path: '/hero1',
    name: 'Hero1',
    component: () =>
      import(/* webpackChunkName: "Hero1" */ '../views/Hero1.vue'),
  },
  {
    path: '/hero2',
    name: 'Hero2',
    component: () =>
      import(/* webpackChunkName: "Hero2" */ '../views/Hero2.vue'),
  },
  {
    path: '/hero2',
    name: 'Hero2',
    component: () =>
      import(/* webpackChunkName: "Hero2" */ '../views/Hero2.vue'),
  },
  {
    path: '/hero3',
    name: 'Hero3',
    component: () =>
      import(/* webpackChunkName: "Hero3" */ '../views/Hero3.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
