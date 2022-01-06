<template>
<div class="mt-28">
  <div class="w-screen h-full px-10">
    <div class="">

    <div class=" px-4 py-8 bg-green-100 rounded">
    <h2 >Sorry...The page you are trying to reach does not exist</h2>

<div class="mt-10">

    <router-link
    class="bg-secondary-300 rounded p-3"
     :to="{name:'Home'}" :as="a">Take me Home</router-link>
</div>
</div>
    </div>

    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>

</style>