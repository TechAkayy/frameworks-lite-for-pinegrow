import islandDirectives from './directives.js'
import islandInjectScripts from './scripts.js'
import islandSamples from './samples/index.js'
import { globalAppType, islandAppType } from '../index.js'

const framework = {
  name: 'is-land',
  label: '@11ty/is-land',
  headers: [
    `Progressive Loading and Hydration - When to load & hydrate islands`,
  ],
  directives: islandDirectives,
  cdnScripts: islandInjectScripts,
  appTypes: [
    { name: globalAppType.name, label: globalAppType.label },
    { name: islandAppType.name, label: islandAppType.label },
  ],
  samples: islandSamples,
  helptext: `11ty/is-land is a web component that helps with progressive hydration (islands architecture) of interactive client-side components (framework independent).`,
}

export { framework }
export default framework
