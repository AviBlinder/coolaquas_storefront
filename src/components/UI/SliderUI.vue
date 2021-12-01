<!-- https://github.com/vueform/slider -->
<template>
  <div>
    <Slider
      class="slider-blue"
      id="priceSlider"
      v-model="sliderModel.value"
      :min="min"
      :max="max"
      :format="{ prefix: '$', decimals: 2 }"      
      >
      
</Slider>
  </div>
</template>

<script>
  import Slider from '@vueform/slider';
  import {computed} from 'vue'
  export default {
    components: {
      Slider,
    },

    props: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 1000
      }
    },

    setup(props){
        console.log("props: ", props)
           let sliderModel = {}
          sliderModel.value = computed( () => 
          {
            return [props.min,props.max]
          }
          )
        

        return {sliderModel}
    }
  }
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style>
  .slider-blue {
    --slider-connect-bg: #3b82f6;
    --slider-tooltip-bg: rgb(128, 126, 0);
    --slider-handle-ring-color: yellow;
  }
</style>
