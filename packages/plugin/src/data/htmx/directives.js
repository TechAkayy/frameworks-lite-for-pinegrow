const propBinders = []

const lifecycleHooks = []

// https://htmx.org/reference
const directives = [
  {
    label: 'hx-get',
    attribute: 'hx-get',
    default_value: '/api/data',
  },
  {
    label: 'hx-post',
    attribute: 'hx-post',
    default_value: '/api/submit',
  },
  {
    label: 'hx-put',
    attribute: 'hx-put',
    default_value: '/api/update',
  },
  {
    label: 'hx-delete',
    attribute: 'hx-delete',
    default_value: '/api/delete',
  },
  {
    label: 'hx-patch',
    attribute: 'hx-patch',
    default_value: '/api/patch',
  },
  {
    label: 'hx-target',
    attribute: 'hx-target',
    default_value: '#result',
  },
  {
    label: 'hx-swap',
    attribute: 'hx-swap',
    default_value: 'innerHTML',
  },
  {
    label: 'hx-trigger',
    attribute: 'hx-trigger',
    default_value: 'click',
  },
  {
    label: 'hx-trigger with delay',
    attribute: 'hx-trigger',
    default_value: 'input changed delay:300ms',
  },
  {
    label: 'hx-select',
    attribute: 'hx-select',
    default_value: '#content',
  },
  {
    label: 'hx-vals',
    attribute: 'hx-vals',
    default_value: '{"key":"value"}',
  },
  {
    label: 'hx-headers',
    attribute: 'hx-headers',
    default_value: '{"X-CSRF-Token":"your-token"}',
  },
  {
    label: 'hx-params',
    attribute: 'hx-params',
    default_value: 'email,password',
  },
  {
    label: 'hx-confirm',
    attribute: 'hx-confirm',
    default_value: 'Are you sure?',
  },
  {
    label: 'hx-indicator',
    attribute: 'hx-indicator',
    default_value: '#loading',
  },
  {
    label: 'hx-disabled-elt',
    attribute: 'hx-disabled-elt',
    default_value: 'this',
  },
  {
    label: 'hx-boost',
    attribute: 'hx-boost',
    default_value: 'true',
  },
  {
    label: 'hx-push-url',
    attribute: 'hx-push-url',
    default_value: 'true',
  },
  {
    label: 'hx-replace-url',
    attribute: 'hx-replace-url',
    default_value: 'true',
  },
  {
    label: 'hx-preserve',
    attribute: 'hx-preserve',
    default_value: 'true',
  },
  {
    label: 'hx-sync',
    attribute: 'hx-sync',
    default_value: 'closest form:abort',
  },
  {
    label: 'hx-encoding',
    attribute: 'hx-encoding',
    default_value: 'multipart/form-data',
  },
  {
    label: 'hx-ext',
    attribute: 'hx-ext',
    default_value: 'preload',
  },
]

export { propBinders, lifecycleHooks, directives }
const defaultExport = { propBinders, lifecycleHooks, directives }
export default defaultExport
