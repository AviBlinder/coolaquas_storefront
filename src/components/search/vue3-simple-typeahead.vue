<template>
  <div :id="wrapperId" class="simple-typeahead">
    <input
      :id="inputId"
      class="simple-typeahead-input"
      type="text"
      :placeholder="placeholder"
      v-model="input"
      @input="onInput"
      @focus="onFocus"
      @blur="onBlur"
      @keydown.down.prevent="onArrowDown"
      @keydown.up.prevent="onArrowUp"
      @keydown.enter.tab.prevent="selectCurrentSelection"
      autocomplete="off"
    />
    <!-- Search Results block -->
    <div v-if="isListVisible" class="simple-typeahead-list">
      <div class="simple-typeahead-list-header" v-if="$slots['list-header']">
        <slot name="list-header"></slot>
      </div>
      <!-- Search results list -->
      <div
        class="simple-typeahead-list-item"
        :class="{
          'simple-typeahead-list-item-active': currentSelectionIndex == index,
        }"
        v-for="(item, index) in filteredItems"
        :key="index"
        @mousedown.prevent
        @click="selectItem(item)"
        @mouseenter="currentSelectionIndex = index">
        <!-- Search result - single items -->
        <div v-if="$slots['list-item-text']" class="simple-typeahead-list-item-text">
          <div 
          class="simple-typeahead-list-item-text-inner" 
          :data-text="itemProjection(item.name)">
            <slot
              name="list-item-text"
              :item="item.name"
              :itemProjection="itemProjection"
              :boldMatchText="boldMatchText"
            ></slot>
          </div>

            <div class="simple-typeahead-list-item-text-image">
              <img class="rounded-full border border-gray-100 shadow-sm"
                :src="item.content.images[0].filename"
                width="50"
                height="50"
              />
              <!-- <div class="absolute top-0 right-0 h-3 w-3 my-1 border-2 border-white rounded-full bg-green-400 z-2"></div>               -->
            </div>
        </div>
        <div v-else>
          <span
            class="simple-typeahead-list-item-text bg-secondary-700"
            :data-text="itemProjection(item.name)"
            v-html="boldMatchText(itemProjection(item.name))"
          ></span>
        </div>
      </div>
      <div class="simple-typeahead-list-footer" v-if="$slots['list-footer']">
        <slot name="list-footer"></slot>
      </div>
    </div>
  </div>
</template>

<script>
  import { defineComponent } from 'vue';
  import _ from 'lodash'
  export default /*#__PURE__*/ defineComponent({
    name: 'Vue3SimpleTypeahead',
    emits: ['onInput', 'onFocus', 'onBlur', 'selectItem'],
    props: {
      id: {
        type: String,
      },
      placeholder: {
        type: String,
        default: '',
      },
      items: {
        type: Array,
        required: true,
      },
      itemProjection: {
        type: Function,
        default(item) {
          return item;
        },
      },
      minInputLength: {
        type: Number,
        default: 2,
        validator: (prop) => {
          return prop >= 0;
        },
      },
    },
    created() {},
    data() {
      return {
        inputId:
          this.id || `simple_typeahead_${(Math.random() * 1000).toFixed()}`,
        input: '',
        isInputFocused: false,
        currentSelectionIndex: 0,
        debounceDelay: 250
      };
    },
    methods: {
      onInput () {
        // _.debounce( console.log() ,250)
        if (
          this.isListVisible &&
          _.debounce( function() 
          {this.currentSelectionIndex >= this.filteredItems.length},this.debounceDelay)
        ) {
          _.debounce( function() 
          {this.currentSelectionIndex = (this.filteredItems.length || 1) - 1},
          this.debounceDelay);
        }
      // this.$emit('onInput', { input: this.input, items: this.filteredItems })
      _.debounce(function() 
      {this.$emit('onInput', { input: this.input, items: this.filteredItems })},
      this.debounceDelay)
      },

      // 
      onFocus() {
        this.isInputFocused = true;
        this.$emit('onFocus', { input: this.input, items: this.filteredItems });
      },
      onBlur() {
        this.isInputFocused = false;
        this.$emit('onBlur', { input: this.input, items: this.filteredItems });
      },
      onArrowDown() {
        if (
          this.isListVisible &&
          this.currentSelectionIndex < this.filteredItems.length - 1
        ) {
          this.currentSelectionIndex++;
        }
        this.scrollSelectionIntoView();
      },
      onArrowUp() {
        if (this.isListVisible && this.currentSelectionIndex > 0) {
          this.currentSelectionIndex--;
        }
        this.scrollSelectionIntoView();
      },
      scrollSelectionIntoView() {
        setTimeout(() => {
          const list_node = document.querySelector(
            `#${this.wrapperId} .simple-typeahead-list`
          );
          const active_node = document.querySelector(
            `#${this.wrapperId} .simple-typeahead-list-item.simple-typeahead-list-item-active`
          );

          if (
            !(
              active_node.offsetTop >= list_node.scrollTop &&
              active_node.offsetTop + active_node.offsetHeight <
                list_node.scrollTop + list_node.offsetHeight
            )
          ) {
            let scroll_to = 0;
            if (active_node.offsetTop > list_node.scrollTop) {
              scroll_to =
                active_node.offsetTop +
                active_node.offsetHeight -
                list_node.offsetHeight;
            } else if (active_node.offsetTop < list_node.scrollTop) {
              scroll_to = active_node.offsetTop;
            }

            list_node.scrollTo(0, scroll_to);
          }
        });
      },
      selectCurrentSelection() {
        if (this.currentSelection) {
          this.selectItem(this.currentSelection);
        }
      },
      selectItem(item) {
        // this.input = this.itemProjection(item);
        this.input = ''
        this.currentSelectionIndex = 0;
        document.getElementById(this.inputId).blur();
        this.$emit('selectItem', item.slug);
      },
      escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      },
      boldMatchText(text) {
        const regexp = new RegExp(
          `(${this.escapeRegExp(this.input.name)})`,
          'ig'
        );
        return text.replace(regexp, '<strong>$1</strong>');
      },
    },
    computed: {
      wrapperId() {
        return `${this.inputId}_wrapper`;
      },
      filteredItems() {
        let regexp = '';
        if (typeof this.input === 'string') {
          regexp = new RegExp(this.escapeRegExp(this.input), 'i');
        } else {
          regexp = new RegExp(this.escapeRegExp(this.input.name), 'i');
        }
        return this.items.filter((item) =>
          this.itemProjection(item.name).match(regexp)
        );
      },
      isListVisible() {
        return (
          this.isInputFocused &&
          this.input.length >= this.minInputLength &&
          this.filteredItems.length
        );
      },
      currentSelection() {
        return this.isListVisible &&
          this.currentSelectionIndex < this.filteredItems.length
          ? this.filteredItems[this.currentSelectionIndex]
          : undefined;
      },
    },
  });
