// https://github.com/vuejs/petite-vue#features (4 + 15 from Vue)
import vueDirectives from './vue.js'
const directives = [
  {
    label: 'v-scope',
    attribute: 'v-scope',
    default_value: 'true',
  },
  {
    label: 'v-effect',
    attribute: 'v-effect',
    default_value: 'true',
  },
  {
    label: '@vue:mounted',
    attribute: '@vue:mounted',
    default_value: 'myFunc()',
  },
  {
    label: '@vue:unmounted',
    attribute: '@vue:unmounted',
    default_value: 'myFunc()',
  },
  ...vueDirectives,
]

export default directives
