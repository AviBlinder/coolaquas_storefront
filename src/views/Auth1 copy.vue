// https://docs.amplify.aws/ui/auth/authenticator/q/framework/vue/
<template>
  <div class="mt-4">
    <h2>Auth1</h2>
    <div v-if="authState === 'signedin' && user">
      <p>Welcome {{user.attributes.email}}</p>
    </div>
    <div v-else>
      Please sign in
      Your auth status is  {{authState}} 
    </div>
        <!-- username-alias: defines the authentication flow (email/user/phoe) -->
    <!-- Cognitro User pool must be defined in accordance -->
  <amplify-authenticator username-alias="email">
      <!-- v-slot:"sign-up" -->

    <!-- slot="sign-in"  -->
  </amplify-authenticator>
  <h2>Sign Up form</h2>
    <amplify-sign-up
      username-alias="email"
      :formFields="formFields"
      submit-button-text="Get in!"
    ></amplify-sign-up>
    
    <h2>Sign In Form:</h2>
    <amplify-sign-in 
    username-alias="email"
    header-text="My Custom Sign In Text"
    submit-button-text="Get in!!"
    >
    </amplify-sign-in>

    <!-- slot="confirm-sign-in" -->
    <h2>Confirm Sign In form</h2>
  <amplify-confirm-sign-in
    header-text="My Custom Confirm Sign In Text"
    submit-button-text="Confirm it"
  ></amplify-confirm-sign-in>


  </div>
</template>

<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
      console.log("authState : ",this.authState)
      console.log("user: ", {authData})
    })
  },

  data() {
    return {
      user: undefined,
      authState: undefined,
      unsubscribeAuth: undefined,
      formFields: [
        {
          type: 'email',
          label: 'Custom Email Label',
          placeholder: 'Custom email placeholder',
          inputProps: { required: true, autocomplete: 'username' },
        },
        {
          type: 'password',
          label: 'Custom Password Label',
          placeholder: 'Custom password placeholder',
          inputProps: { required: true, autocomplete: 'new-password' },
        },
      ]
    }
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  }

}
</script>

<style>
amplify-sign-up amplify-sign-in amplify-authenticator {
    --background-color: indianred;

  /* @apply bg-green-500; */
  /* --amplify-background-color: green; */
}
</style>