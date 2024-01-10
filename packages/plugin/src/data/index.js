import petiteVueDirectives from './directives/petite-vue.js'
import alpinejsDirectives from './directives/alpinejs.js'
import standardVueDirectives from './directives/standard-vue.js'

import petiteVueInjectScripts from './scripts/petite-vue.js'
import alpinejsInjectScripts from './scripts/alpinejs.js'
import standardVueInjectScripts from './scripts/standard-vue.js'

export const frameworks = [
  {
    name: 'petite-vue',
    label: 'Petite Vue',
    directives: petiteVueDirectives,
    cdnScripts: petiteVueInjectScripts,
    helptext: `Petite-Vue is DOM-based (doesn't use Virtual-DOM like Standard Vue), small, and optimized for progressive enhancement.`,
  },
  {
    name: 'alpinejs',
    label: 'Alpinejs',
    directives: alpinejsDirectives,
    cdnScripts: alpinejsInjectScripts,
    helptext:
      'Alpinejs is similar to Petite-Vue but includes additional features such as plugins, transitions, design blocks, and is npm installable.',
  },
  {
    name: 'standard-vue',
    label: 'Standard Vue',
    directives: standardVueDirectives,
    cdnScripts: standardVueInjectScripts,
    helptext: `Unlike Petite-Vue, Standard-Vue ships a template compiler, uses a Virtual-DOM, has vue-devtools support, optimized for next-level progressive enhancement.`,
  },
]
