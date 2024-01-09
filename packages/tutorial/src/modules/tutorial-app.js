import { createApp, reactive } from 'https://unpkg.com/petite-vue?module'

export const tutorialPanelState = reactive({
  // state
  theme: 'dark',
  activeFramework: { name: 'petite-vue', label: 'Petite vue' },
  isShortform: false,
  autoReloadOnUpdate: false,

  openMenu: function () {
    // $menu.trigger('click')
    console.log('open menu')
  },

  copyToClipboard: function (content) {
    console.log(content)
  },

  openUrl: function (url) {
    console.log(url)
  },
})

const store = {
  tutorialPanelState,
  // exposed to all expressions
  count: 0,
  // getters
  get plusOne() {
    return this.count + 1
  },
  // methods
  inc() {
    this.count++
  },
}

createApp(store).mount('div#app1')

// if (import.meta.env.DEV) {
//   tutorialPanelState.config = dataRaw.config
//   tutorialPanelState.tutorials = dataRaw.tutorials
// }

if (!window.tutorialPanelState) {
  window.tutorialPanelState = tutorialPanelState
}
