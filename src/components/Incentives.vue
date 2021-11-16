<template>
  <div class="bg-white">
    <div class="inset-0 mx-auto px-4 py-24 sm:px-6 lg:px-8">
      <div class="bg-gray-50 rounded-2xl px-6 py-16 sm:p-16">
        <div class="max-w-xl mx-auto lg:max-w-none">
          <div class="text-center">
            <h2 class="text-2xl font-semibold tracking-wide text-gray-700">{{blok.title}}</h2>
          </div>
          <div class="mt-12 max-w-sm mx-auto grid grid-cols-1 gap-y-10 gap-x-8 sm:max-w-none lg:grid-cols-3">
            <div v-for="incentive in blok.incentive" :key="incentive._uid" 
                class="text-center sm:flex sm:text-left lg:block lg:text-center">
              <div class="sm:flex-shrink-0">
                <div class="flow-root">
                  <!-- <img class="w-16 h-16 mx-auto" :src="incentive.imageSrc" alt="" /> -->
                  <img class="w-16 h-16 mx-auto " :src="imageIcon(incentive.icon_name)" alt="" />
                </div>
              </div>
              <div class="mt-3 sm:mt-0 sm:ml-6 lg:mt-6 lg:ml-0">
                <h3 class="text-sm font-medium text-gray-900">
                  {{ incentive.incentive_name }}
                </h3>
                <p class="mt-2 text-sm text-gray-500 leading-relaxed">
                  {{ incentive.incentive_description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    blok: {
      type: Object
    }
  },
  setup() {

    function imageIcon(icon) {
            return require(`../assets/icons/icon-${icon}.svg`)
    }
    return {
      imageIcon
    }
  },
}
</script>

<style scoped>
svg {
  fill: cadetblue
}
.primary {
  fill: #A5B3BB; }

.secondary {
  fill: #0D2B3E; }
</style>