</script>

<style scoped>
  .simple-typeahead {
    @apply relative flex-col items-center
    /*  */
    /* @apply relative flex items-center flex-col justify-end z-40 mt-4 */
    /* position: relative;
    width: 100%;
    z-index: 40; */
  }
  .simple-typeahead > input {
    /* @apply mb-0 rounded-md shadow-sm */
    /* margin-bottom: 0; */
  }
  .simple-typeahead .simple-typeahead-list {
    @apply absolute top-11 ml-12 lg:ml-8 z-40 
  }
    /* w-1/3  */
    /* max-h-80  */
    /* overflow-y-auto   */
    /* border-b-2 border-t-2 border-solid border-bluegray-200    */   

  .simple-typeahead .simple-typeahead-list .simple-typeahead-list-header {
    background-color: #fafafa;
    /* padding: 0.6rem 1rem; */
    border-bottom: 0.1rem solid #d1d1d1;
    border-left: 0.1rem solid #d1d1d1;
    border-right: 0.1rem solid #d1d1d1;
  }
  .simple-typeahead .simple-typeahead-list .simple-typeahead-list-footer {
    background-color: transparent;
    padding: 0.6rem 1rem;
    border-left: 0.1rem solid #d1d1d1;
    border-right: 0.1rem solid #d1d1d1;
  }
  .simple-typeahead .simple-typeahead-list .simple-typeahead-list-item {
    @apply cursor-pointer bg-white p-1 mx-1 border-blue-200 
    border-t-2 border-b-2 
     border-l-2 border-r-2
     border-solid
    /* cursor: pointer;
    background-color: #ffffff;
    padding: 0.6rem 1rem;
    margin-left: 8rem;
    margin-right: 8rem;
    border-bottom: 0.1rem solid #d1d1d1;
    border-left: 0.1rem solid #d1d1d1;
    border-right: 0.1rem solid #d1d1d1; */
  }

.simple-typeahead .simple-typeahead-list .simple-typeahead-list-item .simple-typeahead-list-item-text {
/* @apply flex flex-1 justify-between	justify-items-center w-56; */
@apply flex flex-1 

}
.simple-typeahead-list-item-text .simple-typeahead-list-item-text-inner {
@apply ml-2 flex justify-start items-center
}

.simple-typeahead-list-item-text .simple-typeahead-list-item-text-image {
@apply ml-3 relative w-16 h-16 flex items-center
}
  .simple-typeahead
    .simple-typeahead-list
    .simple-typeahead-list-item:last-child {
    /* border-bottom: none; */
  }

  .simple-typeahead
    .simple-typeahead-list
    .simple-typeahead-list-item.simple-typeahead-list-item-active {
      @apply bg-blue-200
    /* background-color: #e1e1e1; */
  }
</style>
