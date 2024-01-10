// https://github.com/vuejs/petite-vue#features (4 + 15 from Vue)
import {
  propBinders as vuePropBinder,
  lifecycleHooks as vueLifecycleHooks,
  directives as standardVueDirectives,
} from './standard-vue.js'

const propBinders = vuePropBinder.filter(
  (binder) => binder.fullform !== 'v-slot',
)

// petite-vue doesn't have updated hook
const lifecycleHooks = vueLifecycleHooks.filter(
  (directive) =>
    directive.label !== '@vue:updated' &&
    directive.label !== 'v-on:vue:updated',
)

const directives = [
  {
    label: 'v-scope',
    attribute: 'v-scope',
    default_value: '{}',
  },
  {
    label: 'v-scope with state',
    attribute: 'v-scope',
    default_value: "{ msg: 'Happy Life!' }",
  },
  {
    label: 'v-effect',
    attribute: 'v-effect',
    default_value: 'true',
  },
  // Filter out v-slot directives as petite-vue doesn't support them
  ...standardVueDirectives.filter(
    (directive) => !directive.label.startsWith('v-slot'),
  ),
]

export { propBinders, lifecycleHooks, directives }
const defaultExport = { propBinders, lifecycleHooks, directives }
export default defaultExport
