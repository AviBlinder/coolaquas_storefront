<template>
  <!-- This `show` prop controls all nested `TransitionChild` components. -->
  <div>
    transition page
    <button class="p-4 rounded" @click="isShowing = !isShowing">Show</button>
  <TransitionRoot 
    :show="isShowing">
    <div class="p-3 bg-primary-500">
      transition root
    <!-- Background overlay -->
    <TransitionChild
      enter="transition-opacity ease-out duration-600"
      enter-from="opacity-0"
      enter-to="opacity-100"
      leave="transition-opacity ease-out duration-600"
      leave-from="opacity-100"
      leave-to="opacity-0"
    >
    <div>transition child</div>
      <!-- ... -->
    </TransitionChild>

    <!-- Sliding sidebar -->
    <TransitionChild
      enter="transition ease-in-out duration-300 transform"
      enter-from="-translate-x-full"
      enter-to="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leave-from="translate-x-0"
      leave-to="-translate-x-full"
    >
      <!-- ... -->
    </TransitionChild>
  </div>
  </TransitionRoot>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { TransitionRoot, TransitionChild } from '@headlessui/vue'

  export default {
    components: { TransitionRoot, TransitionChild },

    setup() {
      const isShowing = ref(true)

      return {
        isShowing,
      }
    },
  }
</script>
