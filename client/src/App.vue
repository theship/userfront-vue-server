<script setup>
import { watchEffect } from 'vue';
import Userfront from '@userfront/toolkit/vue';
import { useStore } from 'vuex';

const store = useStore();

watchEffect(() => {
  if (Userfront.accessToken()) {
    store.dispatch('fetchAdminStatus', Userfront.accessToken());
  } else {
    store.commit('setAdmin', false);
  }
});
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/signup">Signup</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/reset">Reset</RouterLink>
        <RouterLink to="/dashboard">Dashboard</RouterLink>
        <RouterLink v-if="store.state.isAdmin" to="/admin">Admin Panel</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
