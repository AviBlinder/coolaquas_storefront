<template>
  <div>
    <h2>Auth 1 Sample (2)</h2>
    <div v-if="authState !== 'signedin'">You are signed out.</div>

    <amplify-authenticator username-alias="email">
    <amplify-sign-in
    headerText="My Custom Confirm Sign In Text"
    submit-button-text="Sign In Now"   
    >
  </amplify-sign-in>

    <amplify-sign-up
    :formFields="formFields"
    headerText="My Custom Confirm Sign Up Text"
    submit-button-text="Sign Up Now"
    >
  </amplify-sign-up>

  <div v-if="authState === 'signedin' && user">
     <div>Hello, {{user.attributes.email}}</div>
     <amplify-sign-out></amplify-sign-out>
    </div>
  </amplify-authenticator>

        <!-- <h2>Sign In</h2>
        
      <amplify-sign-in 
        username-alias="email"
        header-text="My Custom Sign In Text"
        submit-button-text="Get in!!"
        >
    </amplify-sign-in>

  <h2>Sign Up form</h2>
    <amplify-sign-up
      username-alias="email"
      :formFields="formFields"
      submit-button-text="Get in!"
    ></amplify-sign-up> -->

    <!-- </amplify-auth-container> -->
  </div>
</template>


<script>
import { onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'AuthStateApp',
  created() {
    this.unsubscribeAuth = onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData;
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
        {
          type: 'name',
          label: 'Your Name',
          placeholder: 'How should we call you?',
        },
      ]

    }
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  }
}
</script>

<style scoped>
:root {
  /* var(--v-primary-base) */
  --amplify-primary-color: green ;
  --amplify-primary-tint: #ff7359;
  --amplify-primary-shade: #e0573e;
}

</style>
