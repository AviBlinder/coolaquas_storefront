<template>
  <div>
    <amplify-authenticator 
    username-alias="email"
    v-if="authState !== 'signedin'"></amplify-authenticator>
    <div v-if="authState === 'signedin' && user">
      <amplify-sign-out>
      </amplify-sign-out>
      <div>Hello, {{user.username}}</div>
    </div>
    <div v-else>
    <amplify-sign-up
      v-slot="sign-up"
      username-alias="email"
      :formFields="formFields"
    ></amplify-sign-up>
    <amplify-sign-in v-slot="sign-in" username-alias="email"></amplify-sign-in>

    </div>
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
            { type: "username" },
            { type: "password" },
            { type: "email" }
        ],
    }
  },
  beforeUnmount() {
    this.unsubscribeAuth();
  }
}
</script>

<style scoped>
amplify-authenticator {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100vh;
}

</style>

// --background-color	Background color of the container
// --border-radius	Border radius of the container
// --box-shadow	Bow shadow of the container
// --container-align	`align-items` property of a flex container
// --container-display	Display option of the container. Defaults to flex.
// --container-height	Height of the container. Defaults to 100vh.
// --container-justify	`justify-content` property of a flex container
// --margin-bottom	Margin below the component
// --min-width	Minimum width of the container
// --padding	Padding within the component
// --width	