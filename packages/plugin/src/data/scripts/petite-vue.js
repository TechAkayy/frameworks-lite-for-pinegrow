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

const sampleScopesForGlobal = `<div data-pg-name="Scope-Petite Vue" v-scope="{ msg: 'Happy Life!' }" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
    <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by a global app (loaded for the entire page).</p>
    </div>
    ${sampleScopeCount}
    ${sampleScopeMsg}
</div>`

const scriptModuleGlobal = (withState = false) => {
  return `<script type="module" data-pg-name="App-Petite Vue">
  import { createApp } from 'https://unpkg.com/petite-vue?module'
  ${withState ? sampleStateCount : emptyState}
  createApp(state).mount()
</script>`
}

const scriptClassicGlobal = (withState = false) => {
  return `<script src="https://unpkg.com/petite-vue" data-pg-name="App-Petite Vue"></script>
<script>
  ${
    withState
      ? sampleStateCount.replace('const state', 'var state')
      : emptyState.replace('const state', 'var state')
  }
  PetiteVue.createApp(state).mount()
</script>`
}

const scriptIslandsModule = `<script type="module" data-pg-name="App-Hero" id="hero-app">
  import { createApp } from 'https://unpkg.com/petite-vue?module'

  ${sampleStateCount}

  createApp(state).mount('div#hero-island')
</script>
<div id="hero-island" data-pg-name="Island-Hero" v-scope="{}" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
      <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#hero-island</code> has an exclusive app mounted by <code>script#hero-app</code>, and marked as a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by this exclusive app.</p>
    </div>
    ${sampleScopeCount}
</div>
<script type="module" data-pg-name="App-Feature" id="feature-app">
  import { createApp } from 'https://unpkg.com/petite-vue?module'
  ${sampleStateMsg}

  createApp(state).mount('div#feature-island')
</script>
<div id="feature-island" data-pg-name="Island-Feature" v-scope="{}" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#feature-island</code> has an exclusive app mounted by <code>script#feature-app</code>, and marked as a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by this exclusive app.</p>
    </div>
    ${sampleScopeMsg}
</div>`

const scriptIslandsClassic_Apps = `<script src="https://unpkg.com/petite-vue" data-pg-name="App-Petite Vue"></script>
<script id="hero-app">
  ${sampleStateCount.replace('const state', 'var state')}

  PetiteVue.createApp(state).mount('div#hero-island')
</script>
<script id="feature-app">
  ${sampleStateMsg.replace('const state', 'var state')}

  PetiteVue.createApp(state).mount('div#feature-island')
</script>`

const scriptIslandsClassic_Scopes = `<div id="hero-island" data-pg-name="Island-Hero" v-scope="{}" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#hero-island</code> has an exclusive app mounted by <code>script#hero-app</code>, and marked as a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by this exclusive app.</p>
    </div>
    ${sampleScopeCount}
</div>
<div id="feature-island" data-pg-name="Island-Feature" v-scope="{}" style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
    <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
        <p style="text-align: center; width: 50%; min-width: 400px;">Hello, I&apos;m within an island, and the root tag of the island <code>div#feature-island</code> has an exclusive app mounted by <code>script#feature-app</code>, and marked as a <code>v-scope</code> region. Any sprinkles of interactions within this <code>v-scope</code> region are managed by this exclusive app.</p>
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
        code: `<script src="https://unpkg.com/petite-vue" defer init data-pg-name="App-Petite Vue"></script>`,
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
