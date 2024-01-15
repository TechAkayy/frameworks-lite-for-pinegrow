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
  return `<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" data-pg-name="App-Alpinejs"></script>
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
        code: `<script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.x.x/dist/cdn.min.js" data-pg-name="App-Alpinejs"></script>`,
      },
    ],
  },
}

export { cdnScripts }
export default cdnScripts
