import alpinejsDirectives from './directives.js'
import alpinejsInjectScripts from './scripts.js'
// import alpinejsSamples from './samples/index.js'

const framework = {
  name: 'alpinejs',
  label: 'Alpinejs',
  prefix: 'Alpinejs',
  directives: alpinejsDirectives,
  cdnScripts: alpinejsInjectScripts,
  samples: [],
  helptext:
    'Alpinejs is similar to Petite-Vue but includes additional features such as plugins, transitions, design blocks, and is npm installable.',
}

export { framework }
export default framework
