import islandDirectives from './directives.js'
import islandInjectScripts from './scripts.js'

export const island = {
  name: 'is-land',
  label: '@11ty/is-land',
  directives: islandDirectives,
  cdnScripts: islandInjectScripts,
  // ESM via cdn is available (https://github.com/11ty/is-land/issues/22), so no need to package, updated webpack config, scripts.js & index.js for src/island folder and menu.js modules
  // packageRoot: '@11ty',
  // packageFolderName: 'packages',
  helptext: `11ty/is-land is a web component that helps with progressive hydration (islands architecture) of interactive client-side components (framework independent).`,
}
