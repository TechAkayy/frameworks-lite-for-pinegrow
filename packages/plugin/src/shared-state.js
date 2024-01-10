import { reactive } from 'vue'
import { $menu } from './menu.js'

// VERY IMPORTANT - frameworksLiteState is used reactively by the Tutorial app, so any changes to this object has to be retrofitted in that project

export let frameworksLiteState = reactive({
  // state
  theme: 'dark',
  activeFramework: { name: 'petite-vue', label: 'Petite Vue' },
  isShortform: false,
  autoReloadOnUpdate: false,

  openMenu: function () {
    $menu.trigger('click')
  },

  copyToClipboard: function (content) {
    copyCodeToClipboard(content)
  },

  // state used to trigger actions in Pinegrow
  openUrl: function (url) {
    const isValidUrl = (urlString) => {
      try {
        return Boolean(new URL(urlString))
      } catch (err) {
        console.log(err)
        return false
      }
    }
    if (isValidUrl(url)) {
      pinegrow.openExternalUrl(url)
    }
  },
})
