<template>
  <div>
    <div v-editable="blok">
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

<style>
</style>
