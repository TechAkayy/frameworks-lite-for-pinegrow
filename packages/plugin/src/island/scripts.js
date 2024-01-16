// 'head' | 'body' | 'head-prepend' | 'body-prepend'
const cdnScripts = {
  globalApp: {
    scriptModuleNoExample: [
      {
        injectTo: 'body-prepend',
        code: `<script type="module" src="/@11ty/is-land/is-land.js" data-pg-name="App-11ty-Island"></script>`,
      },
    ],
  },
}

export { cdnScripts }
export default cdnScripts
