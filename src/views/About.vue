<template>
  <div style="width: 450px;height:600px;  margin-left: 20rem">
    <div style="display: block">
      <label for="rangeFrom"> Start Price </label>
      <input id="rangeFrom" type="number" v-model="sliderModel.value[0]" />
    </div>
    <div style="display: block; margin-top: 10px">
      <label for="rangeFrom"> End Price </label>
      <input id="rangeFrom" type="number" v-model="sliderModel.value[1]" />
    </div>

    <div style="margin-top: 50px; display: block; margin-top: 10px;">
      <SliderUI></SliderUI>
    </div>
  </div>
</template>

<script>
import SliderUI from '@/components/UI/SliderUI.vue'

  export default {
    components: {
      SliderUI
    },
    data() {
      return {
    sliderModel: {
      value: [0, 100]
    },        
      }
    }
  }
</script>

