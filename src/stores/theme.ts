// imports
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

/**
 * @returns Global Theme
 * @returns Toggle theme function
 */
export const useThemeStore = defineStore('theme', () => {
  const theme = ref('')

  const localStorage = window.localStorage.getItem('theme') as string

  if (window.localStorage.getItem('theme')) {
    theme.value = localStorage
  } else {
    theme.value = 'light'
  }

  function updateLocalStorage() {
    window.localStorage.setItem('theme', theme.value.toString())
  }

  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    updateLocalStorage()
  }

  return { theme, toggleTheme }
})
