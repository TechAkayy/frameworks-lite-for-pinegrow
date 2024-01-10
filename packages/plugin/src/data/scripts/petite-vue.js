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

const sampleScopesForGlobal = `<div v-scope="{ msg: 'Happy Life!' }" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within a v-scope region. Any sprinkles of interactions within this v-scope region are managed by a global app (loaded for the entire page).</p>
    </div>
    ${sampleScopeCount}
    ${sampleScopeMsg}
</div>`

const scriptModuleGlobal = (withState = false) => {
  return `<script type="module" data-pg-name="Petite Vue App">
  import { createApp } from 'https://unpkg.com/petite-vue?module'
  ${withState ? sampleStateCount : emptyState}
  createApp(state).mount()
</script>`
}

const scriptClassicGlobal = (withState = false) => {
  return `<script src="https://unpkg.com/petite-vue" data-pg-name="Petite Vue App"></script>
<script>
  ${
    withState
      ? sampleStateCount.replace('const state', 'var state')
      : emptyState.replace('const state', 'var state')
  }
  PetiteVue.createApp(state).mount()
</script>`
}

const scriptIslandsModule = `<script type="module" data-pg-name="Petite Vue App" id="hero-app">
  import { createApp } from 'https://unpkg.com/petite-vue?module'

  ${sampleStateCount}

  createApp(state).mount('div#hero-section')
</script>
<div style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;" id="hero-section" v-scope="{}">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag
            of the island div#hero-section has an exclusive app mounted by script#hero-app, and marked as a v-scope region. Any
            sprinkles of interactions within this v-scope region are managed by this exclusive app.</p>
    </div>
    ${sampleScopeCount}
</div>
<script type="module" data-pg-name="Petite Vue App" id="feature-app">
  import { createApp } from 'https://unpkg.com/petite-vue?module'
  ${sampleStateMsg}

  createApp(state).mount('div#feature-section')
</script>
<div style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;" id="feature-section" v-scope="{}">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag
            of the island div#feature-section has an exclusive app mounted by script#feature-app, and marked as a v-scope region. Any
            sprinkles of interactions within this v-scope region are managed by this exclusive app.</p>
    </div>
    ${sampleScopeMsg}
</div>`

const scriptIslandsClassic_Apps = `<script src="https://unpkg.com/petite-vue" data-pg-name="Petite Vue App"></script>
<script id="hero-app">
  ${sampleStateCount.replace('const state', 'var state')}

  PetiteVue.createApp(state).mount('div#hero-section')
</script>
<script id="feature-app">
  ${sampleStateMsg.replace('const state', 'var state')}

  PetiteVue.createApp(state).mount('div#feature-section')
</script>`

const scriptIslandsClassic_Scopes = `<div style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;" id="hero-section" v-scope="{}">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag
            of the island div#hero-section has an exclusive app mounted by script#hero-app, and marked as a v-scope region. Any
            sprinkles of interactions within this v-scope region are managed by this exclusive app.</p>
    </div>
    ${sampleScopeCount}
</div>
<div style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;" id="feature-section" v-scope="{}">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag
            of the island div#feature-section has an exclusive app mounted by script#feature-app, and marked as a v-scope region. Any
            sprinkles of interactions within this v-scope region are managed by this exclusive app.</p>
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
        code: `<script src="https://unpkg.com/petite-vue" defer init data-pg-name="Petite Vue App"></script>`,
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
  },
}

export { cdnScripts }
export default cdnScripts
