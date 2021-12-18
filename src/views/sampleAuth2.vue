<template>
  <authenticator>
      <!-- <authenticator :login-mechanisms="['email ']"> -->
    <template v-slot="{ user, signOut }">
      <h1>Hello {{ user.username }}!</h1>
      <button @click="signOut">Sign Out</button>
    </template>
  </authenticator>
</template>

// SignUp Attributes:
  // <authenticator :sign-up-attributes="[
  //   'address',
  //   'birthdate',
  //   'email',
  //   'family_name',
  //   'gender',
  //   'given_name',
  //   'locale',
  //   'middle_name',
  //   'name',
  //   'nickname',
  //   'phone_number',
  //   'picture',
  //   'preferred_username',
  //   'profile',
  //   'updated_at',
  //   'website',
  //   'zoneinfo', ]"
  //   />

// social providers:
  // <authenticator :social-providers="['amazon', 'apple', 'facebook', 'google']">
  //   <template v-slot="{ user, signOut }">
  //     <h1>Hello {{ user.username }}!</h1>
  //     <button @click="signOut">Sign Out</button>
  //   </template>
  // </authenticator>
