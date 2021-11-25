<template>
  <div>
    <NavigationMenu></NavigationMenu>
    <!-- <div id="nav" class="flex justify-center">
      <router-link to="/">Home</router-link> -->
<!-- | <router-link to="/CategorySample">Category Sample</router-link>  -->
      <!-- <router-link to="/">Home</router-link>  
| <router-link to="/carousel">Carousel</router-link> 
| <router-link to="/transition">Transition</router-link> 
| <router-link to="/hero1">Hero 1</router-link> 
| <router-link to="/hero2">Hero 2</router-link> 
| <router-link to="/hero3">Hero 3</router-link>  -->
    <!-- </div> -->
    
      <!-- <collectionMenu> </collectionMenu> -->
    <div >
      <router-view :key="$route.fullPath"/>
      <FooterLinks> </FooterLinks>
    </div>

  </div>
</template>

<script>
  // import collectionMenu from './components/collectionsMenu.vue';
  import FooterLinks from './components/Footer.vue';
  import NavigationMenu from './components/NavigationMenu.vue';

  export default {
    components: {
      // collectionMenu,
      NavigationMenu,
      FooterLinks
    },
    methods: {
      routePage(page) {
        console.log('page:', page);
        this.$router.push('/pages/' + page);
        console.log('$router =', this.$route.fullPath);
      },
    },
  };
</script>
<style>
  #app {
    font-family: 'Poppins', sans-serif;
    /* font-family: Avenir, Helvetica, Arial, sans-serif; */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #nav {
    padding: 15px;
  }

  #nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  #nav a.router-link-exact-active {
    color: #42b983;
  }
</style>
