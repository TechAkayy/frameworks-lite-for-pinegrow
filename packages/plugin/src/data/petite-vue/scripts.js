import { __SLOT3__ } from '../standard-vue/scripts.js'

const emptyState = `const state = {
    // state exposed to all expressions within v-scope regions
  }
`

const sampleStateCount = `const state = {
    // state exposed to all expressions within v-scope regions
    count: 0,
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

const sampleStateMsg = `const state = {
    // state exposed to all expressions within v-scope regions
    msg: 'Happy Life!', 
  }
`

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

const sampleScopesForGlobal = `<div data-pg-name="Global-Pt-Scope" v-scope="{ msg: 'Happy Life!' }" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
    <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by a global app (loaded for the entire page).</p>
    </div>
    ${sampleScopeCount}
    ${sampleScopeMsg}
</div>`

const scriptModuleGlobal = (withState = false) => {
  return `<script type="module" data-pg-name="Global-Pt-App">
  import { createApp } from 'https://unpkg.com/petite-vue?module'
  ${withState ? sampleStateCount : emptyState}
  createApp(state).mount()
</script>`
}

const scriptClassicGlobal = (withState = false) => {
  return `<script src="https://unpkg.com/petite-vue" data-pg-name="Global-Petite-Vue"></script>
<script data-pg-name="Global-Pt-App">
  ${
    withState
      ? sampleStateCount.replace('const state', 'var state')
      : emptyState.replace('const state', 'var state')
  }
  PetiteVue.createApp(state).mount()
</script>`
}

const scriptIslandsModule = `<div data-pg-name="Hero-Pt-Island">
    <script type="module" data-pg-name="Hero-Pt-App">
      import { createApp } from 'https://unpkg.com/petite-vue?module'

      ${sampleStateCount}

      createApp(state).mount('div#hero-scope')
    </script>
    <div id="hero-scope" data-pg-name="Hero-Pt-Scope" v-scope="{}" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
        <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
          <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#hero-scope</code> has an exclusive app mounted by <code>script#hero-app</code>, and marked as a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by this exclusive app.</p>
        </div>
        ${sampleScopeCount}
    </div>
</div>
<div data-pg-name="Feature-Pt-Island">
    <script type="module" data-pg-name="Feature-Pt-App">
      import { createApp } from 'https://unpkg.com/petite-vue?module'
      ${sampleStateMsg}

      createApp(state).mount('div#feature-scope')
    </script>
    <div id="feature-scope" data-pg-name="Feature-Pt-Scope" v-scope="{}" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
        <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
            <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#feature-scope</code> has an exclusive app mounted by <code>script#feature-app</code>, and marked as a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by this exclusive app.</p>
        </div>
        ${sampleScopeMsg}
    </div>
</div>`

const scriptIslandsClassic_Apps = `<script src="https://unpkg.com/petite-vue" data-pg-name="Classic-Petite-Vue"></script>
<script data-pg-name="Hero-Pt-App">
  ${sampleStateCount.replace('const state', 'var state')}

  PetiteVue.createApp(state).mount('div#hero-scope')
</script>
<script data-pg-name="Feature-Pt-App">
  ${sampleStateMsg.replace('const state', 'var state')}

  PetiteVue.createApp(state).mount('div#feature-scope')
</script>`

const scriptIslandsClassic_Scopes = `<div id="hero-scope" data-pg-name="Hero-Pt-Scope" v-scope="{}" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#hero-scope</code> has an exclusive app mounted by <code>script#hero-app</code>, and marked as a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by this exclusive app.</p>
    </div>
    ${sampleScopeCount}
</div>
<div id="feature-scope" data-pg-name="Feature-Pt-Scope" v-scope="{}" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#feature-scope</code> has an exclusive app mounted by <code>script#feature-app</code>, and marked as a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by this exclusive app.</p>
    </div>
    ${sampleScopeMsg}
</div>
`

// 'head' | 'body' | 'head-prepend' | 'body-prepend'
const cdnScripts = {
  globalApp: {
    scriptModuleWithExample: [
      {
        injectTo: 'body-prepend',
        code: `${scriptModuleGlobal(true)}
${sampleScopesForGlobal}`,
      },
    ],

    scriptModuleNoExample: [
      {
        injectTo: 'body-prepend',
        code: `${scriptModuleGlobal(false)}`,
      },
    ],

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
        code: `<script src="https://unpkg.com/petite-vue" defer init data-pg-name="Global-Petite-Vue"></script>`,
      },
    ],
  },

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
        __SLOT2__: `
<script
  type="module"
  data-pg-name="Appointment-Pt-App"
>
  import { createApp } from 'https://unpkg.com/petite-vue?module'

  const state = {
    // state exposed to all expressions within v-scope regions
    date: '', // v-model won't work
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
      console.log(this.date) // v-model won't work
      console.log(this.datePicker.getDate())
    },
  }

  const datepickerDirective = (ctx) => {
    ctx.ctx.scope.addPikaday(ctx.el)
    return () => {
      ctx.ctx.scope.removePikaday()
    }
  }

  createApp(state).directive('datepicker', datepickerDirective).mount('div#appointment-scope')
</script>
`,
        __SLOT3__: `
<div id="appointment-scope" data-pg-name="Appointment-Pt-Scope" class="p-4">
${__SLOT3__}
</div>
`,
      },
    ],
  },
}

export { cdnScripts }
export default cdnScripts
