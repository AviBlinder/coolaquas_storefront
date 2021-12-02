<!-- https://github.com/vueform/slider -->
<template>
  <div>
    <Slider
      class="slider-blue"
      id="priceSlider"
      v-model="sliderModel.value"
      @update="sliderUpdate"
      :min="min"
      :max="max"
      :format="{ prefix: currencySign, decimals: decimals }"      
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
      },
      currencySign: {
        type: String,
        default: '$ '
      },
      decimals: {
        type: Number,
        default: 0
      }
    },

    setup(props,context){
         let sliderModel = {}
          sliderModel.value = computed( () => 
          {
            return [props.min,props.max]
          }
          )
    const sliderUpdate = (e) => {
      // eslint-disable-next-line vue/no-mutating-props
      // props.min = e[0]
      // eslint-disable-next-line vue/no-mutating-props
      // props.max = e[1]
      context.emit('priceRange-update', e);

    }
        

        return {sliderModel,sliderUpdate}
    }
  }
</script>

<style src="@vueform/slider/themes/default.css"></style>

<style>
  .slider-blue {
  --slider-connect-bg: #25962e;
  --slider-tooltip-bg: #423e3ec4;
  --slider-handle-ring-color: rgba(254, 240, 138, var(--tw-bg-opacity));
  --slider-tooltip-font-size: 0.675rem;
  --slider-tooltip-line-height: 0.85rem;
  --slider-tooltip-font-weight: 500;
  --slider-tooltip-min-width: 16px;
  --slider-tooltip-bg-disabled: #9CA3AF;
  --slider-tooltip-color: #fff;
  --slider-tooltip-radius: 5px;
  --slider-tooltip-py: 2px;
  --slider-tooltip-px: 2px;
  --slider-tooltip-arrow-size: 5px;
  --slider-tooltip-distance: 3px;

  }
</style>
