import { __SLOT3__ } from './standard-vue.js'

const emptyState = `const globalState = {
  // state exposed to all expressions across the page
}
`

const sampleState = `const globalState = {
  // state exposed to all expressions across the page
  count: 0, 
  msg: 'Happy Life!',
  get oddOrEven() { 
      return this.count%2===0? 'even' : 'odd' // computed property
  },
  // methods
  increment() {
      this.count++
  },
  decrement() {
      this.count--
  }
}
`

const sampleScope = `<div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;" >
    <button x-on:click="decrement" style="margin-left: 4px; margin-right: 4px;">⬇️</button>
    <button x-on:click="increment" style="margin-left: 4px; margin-right: 4px;">⬆️</button>
    <div style="text-align: left; width: 180px; margin-left: 4px;"><span>Count is: </span><span x-cloak style="width: 30px; display: inline-block; text-align: center;" x-text="count"></span>
        <span x-cloak x-text="\`(\${oddOrEven})\`"></span>
    </div>
</div><div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center; flex-direction: column;">
    <input x-model="msg" style="text-align: center;">
    <span x-cloak style="margin: 8px;" x-text="msg"></span>
</div>
`

const sampleScopesForGlobal = `<div x-data="state" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
  <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
      <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within a <code>x-data</code> region, and it's state is accessible anywhere within this <code>x-data</code> region. Also, any sprinkles of interactions are managed by a global app (loaded for the entire page).</p>
  </div>
  ${sampleScope}
</div>`

const scriptClassicGlobal = (withState = false) => {
  return `<script defer src="https://unpkg.com/alpinejs" data-pg-name="Alpinejs-App"></script>
<script>
  ${withState ? sampleState : emptyState}
  document.addEventListener('alpine:init', () => {
    Alpine.data('state', () => (globalState))
  })
</script>`
}

// 'head' | 'body' | 'head-prepend' | 'body-prepend'
const cdnScripts = {
  globalApp: {
    scriptClassicWithExample: [
      {
        injectTo: 'body-prepend',
        code: `${sampleScopesForGlobal}`,
      },
      {
        injectTo: 'body',
        code: `${scriptClassicGlobal(true)}`,
      },
    ],

    scriptClassicNoExample: [
      {
        injectTo: 'body',
        code: `${scriptClassicGlobal(false)}`,
      },
    ],

    scriptClassicAutoInit: [
      {
        injectTo: 'head',
        code: `<script defer src="https://unpkg.com/alpinejs" data-pg-name="Alpinejs-App"></script>`,
      },
    ],
  },
  islands: {
    pikadayIntegrationsScripts: [
      {
        __SLOT2__: `
<script src="https://unpkg.com/alpinejs"></script>
<script
  type="module"
  data-pg-name="Alpinejs-App-Appointment"
>
const globalState = {
  date: '', // x-model won't work
  datePicker: null,
  addPikaday($el) {
    this.datePicker = new Pikaday({
      field: $el,
      theme: 'dark-theme',
    })
  },
  removePikaday() {
    this.datePicker = null
  },
  bookAppointment() {
    console.log(this.date) // x-model won't work
    console.log(this.datePicker.getDate())
  },
}

const datepickerDirective = (el, {}, {cleanup}) => {
  globalState.addPikaday(el)
  cleanup(() => globalState.removePikaday())
}

document.addEventListener('alpine:init', () => {
  Alpine.data('state', () => globalState)
  Alpine.directive('datepicker', datepickerDirective)
})
</script>
`,
        __SLOT3__: `
<div
  x-data="state"
  id="appointment"
  data-pg-name="Alpinejs-Island-Appointment"
  class="p-4">
${__SLOT3__.replaceAll('v-', 'x-')}
</div>
`,
      },
    ],
  },
}

export { cdnScripts }
export default cdnScripts
