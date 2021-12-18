<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create account
      </h2>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div v-if="error" class="text-red-400">{{ error }}</div>
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="createAccount">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <div class="mt-1">
              <!-- placeholder="Email address..." -->
              <input
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                v-model="email"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div class="mt-1">
              <!-- placeholder="password..."               -->
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-secondary-500 focus:border-secondary-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-secondary-600 hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-500"
            >
              Sign Up
            </button>
          </div>
          <div class="flex items-center justify-between">
            <button
              class="auth-bottom-links"
              @click="$emit('changeComponent', 'CodeVerification')"
            >
              Verify Account
            </button>
              <router-link :to="{name: 'Signin'}"
              class="auth-bottom-links">
              Sign In
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
  import useAuth from '@/composition/useAuth';
  import { toRefs } from 'vue';
export default {
    name: 'CreateAccount',
    setup(_,{emit}) {
      const { form, error, state, user, signUp} = useAuth()

      const createAccount = async () => {
        await signUp()
            if(!error.value){
              emit('changeComponent', 'CodeVerification')            
            }
      }

      return {
        ...toRefs(form),
        error,
        state,
        user,
        createAccount
      };
    },
}
</script>
