<template>
  <div>
    <ValueProposition></ValueProposition>
    <NavigationMenu></NavigationMenu>

    <div class="h-full">
      <router-view :key="$route.fullPath" />
    </div>
    <div>
      <FooterLinks> </FooterLinks>
    </div>
  </div>
</template>

<script>
  import FooterLinks from './components/Footer.vue';
  import NavigationMenu from './components/NavigationMenu.vue';
  import ValueProposition from './components/ValueProposition.vue';
  import StoryblokClient from 'storyblok-js-client';
  // Global Eventbus library
  import mitt from 'mitt';
  // Global variables function
  import { provide } from 'vue';
  import { Auth } from 'aws-amplify';
  import { Hub } from 'aws-amplify';
  import {useStore} from 'vuex';

  export default {
    setup() {
      const store = useStore();

      window.storyblok.init({
        accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
      });
      const storyapi = new StoryblokClient({
        accessToken: process.env.VUE_APP_STORYBLOK_SPACE_KEY_PREVIEW,
      });

      // Setup Global Eventbus as global variable
      const eventBus = mitt();
      provide('eventBus', eventBus);

      provide('storyapi', storyapi);


      //Auth start       
        Auth.currentAuthenticatedUser({ bypassCache: false })
        .then( (user) => {
          // console.log("user: ",user)
          if (user && user.attributes.email_verified) {
            store.dispatch('general/setLoggedInUser',user.attributes.email)
          } else {
            store.dispatch('general/setLoggedInUser','')          }
          // return Auth.changePassword(user, 'oldPassword', 'newPassword');
        })
        .catch( (err) => {
          console.log('currentAuthenticatedUser error: ', err)
          store.dispatch('general/setLoggedInUser','')
        });

      Hub.listen('auth', (data) => {
        switch (data.payload.event) {
          case 'signIn':
            console.log(
              'event: user signed in', data );
            store.dispatch('general/setLoggedInUser',data.payload.data.attributes.email)            
            break;
          case 'signUp':
            console.log('event: user signed up', data);
            store.dispatch('general/setLoggedInUser','')            
            break;
          case 'signOut':
            console.log(' event: user signed out');
            localStorage.setItem('loggedIn', JSON.stringify(false));
            localStorage.removeItem('user');
            store.dispatch('general/setLoggedInUser','')            
                    
            break;
          case 'signIn_failure':
            console.log('event: user sign in failed');
            localStorage.setItem('loggedIn', JSON.stringify(false));
            localStorage.removeItem('user');
            store.dispatch('general/setLoggedInUser','')              
            break;
          case 'configured':
            console.log('event: the Auth module is configured');
        }
      });

      // Auth ends
      return {};
    },

    components: {
      // collectionMenu,
      ValueProposition,
      NavigationMenu,
      FooterLinks,
    },
    //
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
