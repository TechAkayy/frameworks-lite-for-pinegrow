import htmxDirectives from './directives.js'
import htmxInjectScripts from './scripts.js'
// import htmxSamples from './samples/index.js'

const framework = {
  name: 'htmx',
  label: 'HTMX',
  prefix: 'HTMX',
  directives: htmxDirectives,
  cdnScripts: htmxInjectScripts,
  samples: [],
  helptext:
    'HTMX extends HTML with powerful attributes, enabling dynamic interactions and server-driven updates without writing JavaScript.',
}

export { framework }
export default framework
