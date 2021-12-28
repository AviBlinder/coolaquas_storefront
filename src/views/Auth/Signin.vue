<template>
<div>
      <component
        :is="currentComponent"
        @changeComponent="currentComponentUpdate"
      ></component>

</div>
</template>

<script>
import SignIn from '@/components/Auth/SignIn'
import PasswordRenewal from '@/components/Auth/PasswordRenewal'
import PasswordRenewalSubmit from '@/components/Auth/PasswordRenewalSubmit'
import {ref} from 'vue'
  export default {
    name: 'SignInMain',
    components: {
      SignIn,
      PasswordRenewal,
      PasswordRenewalSubmit
    },
    setup() {
        const currentComponent = ref('SignIn')
        const currentComponentUpdate = (e) => {
          currentComponent.value = e
        }
        return {
          currentComponent,
          currentComponentUpdate
        }
    }
  };
</script>

<style>

</style>
