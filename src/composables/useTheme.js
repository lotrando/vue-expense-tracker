import { ref, watch, onMounted } from 'vue'

export function useTheme() {
  const isDark = ref(false)

  // Načti theme při mount
  onMounted(() => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      isDark.value = savedTheme === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }

    // Aplikuj theme
    applyTheme()
  })

  // Sleduj změny
  watch(isDark, () => {
    applyTheme()
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
  })

  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
  }

  const toggleTheme = () => {
    isDark.value = !isDark.value
  }

  return {
    isDark,
    toggleTheme
  }
}
