// https://alpinejs.dev/directives/data (15)
const directives = [
  {
    label: 'x-data',
    attribute: 'x-data',
    default_value: "{ foo: 'bar' }",
  },
  {
    label: 'x-init',
    attribute: 'x-init',
    default_value: 'true',
  },
  // Sets display:none, remains in DOM, doesn't support <template> tag, also doesn't work with x-else
  {
    label: 'x-show',
    attribute: 'x-show',
    default_value: 'true',
  },
  {
    label: 'x-bind attribute',
    attribute: ':placeholder',
    default_value: 'placeholder',
  },
  {
    label: 'x-bind object',
    attribute: 'x-bind',
    default_value: '{}',
  },
  {
    label: 'x-bind class',
    attribute: ':class',
    default_value: "{ 'my-class': true }",
  },
  {
    label: 'x-bind class array',
    attribute: ':class',
    default_value: "[isActive ? 'active-class' : '', 'error-class']",
  },
  {
    label: 'x-bind style',
    attribute: ':style',
    default_value: "{ 'font-size': '13px' }",
  },
  {
    label: 'x-bind style array',
    attribute: ':style',
    default_value:
      "[setFontBaseSize ? '{ font-size: '13px'}' : '', '{ color: 'gray'}']",
  },
  // https://vuejs.org/guide/essentials/template-syntax.html#modifiers
  // TODO: Needs further customisation
  {
    label: 'x-on:click',
    attribute: '@click',
    default_value: 'myFunc()',
  },
  {
    label: 'x-on:click.once',
    attribute: '@click.once',
    default_value: 'myFunc()',
  },
  {
    label: 'x-on:click.prevent',
    attribute: '@click.prevent',
    default_value: 'myFunc()',
  },
  {
    label: 'x-on:click.stop',
    attribute: '@click.stop',
    default_value: 'myFunc()',
  },
  {
    label: 'x-on:submit',
    attribute: '@submit',
    default_value: 'myFunc()',
  },
  {
    label: 'x-on:submit.prevent',
    attribute: '@submit.prevent',
    default_value: 'myFunc()',
  },
  {
    label: 'x-on:keyup.enter',
    attribute: '@keyup.enter',
    default_value: 'myFunc()',
  },
  {
    label: 'x-text',
    attribute: 'x-text',
    default_value: '`x-text`',
  },
  {
    label: 'x-html',
    attribute: 'x-html',
    default_value: '`<span>x-html</span>`',
  },
  {
    label: 'x-model',
    attribute: 'x-model',
    default_value: 'message',
  },
  {
    label: 'x-modelable',
    attribute: 'x-modelable',
    default_value: 'count',
  },
  {
    label: 'x-for',
    attribute: 'x-for',
    default_value: 'index in 4',
  },
  {
    label: 'key',
    attribute: ':key',
    default_value: 'index',
  },
  {
    label: 'x-transition',
    attribute: 'x-transition',
    default_value: 'true',
  },
  {
    label: 'x-effect',
    attribute: 'x-effect',
    default_value: 'true',
  },
  {
    label: 'x-if',
    attribute: 'x-if',
    default_value: 'true',
  },
  {
    label: 'x-ref',
    attribute: 'x-ref',
    default_value: 'textnode',
  },
  {
    label: 'x-cloak',
    attribute: 'x-cloak',
    default_value: 'true',
  },
  {
    label: 'x-teleport',
    attribute: 'x-teleport',
    default_value: 'body',
  },
  {
    label: 'x-if',
    attribute: 'x-if',
    default_value: 'true',
  },
  {
    label: 'x-id',
    attribute: 'x-id',
    default_value: "['text-input']",
  },
]

export default directives
