const propBinders = [
  {
    fullform: 'v-bind:',
    shortform: ':',
  },
  {
    fullform: 'v-on:',
    shortform: '@',
  },
  {
    fullform: 'v-slot',
    shortform: '#',
  },
]

const lifecycleHooks = [
  {
    label: 'ref',
    attribute: 'ref',
    default_value: 'elref',
  },
  {
    label: '@vue:mounted',
    attribute: 'v-on:vue:mounted',
    default_value: 'myFunc()',
  },
  {
    label: '@vue:updated',
    attribute: 'v-on:vue:updated',
    default_value: 'myFunc()',
  },
  {
    label: '@vue:unmounted',
    attribute: 'v-on:vue:unmounted',
    default_value: 'myFunc()',
  },
]

// https://vuejs.org/api/built-in-directives.html (15)
const directives = [
  {
    label: 'v-for',
    attribute: 'v-for',
    default_value: '(val, index) in 4',
  },
  {
    label: 'key',
    attribute: ':key',
    default_value: 'index',
  },
  // Sets display:none, remains in DOM, doesn't support <template> tag, also doesn't work with v-else
  {
    label: 'v-show',
    attribute: 'v-show',
    default_value: 'true',
  },
  {
    label: 'v-if',
    attribute: 'v-if',
    default_value: 'true',
  },
  {
    label: 'v-else',
    attribute: 'v-else',
    default_value: 'true',
  },
  {
    label: 'v-else-if',
    attribute: 'v-else-if',
    default_value: 'true',
  },
  {
    label: 'v-model',
    attribute: 'v-model',
    default_value: 'msg',
  },
  {
    label: 'v-text',
    attribute: 'v-text',
    default_value: '`v-text`',
  },
  {
    label: 'v-html',
    attribute: 'v-html',
    default_value: '`<span>v-html</span>`',
  },
  {
    label: 'v-cloak',
    attribute: 'v-cloak',
    default_value: '',
  },
  {
    label: 'v-pre',
    attribute: 'v-pre',
    default_value: '',
  },
  {
    label: 'v-memo',
    attribute: 'v-memo',
    default_value: '[]',
  },
  {
    label: 'v-once',
    attribute: 'v-once',
    default_value: '',
  },
  {
    label: 'v-bind attr',
    attribute: 'v-bind:attr',
    default_value: '{}',
  },
  {
    label: 'v-bind object',
    attribute: 'v-bind',
    default_value: '{}',
  },
  {
    label: 'v-bind class',
    attribute: ':class',
    default_value: "{ 'my-class': true }",
  },
  {
    label: 'v-bind class array',
    attribute: ':class',
    default_value: "[isActive ? 'active-class' : '', 'error-class']",
  },
  {
    label: 'v-bind style',
    attribute: ':style',
    default_value: "{ 'font-size': '13px' }",
  },
  {
    label: 'v-bind style array',
    attribute: ':style',
    default_value:
      "[setFontBaseSize ? '{ font-size: '13px'}' : '', '{ color: 'gray'}']",
  },
  // https://vuejs.org/guide/essentials/template-syntax.html#modifiers
  // TODO: Needs further customisation
  {
    label: 'v-on:click',
    attribute: 'v-on:click',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:click.once',
    attribute: 'v-on:click.once',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:click.prevent',
    attribute: 'v-on:click.prevent',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:click.stop',
    attribute: 'v-on:click.stop',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:blur',
    attribute: 'v-on:blur',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:submit',
    attribute: 'v-on:submit',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:submit.prevent',
    attribute: 'v-on:submit.prevent',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:mouseover',
    attribute: 'v-on:mouseover',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:mouseenter',
    attribute: 'v-on:mouseenter',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:mouseleave',
    attribute: 'v-on:mouseleave',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:keyup.enter',
    attribute: 'v-on:keyup.enter',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:keydown.enter',
    attribute: 'v-on:keyup.enter',
    default_value: 'myFunc()',
  },
  {
    label: 'v-slot default',
    attribute: 'v-slot:default',
    default_value: '',
  },
  {
    label: 'v-slot with slotName',
    attribute: 'v-slot:slotName',
    default_value: '',
  },
  {
    label: 'v-slot with props',
    attribute: 'v-slot',
    default_value: '{}',
  },
]

export { propBinders, lifecycleHooks, directives }

const defaultExport = { propBinders, lifecycleHooks, directives }
export default defaultExport
