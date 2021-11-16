<template>
<!-- https://tailwind-elements.com/docs/standard/components/carousel/ -->
  <div>
    <div v-editable="blok">
      <div class="text-xl"> {{blok.headline}}</div>
      <div v-for="image in blok.image" :key="image.id">
        <img :src="image.filename" :alt="image.alt">
      </div>
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
  };
</script>

<style></style>
