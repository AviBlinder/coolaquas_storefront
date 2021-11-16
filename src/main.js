import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
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
import Product from './components/Product.vue';
import CategorySample from './components/category_sample.vue';
import Footer from './components/Footer.vue';
import Cart from './components/Cart.vue';

import marked from 'marked';
const markedMixin = {
  methods: {
    MDtoHTML: (input) => {
      return marked(input);
    },
  },
};

// 
const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(Storyblok)
  .mixin(markedMixin)
  .mount('#app');

app.component('Landing', landingPage);
app.component('Hero', Hero);
app.component('slideshow', Slideshow);
app.component('slideshow-image', SlideshowImage);
app.component('collection', Collection);
app.component('Product', Product);
app.component('CategorySample', CategorySample);
app.component('Footer', Footer);
app.component('Footer', Cart);
