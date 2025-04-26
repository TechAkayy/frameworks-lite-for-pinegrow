import standardVueDirectives from './directives.js'
import standardVueInjectScripts from './scripts.js'
// import standardVueSamples from './samples/index.js'

const framework = {
  name: 'standard-vue',
  label: 'Standard Vue',
  prefix: 'Vue',
  directives: standardVueDirectives,
  cdnScripts: standardVueInjectScripts,
  samples: [],
  helptext: `Unlike Petite-Vue, Standard-Vue ships a template compiler, uses a Virtual-DOM, has vue-devtools support, optimized for next-level progressive enhancement.`,
}

export { framework }
export default framework
