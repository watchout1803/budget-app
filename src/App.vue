<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';

import { useThemeStore } from './stores/theme'
const ThemeStore = useThemeStore()
const displayDrawer = ref(true)


</script>

<template>
  <v-app :theme="ThemeStore.theme">
    <v-app-bar>
      <template v-slot:prepend>
        <v-app-bar-nav-icon @click.stop="displayDrawer = !displayDrawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title>Budget App</v-app-bar-title>

      <v-btn class="headerButton themebtn" @click="ThemeStore.toggleTheme()">
        <v-icon>{{
          ThemeStore.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'
        }}</v-icon>
        <span class="text">{{ ThemeStore.theme === 'light' ? 'Light' : 'Dark' }}</span>
      </v-btn>
      <!-- <v-btn class="headerButton">
        <v-icon>mdi-login</v-icon>
        <span class="text">login</span>
      </v-btn> -->
    </v-app-bar>


    <!-- NAVIGATION BAR -->
    <v-navigation-drawer v-model="displayDrawer" expand-on-hover>
      <div class="parent">
        <v-list>
          <v-list-item prepend-icon="mdi-home" to="/">Home</v-list-item>
          <v-list-item prepend-icon="mdi-book" to="/about">About</v-list-item>
        </v-list>
      </div>
    </v-navigation-drawer>

    <!-- <v-main>
      <v-container fluid>
        <RouterView />
      </v-container>
    </v-main> -->
  </v-app>
</template>

<style scoped>

</style>
