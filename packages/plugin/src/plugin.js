// Used to import as a module directly via pinegrow edit.html
import { pgFrameworkConfig as config } from './config.js'

$(function () {
  $('body').one('pinegrow-ready', function (e, pinegrow) {
    console.log(`Pinegrow ${config.short_name} plugin loaded successfully!`)

    import(
      /* webpackMode: "eager" */
      './load.js'
    ).then(() => {})
  })
})
