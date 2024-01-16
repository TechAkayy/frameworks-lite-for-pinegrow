import islandDirectives from './directives.js'
import islandInjectScripts from './scripts.js'

export const island = {
  name: 'is-land',
  label: '@11ty/is-land',
  directives: islandDirectives,
  cdnScripts: islandInjectScripts,
  packageRoot: '@11ty',
  packageFolderName: 'packages',
  helptext: `11ty/is-land is a web component that helps with progressive hydration (islands architecture) of interactive client-side components (framework independent).`,
}
