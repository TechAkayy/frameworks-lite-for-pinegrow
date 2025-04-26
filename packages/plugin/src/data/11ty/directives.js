// https://github.com/11ty/is-land#usage (5)
const directives = [
  {
    label: 'whenIdle',
    attribute: 'on:idle',
    default_value: 'true',
  },
  {
    label: 'whenVisible',
    attribute: 'on:visible',
    default_value: 'true',
  },
  {
    label: 'onMediaQuery',
    attribute: 'on:media',
    default_value: 'screen and (min-width: 600px)',
  },
  {
    label: 'onInteraction',
    attribute: 'on:interaction',
    default_value: 'touchstart,click',
  },
  {
    label: 'onSaveData',
    attribute: 'on:save-data',
    default_value: 'true',
  },
]

export { directives }

const defaultExport = { directives }
export default defaultExport
