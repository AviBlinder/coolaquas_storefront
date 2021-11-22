<template>
<div>
  <vue-bootstrap-typeahead
    class="mb-4"
    v-model="query"
    :data="users"
    :serializer="item => item.login"
    placeholder="Search GitHub Users"
    prepend="Username:"
    @hit="searchRepositories"
  >

<!-- Append a button -->
<template v-slot:append>
  <button @click="searchRepositories" class="btn btn-primary">
  Search
  </button>
</template>

<!-- Begin custom suggestion slot -->
<template v-slot:suggestion="{ data, htmlText }">
  <div class="d-flex align-items-center">
    <img
      class="rounded-circle"
      :src="data.avatar_url"
      style="width: 40px; height: 40px;" />

    <!-- Note: the v-html binding is used, as htmlText contains
         the suggestion text highlighted with <strong> tags -->
    <span class="ml-4" v-html="htmlText"></span>
    <i class="ml-auto fab fa-github-square fa-2x"></i> 
  </div>
</template>

</vue-bootstrap-typeahead>

 <h3>Search Users Repositories</h3>
 <pre>{{ stringify }}</pre>
</div>
</template>

<script>
import _ from 'lodash'
import axios from 'axios'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

export default {
  components: {
    VueBootstrapTypeahead
  },
  data() {
    return {
      query: '',
      userRepositories: {},
      users: []
    }
  },
  computed: {
    stringify() {
      return JSON.stringify(this.userRepositories, null, 2)
    }

  },
  methods: {
    searchUsers(newQuery) {
      axios.get(`https://api.github.com/search/users?q=${newQuery}`)
        .then((res) => {
          console.log(res.data)
          this.users = res.data.items
        })
    },
    searchRepositories() {
      axios.get(`https://api.github.com/search/repositories?q=user:${this.query}`)
        .then(res => {
          this.userRepositories = res.data
        })
    }
  },
  watch: {
    // When the query value changes, fetch new results from
    // the API - debounce the search to avoid hitting the API limits
    query: _.debounce(function(newQuery) { this.searchUsers(newQuery) }, 250)
  },
}
</script>

<style>

</style>