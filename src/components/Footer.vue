<template>
      <div id="footer" class="p-2 m-2 font-md ">
      <router-link   class="footer-item" to="/pages/terms-of-service">Terms of Service</router-link>
       <router-link class="footer-item"  to="/pages/privacy-policy">Privacy Policy</router-link> 
       <router-link class="footer-item"  to="/pages/refund-policy">Refund Policy</router-link>        
       <router-link class="footer-item"  to="/pages/shipping-policy">Shipping Policy</router-link>
    </div>

</template>

<style scoped>
.footer-item {
  @apply text-gray-800 hover:underline p-2
}

  #footer a.router-link-exact-active {
  @apply bg-blue-100 rounded-md p-1
  }
</style>

   {
