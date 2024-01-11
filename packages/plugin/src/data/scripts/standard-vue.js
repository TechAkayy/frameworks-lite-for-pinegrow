const emptyState = `const setup = {
  data() {
    return {
      // count: 0
    }
  },
}`

const sampleStateCount = `const setup = {
  props: {
    title: String,
  },
  data() {
    return {
      count: 0
    }
  },
  computed: {
    oddOrEven() {
      return this.count%2===0? 'even' : 'odd'
    }
  },
  methods: {
    increment() {
      this.count++
    },
    decrement() {
        this.count--
    }
  }
}`

const sampleStateMsg = `const setup = {
  data() {
    return {
      msg: 'Happy Life!',
    }
  },
}`

const sampleScopeCount = `<div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
      <button v-on:click="decrement" style="margin-left: 4px; margin-right: 4px;">⬇️</button>
      <button v-on:click="increment" style="margin-left: 4px; margin-right: 4px;">⬆️</button>
      <div style="text-align: left; width: 180px; margin-left: 4px;"><span>Count is: </span><span style="width: 30px; display: inline-block; text-align: center;">{{count}}</span>
          <span>({{oddOrEven}})</span>
      </div>
  </div>
`

const sampleScopeMsg = `<div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center; flex-direction: column;">
      <input v-model="msg" style="text-align: center;">
      <span style="margin: 8px;">{{msg}}</span>
  </div>
`

const scriptIslandsModule = `<script type="module" data-pg-name="Standard Vue App" id="hero-app">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  ${sampleStateCount}

  createApp(setup).mount('div#hero-section')
</script>
<div style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;" id="hero-section">
  <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
      <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#hero-section</code> has an exclusive app mounted by <code>script#hero-app</code>. Any sprinkles of interactions within this island are managed by this exclusive app.</p>
  </div>
  ${sampleScopeCount}
</div>
<script type="module" data-pg-name="Standard Vue App" id="feature-app">
  import { createApp, ref } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js'

  ${sampleStateMsg}

  createApp(setup).mount('div#feature-section')
</script>
<div style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;" id="feature-section">
  <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
      <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#feature-section</code> has an exclusive app mounted by <code>script#feature-app</code>. Any sprinkles of interactions within this island are managed by this exclusive app.</p>
  </div>
  ${sampleScopeMsg}
</div>`

const scriptIslandsClassic_Apps = `<script src="https://unpkg.com/vue@3/dist/vue.global.js" data-pg-name="Standard Vue App"></script>
<script id="hero-app">
  var { createApp } = Vue

  ${sampleStateCount.replace('const setup', 'var setup')}

  createApp(setup).mount('div#hero-section')
</script>
data-pg-name="Standard Vue App"></script>
<script id="feature-app">
  var { createApp } = Vue

  ${sampleStateMsg.replace('const setup', 'var setup')}

  createApp(setup).mount('div#feature-section')
</script>`

const scriptIslandsClassic_Scopes = `<div style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;" id="hero-section">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#hero-section</code> has an exclusive app mounted by <code>script#hero-app</code>. Any sprinkles of interactions within this island are managed by this exclusive app.</p>
    </div>
    ${sampleScopeCount}
</div>
<div style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;" id="feature-section">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#feature-section</code> has an exclusive app mounted by <code>script#feature-app</code>. Any sprinkles of interactions within this island are managed by this exclusive app.</p>
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
  },
}

export { cdnScripts }
export default cdnScripts
