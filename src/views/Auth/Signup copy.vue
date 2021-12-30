<template>
  <!-- To Do -->
  <!-- 
  1. Setup() syntax
  2. errors display
  3.  review Auth() methods (inspect /amplify and aws-exports.js)
  4. find users on Cognito
  4. vue components?
 -->
  <div class="flex justify-center items-center">
    <div class="sm:w-full lg:w-1/3 h-4/5 bg-truegray-200 m-4 p-4 rounded-lg">
      <form @submit.prevent="register">
        <h2 class="my-10 font-bold capitalize">Register</h2>
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
          <button class="rounded-md p-2 bg-green-200 m-4">Register</button>
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

  export default {
    data() {
      return {
        email: '',
        password: '',
        username: '',
        error: '',
        successMessage: '',
        userConfirmed: '',
      };
    },
    methods: {
      async register() {
        try {
          this.error = '';
          this.successMessage = '';
          this.userConfirmed = false;
          await Auth.signUp({
            username: this.email,
            password: this.password,
          }).then((res) => {
            this.username = res.user.username;
            this.userConfirmed = res.userConfirmed;
            if (res.userSub) {
              this.email = '';
              this.password = '';
            }
          });
          this.successMessage = `User successfully registered. Please login as ${this.username}`;
        } catch (error) {
          this.error = error.message;
        }
      },
    },
  };
</script>

<style scoped>
  :input {
    margin-right: 10px;
  }
</style>
