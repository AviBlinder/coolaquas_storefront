<template>
  <div class="">
    <div v-editable="blok" class="p-3">
      <p> {{blok.heading}}</p>
      <div>
        <img  style="" class="rounded w-1/3 bg-center" :src="imageEdit" alt="">
      </div>
      <!-- <div
        class="carousel-item absolute opacity-0 bg-center"
        style="height:500px; background-image: url(https://mdbootstrap.com/img/new/slides/052.jpg)"
      ></div> -->

      <a class="p-2 bg-secondary-600 rounded m-4" :href="blok.buttonLink.cached_url">{{blok.buttonLabel}}</a>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      blok: {
        type: Object,
      },
    },
    computed: {
      // https://www.storyblok.com/docs/image-service
      imageEdit() {
        const width = 200
        const height = 200
        const fitIn = `/fit-in/${width}x${height}/filters:fill(transparent):format(png)`
          return this.blok.image.filename.replace("//a.storyblok.com",`//img2.storyblok.com/${fitIn}`)
      }
    }
  };
</script>

<style>
</style>
