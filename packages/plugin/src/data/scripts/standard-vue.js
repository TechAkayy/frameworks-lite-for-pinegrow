const emptyState = `const rootComponent = {
  data() {
    return {
      // count: 0
    }
  },
}`

const sampleStateOptionsApi = `const rootComponent = {
  props: {
    title: String,
  },
  data() {
    return {
      count: 0,
      msg: 'Happy Life!',
    }
  },
  computed: {
    oddOrEven() {
      return this.count % 2 === 0 ? 'even' : 'odd'
    },
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
      this.count--
    },
  },
}`

const sampleStateCompositionApi = `const rootComponent = {
  setup(props) {
    const { title } = toRefs(props) // turn 'props' into an object of refs, then destructure
    // console.log(title.value) // 'title' is a ref that tracks 'props.title'
    const count = ref(0)
    const msg = ref('Happy Life!')
    const oddOrEven = computed(() => {
      return count.value % 2 === 0 ? 'even' : 'odd'
    })
    const increment = () => {
      count.value++
    }
    const decrement = () => {
      count.value--
    }
    return {
      title,
      count,
      msg,
      oddOrEven,
      increment,
      decrement,
    }
  },
}`

const sampleScopeCount = `<div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
      <button v-on:click="decrement" style="margin-left: 4px; margin-right: 4px;">⬇️</button>
      <button v-on:click="increment" style="margin-left: 4px; margin-right: 4px;">⬆️</button>
      <div v-cloak style="text-align: left; width: 180px; margin-left: 4px;"><span>Count is: </span><span style="width: 30px; display: inline-block; text-align: center;">{{count}}</span>
          <span v-cloak>({{oddOrEven}})</span>
      </div>
  </div>
`

const sampleScopeMsg = `<div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center; flex-direction: column;">
      <input v-model="msg" style="text-align: center;">
      <span v-cloak style="margin: 8px;">{{msg}}</span>
  </div>
`

const scriptIslandsModule = `<script type="module" data-pg-name="Vue-App-Hero" id="hero-app">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  ${sampleStateOptionsApi}

  createApp(rootComponent).mount('div#hero-island')
</script>
<div id="hero-island" data-pg-name="Vue-Island-Hero" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
  <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
      <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#hero-island</code> has an exclusive app mounted by <code>script#hero-app</code>. Any sprinkles of interactions within this island are managed by this exclusive app.</p>
  </div>
  ${sampleScopeCount}
</div>
<script type="module" data-pg-name="Vue-App-Feature" id="feature-app">
  import { createApp, ref, computed, toRefs } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  ${sampleStateCompositionApi}

  createApp(rootComponent).mount('div#feature-island')
</script>
<div id="feature-island" data-pg-name="Vue-Island-Feature" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
  <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
      <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#feature-island</code> has an exclusive app mounted by <code>script#feature-app</code>. Any sprinkles of interactions within this island are managed by this exclusive app.</p>
  </div>
  ${sampleScopeMsg}
</div>`

const scriptIslandsClassic_Apps = `<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script id="hero-app" data-pg-name="Vue-App-Hero">
  var { createApp } = Vue

  ${sampleStateOptionsApi.replace('const rootComponent', 'var rootComponent')}

  createApp(rootComponent).mount('div#hero-island')
</script>
<script id="feature-app" data-pg-name="Vue-App-Feature">
  var { createApp } = Vue

  ${sampleStateCompositionApi.replace(
    'const rootComponent',
    'var rootComponent',
  )}

  createApp(rootComponent).mount('div#feature-island')
</script>`

const scriptIslandsClassic_Scopes = `<div id="hero-island" data-pg-name="Vue-Island-Hero" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#hero-island</code> has an exclusive app mounted by <code>script#hero-app</code>. Any sprinkles of interactions within this island are managed by this exclusive app.</p>
    </div>
    ${sampleScopeCount}
</div>
<div id="feature-island" data-pg-name="Vue-Island-Feature" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#feature-island</code> has an exclusive app mounted by <code>script#feature-app</code>. Any sprinkles of interactions within this island are managed by this exclusive app.</p>
    </div>
    ${sampleScopeMsg}
</div>
`

// 'head' | 'body' | 'head-prepend' | 'body-prepend'
const cdnScripts = {
  islands: {
    scriptModuleIsland: [
      {
        injectTo: 'body-prepend',
        code: `${scriptIslandsModule}`,
      },
    ],

    scriptClassicIsland: [
      {
        injectTo: 'body-prepend',
        code: `${scriptIslandsClassic_Scopes}`,
      },
      {
        injectTo: 'body',
        code: `${scriptIslandsClassic_Apps}`,
      },
    ],
    pikadayIntegrationsScripts: [
      {
        label: 'Options API',
        code: `
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const rootComponent = {
  data() {
    return {
      date: '', // v-model won't work
      datePicker: null,
    }
  },

  directives: {
    // enables v-datepicker in template
    datepicker: {
        mounted(el, binding) {
            binding.instance.addPikaday(el)
        },
        mounted(el, binding) {
          binding.instance.addPikaday(el)
        },
    }
  },

  methods: {
    addPikaday($el) {
      this.datePicker = new Pikaday({
        field: $el,
        theme: 'dark-theme',
      })
    },
    bookAppointment() {
      console.log(this.date) // v-model won't work
      console.log(this.datePicker.getDate())
    },
  },
}

createApp(rootComponent).mount('div#appointment')
        `,
      },
      {
        label: 'Composition API',
        code: `
import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

const rootComponent = {
  setup() {
    const date = ref('') // v-model won't work
    const datePicker = ref(null)
    const addPikaday = ($el) => {
      datePicker.value = new Pikaday({
        field: $el,
        theme: 'dark-theme',
      })
    }
    const removePikaday = () => {
      datePicker.value = null
    },
    const bookAppointment = () => {
      console.log(date.value) // v-model won't work
      console.log(datePicker.value.getDate())
    }
    return {
      date,
      addPikaday,
      bookAppointment,
    }
  },
  directives: {
    // enables v-datepicker in template
    datepicker: {
      mounted(el, binding) {
        binding.instance.addPikaday(el)
      },
      unmounted() {
        binding.instance.removePikaday()
      },
    }
  },
}

createApp(rootComponent).mount('div#appointment')
`,
      },
    ],
  },
}

export { cdnScripts }
export default cdnScripts
