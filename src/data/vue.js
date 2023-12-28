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
  // https://vuejs.org/guide/essentials/template-syntax.html#modifiers
  // TODO: Needs further customisation
  {
    label: 'v-on:click',
    attribute: '@click',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:click.once',
    attribute: '@click.once',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:click.prevent',
    attribute: '@click.prevent',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:click.stop',
    attribute: '@click.stop',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:submit',
    attribute: '@submit',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:submit.prevent',
    attribute: '@submit.prevent',
    default_value: 'myFunc()',
  },
  {
    label: 'v-on:keyup.enter',
    attribute: '@keyup.enter',
    default_value: 'myFunc()',
  },
  {
    label: 'v-model',
    attribute: 'v-model',
    default_value: 'message',
  },
  {
    label: 'v-slot default',
    attribute: 'v-slot:default',
    default_value: 'true',
  },
  {
    label: 'v-slot with slotName',
    attribute: 'v-slot:slotName',
    default_value: 'true',
  },
  {
    label: 'v-slot with props',
    attribute: 'v-slot',
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
  {
    label: 'v-pre',
    attribute: 'v-pre',
    default_value: 'true',
  },
  {
    label: 'v-once',
    attribute: 'v-once',
    default_value: 'true',
  },
  {
    label: 'v-cloak',
    attribute: 'v-cloak',
    default_value: 'true',
  },
  {
    label: 'v-memo',
    attribute: 'v-memo',
    default_value: '[]',
  },
  {
    label: 'v-html',
    attribute: 'v-html',
    default_value: '`<span>v-html</span>`',
  },
  {
    label: 'v-text',
    attribute: 'v-text',
    default_value: '`v-text`',
  },
]

export default directives
