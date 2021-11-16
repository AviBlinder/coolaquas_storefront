<template>
  <div>
    <div v-editable="blok">
      <div>
        <component
          v-for="comp in blok.slide"
          :key="comp._uid"
          :blok="comp"
          :is="comp.component"
        ></component>
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
