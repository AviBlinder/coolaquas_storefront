import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//Tailwind styles
import './styles/app.css';

// Storyblok
import Storyblok from './utils/Storyblok';

// Components
import landingPage from './components/LandingPage.vue';
import Hero from './components/Hero.vue';
import Slideshow from './components/Slideshow.vue';
import SlideshowImage from './components/SlideshowImage.vue';
import Collection from './components/Collection.vue';
import CollectionFilterAndSort from './components/CollectionWIthFilterAndSort.vue';
import Product from './components/Product.vue';
import CategorySample from './components/category_sample.vue';
import Footer from './components/Footer.vue';
import Cart from './components/Cart/Cart.vue';

import marked from 'marked';
import StoryblokClient from 'storyblok-js-client';

const markedMixin = {
  methods: {
    MDtoHTML: (input) => {
      return marked(input);
    },
  },
};

// 
const app = createApp(App);
// Global properties - Vue 2:
//app.config.globalProperties.propertyName ==> access it on components via: this.propertyName 
  app.config.globalProperties.storyapi = new StoryblokClient({
    accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
  });

  app
  .use(store)
  .use(router)
  .use(Storyblok)
  .mixin(markedMixin)
  .mount('#app');

// Global components
app.component('Landing', landingPage);
app.component('Hero', Hero);
app.component('slideshow', Slideshow);
app.component('slideshow-image', SlideshowImage);
app.component('collection', Collection);
app.component('CollectionFilterAndSort', CollectionFilterAndSort);
app.component('Product', Product);
app.component('CategorySample', CategorySample);
app.component('Footer', Footer);
app.component('Footer', Cart);
