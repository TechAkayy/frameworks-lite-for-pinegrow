import petiteVueDirectives from './directives.js'
import petiteVueInjectScripts from './scripts.js'
import petiteVueSamples from './samples/index.js'

const framework = {
  name: 'petite-vue',
  label: 'Petite Vue',
  prefix: 'Pt',
  directives: petiteVueDirectives,
  cdnScripts: petiteVueInjectScripts,
  samples: petiteVueSamples,
  helptext: `Petite-Vue is DOM-based (doesn't use Virtual-DOM like Standard Vue), small, and optimized for progressive enhancement.`,
}

export { framework }
export default framework
