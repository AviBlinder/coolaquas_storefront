<template>
  <div>
    <ValueProposition></ValueProposition>
    <NavigationMenu></NavigationMenu>

    <div>
      <router-view :key="$route.fullPath" />
    </div>
    <div class="">
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
  import { useStore } from 'vuex';

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
        .then((user) => {
          const groups = 'cognito:groups';
          let staffMember = false;
          if (
            user.signInUserSession.idToken.payload[groups] !== undefined &&
            user.signInUserSession.idToken.payload[groups].includes('staff')
          ) {
            staffMember = true;
          } else {
            staffMember = false;
          }

          if (user && user.attributes.email_verified) {
            store.dispatch('general/setLoggedInUser', {
              email: user.attributes.email,
              staffMember: staffMember,
            });
            store.dispatch('general/setDynamoDbUserId', user.username);
          } else {
            store.dispatch('general/setLoggedInUser', {
              email: '',
              staffMember: false,
            });
          }
          // store.dispatch('general/setDynamoDbUserId','')
        })
        .catch(() => {
          store.dispatch('general/setLoggedInUser', {
            email: '',
            staffMember: false,
          });
          store.dispatch('general/setDynamoDbUserId', '');
        });

      Hub.listen('auth', (data) => {
        // console.log("hub data: ",data)
          const groups = 'cognito:groups';
          let staffMember = false;
          if (
            data.payload.signInUserSession.idToken.payload[groups] !== undefined &&
            data.payload.signInUserSession.idToken.payload[groups].includes('staff')
          ) {
            staffMember = true;
          } else {
            staffMember = false;
          }

        switch (data.payload.event) {
          case 'signIn':
            store.dispatch('general/setLoggedInUser', {
              email: data.payload.data.attributes.email,
              staffMember: staffMember,
            });
            store.dispatch(
              'general/setDynamoDbUserId',
              data.payload.data.username
            );
            break;
          case 'signUp':
            store.dispatch('general/setLoggedInUser', {
              email: '',
              staffMember: false,
            });
            store.dispatch('general/setDynamoDbUserId', '');
            break;
          case 'signOut':
            localStorage.setItem('loggedIn', JSON.stringify(false));
            localStorage.removeItem('user');
            store.dispatch('general/setLoggedInUser', {
              email: '',
              staffMember: false,
            });
            store.dispatch('general/setDynamoDbUserId', '');
            break;
          case 'signIn_failure':
            localStorage.setItem('loggedIn', JSON.stringify(false));
            localStorage.removeItem('user');
            store.dispatch('general/setLoggedInUser', {
              email: '',
              staffMember: false,
            });
            store.dispatch('general/setDynamoDbUserId', '');
            break;
          case 'configured':
            break;
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
