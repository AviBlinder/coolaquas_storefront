<template>
  <div class="">
    <div class="pt-2 relative mx-auto text-gray-600">
Search field
    </div>
  </div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex'
  export default {
    components: {
    },
    async mounted() {
      if(this.getAllProducts.length === 0){
        await this.storyapi
          .get('cdn/stories' + '?starts_with=products', {
            version: 'published',
          })
          .then((response) => {
            this.setProducts(response.data.stories)
          })
          .catch((error) => {
            console.log(error);
          });
        }
    },
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters({getAllProducts:'products/getAllProducts'}),
        // return this.getAllProducts.length;
    },
    methods: {
      ...mapActions({setProducts:'products/setProducts'}),

    },
  };
</script>

<style scoped>
  @media screen and (min-width: 769px) {
    .expandFocus {
      width: 140%;
      /* transform: translateX(15%); */
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
    }
  }
  @media screen and (max-width: 768px) {
    .expandFocus {
      /* width: 100%; */
      /* transform: translateX(-15%); */
      -webkit-transition: all 0.4s ease-in-out;
      transition: all 0.4s ease-in-out;
    }
  }
</style>
