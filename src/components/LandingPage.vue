<!-- [SVG Icons](https://heroicons.dev/)
//Free SVG Icons: http://www.entypo.com/ -->
<template>
  <div v-editable="blok">
    <div class="bg-white mx-0">
      <main>
        <div>
          <!-- Hero card -->
          <div class="relative">
            <div class="sm:px-6 lg:px-0">
              <div class="h-screen">
                <div class="absolute inset-0 mx-4">
                  <img
                    class="h-screen w-full object-cover rounded-lg shadow-md"
                    :src="imageEdit"
                    :alt="blok.hero_image[0].alt"
                  />
                  <div class="absolute inset-0 bg-white mix-blend-multiply" />
                </div>
                <div
                  class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8"
                >
                  <h1
                    class="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
                  >
                    <!-- <span class="block text-secondary-800 text-opacity-90"> -->
                    <span class="block orange_gradient"> {{ blok.title }}</span>
                    <span class="block text-[#2c3e50] mt-2">{{
                      blok.title_part2
                    }}</span>
                  </h1>
                  <p
                    class="mt-6 max-w-lg mx-auto text-center text-xl text-white sm:max-w-3xl"
                  >
                    <!-- {{blok.subtitle}}  -->
                  </p>
                  <div
                    class="max-w-sm mx-auto sm:max-w-none flex justify-center"
                  >
                    <router-link
                      to="/collections/featured-products"
                      class="flex items-center justify-center px-4 py-3 shadow-md border border-transparent text-base font-medium rounded-md bg-secondary-800 text-primary-200 hover:bg-secondary-900 hover:text-white sm:px-8"
                    >
                      {{ blok.CTA_1 }}
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Featured Products -->
        <div>
          <Featured></Featured>
        </div>

        <!-- Incentives -->
        <component
          v-for="(incentives, index) in blok.incentives"
          :key="index"
          :blok="incentives"
          :is="incentives.component"
        ></component>
      </main>
    </div>
  </div>
</template>
<script>
  import Incentives from './Incentives.vue';
  import Featured from './Featured.vue';
  export default {
    props: {
      blok: {
        type: Object,
      },
    },
    components: {
      Incentives,
      Featured,
    },
    computed: {
      imageEdit() {
        const width = 3000;
        const height = 0;
        const filter = 'filters:quality(0)';
        // filters:fill(transparent)
        const fitIn = `/fit-in/${width}x${height}/${filter}:format(png)`;
        return this.blok.hero_image[0].filename.replace(
          '//a.storyblok.com',
          `//img2.storyblok.com/${fitIn}`
        );
        // return this.blok.hero_image[0].filename
      },
    },
  };
</script>

<style></style>
