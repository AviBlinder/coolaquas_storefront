<template>
  <div class="flex justify-center items-center">
    <div class="sm:w-full lg:w-1/3 h-4/5 bg-truegray-200 m-4 p-4 rounded-lg">
      <form @submit.prevent="login">
        <h2 class="my-10 font-bold capitalize">Login</h2>
        <div class="block">
          <div>
            <input
              class="rounded-md"
              type="email"
              v-model="email"
              placeholder="Email address..."
            />
            <input
              class="ml-4 rounded-md"
              type="password"
              v-model="password"
              placeholder="password..."
            />
          </div>
          <div v-if="error" class="text-red-400">{{ error }}</div>
          <button class="rounded-md p-2 bg-green-200 m-4">Login</button>
        </div>
        <div v-if="successMessage" class="text-green-500">
          {{ successMessage }}
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import { Auth } from 'aws-amplify';
import { AuthState, onAuthUIStateChange } from '@aws-amplify/ui-components'

export default {
  name: 'Login',
    created() {
    // authentication state managament
    onAuthUIStateChange((state, user) => {
      // set current user and load data after login
      if (state === AuthState.SignedIn) {
        this.user = user;
      }
    })
  },

  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods:{
    async login() {
    try {
        await Auth.signIn(this.email, this.password);
        alert('Successfully logged in');
    } catch (error) {
        alert(error.message);
    }
},

  }
}
</script>
