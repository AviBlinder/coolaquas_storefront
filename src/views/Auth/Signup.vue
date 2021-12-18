<template>
<div>
      <component
        :is="currentComponent"
        @changeComponent="currentComponentUpdate"
      ></component>

</div>
</template>

<script>
import CreateAccount from '@/components/Auth/CreateAccount'
import CodeVerification from '@/components/Auth/CodeVerification'
import ResendSignUp from '@/components/Auth/ResendSignUp'
import {ref} from 'vue'
  export default {
    name: 'SignUpMain',
    components: {
      CreateAccount,
      CodeVerification,
      ResendSignUp
    },
    setup() {
        const currentComponent = ref('CreateAccount')
        const currentComponentUpdate = (e) => {
          console.log("currentComponentUpdate ",e)
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