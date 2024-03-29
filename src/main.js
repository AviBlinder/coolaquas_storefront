import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// Google Analytics
import VueGtag from 'vue-gtag-next';

//Tailwind styles
import './styles/app.css';

// Storyblok
import Storyblok from './utils/Storyblok';

// Components
import landingPage from './components/LandingPage.vue';
import Hero from './components/Hero.vue';
import Collection from './components/Collection.vue';
import Product from './components/Product.vue';
import Footer from './components/Footer.vue';
import Cart from './components/Cart/Cart.vue';

import marked from 'marked';
import StoryblokClient from 'storyblok-js-client';

// Amplify setup
import Amplify from 'aws-amplify';
// import Amplify, { API, graphqlOperation } from 'aws-amplify';

import aws_exports from './aws-exports';
import {
  applyPolyfills,
  defineCustomElements,
} from '@aws-amplify/ui-components/loader';

Amplify.configure(aws_exports);
applyPolyfills().then(() => {
  defineCustomElements(window);
});


const markedMixin = {
  methods: {
    MDtoHTML: (input) => {
      return marked(input);
    },
  },
};

// 
const app = createApp(App, );
// Global properties - Vue 2:
//app.config.globalProperties.propertyName ==> access it on components via: this.propertyName 
  app.config.globalProperties.storyapi = new StoryblokClient({
    accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
  });

  app
    .use(store)
    .use(router)
    .use(Storyblok)
    .use(VueGtag, {
      property: {
        // id: 'UA-57147400-4',
        id: 'G-4FXJ4DCQX2',
      },
    })
    .mixin(markedMixin)
    .mount('#app');

// Global components
app.component('Landing', landingPage);
app.component('Hero', Hero);
app.component('collection', Collection);
app.component('Product', Product);
app.component('Footer', Footer);
app.component('Cart', Cart);
