import Alpine from 'alpinejs'

import { $fetch } from 'ofetch'

window.Alpine = Alpine
Alpine.data('searchBox', () => ({
  placeholder: 'Type.. eg, cake',
  searchText: '',
  results: [],
  init() {
    this.$watch('searchText', async (val) => {
      const results = await $fetch(
        `https://www.reddit.com/search.json?q=${val}`,
      )
      if (val) {
        this.results = results.data.children
      } else {
        this.results = []
      }
    })
  },
}))

Alpine.start()
