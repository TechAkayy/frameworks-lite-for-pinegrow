const app = `<script type="module" data-pg-name="Dark-Mode-Pt-App">
  import { createApp } from 'https://unpkg.com/petite-vue?module'

  const state = {
    // state exposed to all expressions within v-scope regions
    darkMode: null,
    // methods
    isDarkMode() {
      return (
        localStorage.getItem('vueuse-color-scheme') === 'dark' ||
        (!localStorage.getItem('vueuse-color-scheme') &&
          window.matchMedia('(prefers-color-scheme: dark)')
            .matches)
      )
    },
    initDarkMode() {
      this.darkMode = this.isDarkMode()
    },
    applyDarkMode() {
      if (this.darkMode !== null) {
        localStorage.setItem(
          'vueuse-color-scheme',
          this.darkMode ? 'dark' : 'light'
        )
        document.documentElement.classList.toggle(
          'dark',
          this.darkMode
        )
      }
    },
  }

  createApp(state).mount(__MOUNT_POINT__)
</script>`

const scope = `<label data-pg-name="Dark-Mode-Pt-Scope"__MOUNT_POINT__ class="cursor-pointer inline-flex items-center mr-4" v-scope="{}">
    <input type="checkbox" value="" class="sr-only peer" v-model="darkMode" v-on:vue:mounted="initDarkMode()" v-effect="darkMode, applyDarkMode()"/>
    <span class="after:absolute after:bg-white after:border after:border-gray-300 after:content-[''] after:h-5 after:rounded-full after:start-[2px] after:top-[2px] after:transition-all after:w-5 bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:peer-focus:ring-primary-800 h-6 peer peer-checked:after:border-white peer-checked:after:translate-x-full peer-checked:bg-primary-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-secondary-300 relative rounded-full rtl:peer-checked:after:-translate-x-full w-11"></span>
</label>`

const globalApp = [
  {
    injectTo: 'body-prepend',
    app: app
      .replace('__MOUNT_POINT__', '')
      .replace(
        'data-pg-name="Dark-Mode-Pt-App"',
        'data-pg-name="Global-Pt-App"',
      ),
    scope: scope.replace('__MOUNT_POINT__', ''),
    code: `${app
      .replace('__MOUNT_POINT__', '')
      .replace(
        'data-pg-name="Dark-Mode-Pt-App"',
        'data-pg-name="Global-Pt-App"',
      )}
  ${scope.replace('__MOUNT_POINT__', '')}`,
  },
]

const island = [
  {
    injectTo: 'body-prepend',
    app: app.replace('__MOUNT_POINT__', '"#dark-mode"'),
    scope: scope.replace('__MOUNT_POINT__', ' id="dark-mode"'),
    code: `<div data-pg-name="Dark-Mode-Pt-Island">
    ${app.replace('__MOUNT_POINT__', '"#dark-mode"')}
    ${scope.replace('__MOUNT_POINT__', ' id="dark-mode"')}
</div>`,
  },
]

const sample = {
  name: 'dark-mode-toggle', //
  label: 'Dark Mode Toggle',
  helptext: 'Added to start of body tag.',
  globalApp,
  island,
}

export { sample }
export default sample
