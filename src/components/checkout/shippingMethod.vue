<template>
  <div>
    <!-- border-t border-gray-200 pt-10 -->
          <div class="mt-2 ">
            <RadioGroup v-model="selectedDeliveryMethod">
              <RadioGroupLabel class="text-lg font-medium text-gray-900">
              </RadioGroupLabel>

              <div class="mt-4 grid grid-cols-3 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
                <RadioGroupOption as="template" v-for="deliveryMethod in deliveryMethods" :key="deliveryMethod.id" :value="deliveryMethod" v-slot="{ checked, active }">
                  <div :class="[checked ? 'border-transparent' : 'border-gray-300', active ? 'ring-2 ring-secondary-500' : '', 'relative bg-white border rounded-lg shadow-sm p-4 flex cursor-pointer focus:outline-none']">                    
                    <div class="flex-1 flex"
                    >
                      <div class="flex flex-col">
                        <RadioGroupLabel as="span" class="block text-sm font-medium text-gray-900">
                          {{ deliveryMethod.title }}
                        </RadioGroupLabel>
                        <RadioGroupDescription as="span" class="mt-1 flex items-center text-sm text-gray-500">
                          {{ deliveryMethod.turnaround }}
                        </RadioGroupDescription>
                        <RadioGroupDescription 
                        v-if="deliveryMethod.price > 0"
                        as="span" class="mt-6 text-sm font-medium text-gray-900">
                          {{ deliveryMethod.price }}  {{deliveryMethod.currency}}
                        </RadioGroupDescription>
                        <RadioGroupDescription 
                        v-else
                        as="span" class="mt-6 text-sm font-medium text-gray-900">
                          Free
                        </RadioGroupDescription>
                      </div>
                    </div>
                    <CheckCircleIcon v-if="checked" class="h-5 w-5 text-secondary-600" aria-hidden="true" />
                    <div :class="[active ? 'border' : 'border-2', checked ? 'border-secondary-500' : 'border-transparent', 'absolute -inset-px rounded-lg pointer-events-none']" aria-hidden="true" />
                  </div>
                </RadioGroupOption>
              </div>
            </RadioGroup>
          </div>

  </div>
</template>
<script>
import {ref, computed, watch} from 'vue'
import {useStore} from 'vuex';

import { RadioGroup, RadioGroupDescription, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue'
import { CheckCircleIcon } from '@heroicons/vue/solid'

export default {
  components: {
    RadioGroup,
    RadioGroupDescription,
    RadioGroupLabel,
    RadioGroupOption,
    CheckCircleIcon,
  },
  setup() {
    const store = useStore()

    const selectedDeliveryMethod = ref(0)

    watch(selectedDeliveryMethod,(currentValue) => {
      store.dispatch('cart/setShippingCost',parseInt(currentValue.price))
      store.dispatch('cart/setShippingType',currentValue.name)

    })

    return {
      selectedDeliveryMethod,
      deliveryMethods : computed(() => store.getters['general/getDeliveryMethods']),
    }
  },

}
</script>

<style>

</style>