// https://ui.docs.amplify.aws/components/authenticator?platform=vue
<template>
   <!-- :social-providers="['amazon', 'apple', 'facebook', 'google']" -->
  <!-- variation="modal" -->
  <authenticator 
  :login-mechanisms="['email','name','birthdate']"
   :sign-up-attributes="['email',]"
  >
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.attributes.email }}!</h1>
      <button class="m-2 p-1 bg-green-300 rounded-sm shadow-md" @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>

<script setup>
  import { Authenticator } from "@aws-amplify/ui-vue";
  import "@aws-amplify/ui-vue/styles.css";
</script>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
    })
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  },
  data(){
    return{
      unsubscribeAuth: undefined,
       user: undefined,
      authState: undefined,
    }
  }
}
</script>

<style>
[data-amplify-authenticator] {
  /* --amplify-colors-background-primary: var(--amplify-colors-neutral-90);
  --amplify-colors-background-secondary: var(--amplify-colors-neutral-100);
  --amplify-colors-background-tertiary: var(--amplify-colors-black);
  --amplify-components-text-color: var(--amplify-colors-font-interactive); */
}

</style>