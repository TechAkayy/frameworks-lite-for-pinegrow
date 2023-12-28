## Frameworks Lite For Pinegrow - A Community Plugin

A [Pinegrow](https://pinegrow.com/) Plugin that provides the ability to [progressively enhance](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) your HTML with light-weight framework directives via the Props Panel.

Currently supported frameworks - [Petite Vue](https://github.com/vuejs/petite-vue), [Vue](https://vuejs.org/guide/quick-start.html#using-the-global-build) and [AlpineJS](https://alpinejs.dev/start-here). To add a new framework, refer to the [Development & Contribution](#development--contribution) section.

❗Note: This is not an official plugin by the Pinegrow team, rather a personal contribution for the community. Follow me on twitter - [@techakayy](https://twitter.com/techakayy)

💻 Pinegrow plugins can be used only with Pinegrow desktop apps like Pinegrow Web Editor or Vue Designer. So, this plugin is not for Pinegrow Online or Pinegrow WP Plugin. Also, [Vue Designer](https://vuedesigner.com) already includes this feature.

💙 This plugin is free to use, open-sourced with MIT license. Feel free to fork and improve. PRs, improvements to documentation, text/video tutorials are welcomed.

👏 Frameworks via cdn can be used with other Pinegrow Pro features like components, master pages, and also with Wordpress. Any contribution to the documentation showcasing such usage are welcomed.

## Usage

1. Download the latest plugin from [here](https://github.com/techakayy/frameworks-lite-for-pinegrow/releases/latest) (`frameworks-lite-for-pinegrow.zip`).
2. Extract the zip file. The extracted folder contains:
   - `plugin.cjs` - the plugin file.
   - `templates` folder - that contains a bunch of html templates with cdn links.
3. Open Pinegrow Desktop app.
4. Load the plugin (`plugin.cjs`) via **File -> Manage libraries & plugins** (scroll to the bottom of the panel).
5. **IMPORTANT**: Restart Pinegrow after loading the plugin.
6. Open your HTML project.
7. Choose your favourite framework via **Frameworks** menu.
8. Open any HTML file, and ensure it contains the necessary cdn link for the chosen framework, and any additional setup (if any). If in doubt, use one of the templates via menu **File -> New Page** (look for **Frameworks Lite** in the vertical menu).
9. Choose a tag in the Tree Panel. The props panel will now include a new section with a `Add directive` button, and clicking that will display the list of directives for the chosen framework.
10. Select the directive as per your need, and see it get added as an attribute to the selected tag. Change the values of the directive as per your needs. Refresh the page to see the changes in action.

> Note, the list of directives are not exhaustive. To learn about how to use them, refer to the official documentation of the framework.

## Common Gotchas

- Don't mix frameworks, it can be hard to debug the behaviour.
- When using v-for of Petite-Vue or Vue, ensure you also add the key directive.
- When using x-for of Alpinejs, it must be added only to a `template` tag. So, create a new template tag, and enclose your loopable content within it.
- Make sure your page includes the cdn script tags.

  - Petite-Vue (add to `head` tag)

  ```html
  <script src="https://unpkg.com/petite-vue" defer init></script>
  ```

  - Alpinejs (add to `head` tag)

  ```html
  <script
    src="https://cdn.jsdelivr.net/npm/alpinejs@3.13.3/dist/cdn.min.js"
    defer
  ></script>
  ```

  - Vue (add before closing `body` tag, ensure you have a div with id="app")

  ```html
  <body>
    <div id="app">
      <span> {{ message }}</span>
      <!-- rest of the body -->
    </div>
    <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
    <script>
      const { createApp, ref } = Vue
      createApp({
        setup() {
          const message = ref('A Fresh Start!')
          return {
            message,
          }
        },
      }).mount('#app')
    </script>
  </body>
  ```

## Subscribe for updates

![Custom Notification1](/screenshots/file7.png?raw=true 'Custom Notification1')

![Custom Notification2](/screenshots/file8.png?raw=true 'Custom Notification2')

## Improvement opportunities

- Use the actions panel instead of props panel.
- Add examples via library panel to drag-and-drop.
- Auto-refresh page on updating the directives.
- Anything else you can think of?

## Vue with Pinegrow (or) Vue Designer?

This plugin is useful for progressive enhancement of your HTML pages (with or without a build tool).

For a Vite-powered Vue experience with Single-File components (.vue components), HMR updates, state-binding, interactive component libraries, and various cool features - check out [Vue Designer](https://vuedesigner.com).

## Screenshots

![Frameworks menu](/screenshots/file1.png?raw=true 'Frameworks menu')

![Add directive](/screenshots/file2.png?raw=true 'Add directive')

![Add a loop](/screenshots/file3.png?raw=true 'Add a loop')

![Add a key](/screenshots/file4.png?raw=true 'Add a key')

![Refresh page](/screenshots/file5.png?raw=true 'Refresh page')

![Validate updates](/screenshots/file6.png?raw=true 'Validate updates')

![Templates](/screenshots/file9.png?raw=true 'Templates')

## Development / Contribution

Pinegrow Plugins must be a Commonjs Javascript module that is loaded after the `pinegrow` instance.

To learn Pinegrow Plugin development, refer to:

- [Official Pinegrow Developer Documentation](https://pinegrow.com/docs/developers/)
- [Adding UIKit to Pinegrow Series](https://www.robertmeans.net/adding-uikit-to-pinegrow-pt-1/), by our community member [Bob](https://twitter.com/BobMPhD)

```js
$(function () {
  $('body').one('pinegrow-ready', function (e, pinegrow) {
    //plugin body
  })
})
```

- This repo uses webpack to bundle the plugin. This way, we can author the plugin as ES modules, and break them into smaller easy-to-maintain parts. Refer to `webpack.config.js`.

### `src` folder

- `plugin.js` - Entry file that loads the plugin after the `pinegrow` instance is available.
- `load.js` - Simply imports all the different parts of the plugin.
- `config.js` - One place to maintain all the meta-data of the plugin.
- `framework.js` - Creates the `PgFramework` for the plugin.
- `version.js` - Versioning related utility functions. Not really used.
- `helpers.js` & `util.js` - Helper & utility functions.
- `menu.js` - Adds a new `Frameworks` menu from where a framework can be activated.
- `common.js` (not used) - Adds new components, samples. Refer to the `frameworks` folder of your local Pinegrow installation for inspiration (bootstrap plugins are good examples).
  - On Mac - `/Applications/Pinegrow.app/Contents/Resources/app.nw/frameworks\`
  - On Windows - `C:\Program Files\Pinegrow\frameworks\`
- `directives.js` - Displays the directives via the Props Panel for the active framework. The directives are maintained in the `src/data` folder (see next section).
- `resources.js` - Adds empty html templates (available with the `templates` folder) that pre-includes the cdn links for the frameworks.

### `src/data` folder

- Each framework's directives are maintained in a separate file. `index.js` imports them all and exports them together as a single object.

## To add a new framework

1. Fork this repo, and clone it to your local machine.
2. Open project in your code editor, open your terminal and navigate to the project root.
3. Install dependencies - `npm install`.
4. Add a new file, say `my-framework.js` within the `src/data` folder that contains an array of directives and default exported. Refer to existing files for examples.
5. Import the new framework within `index.js` and add it to the exported object. Refer to existing code for an example.
6. Format your project (optional) - `npm run lint`.
7. Build the plugin - `npm run build`
8. Your new plugin is now available within the `dist` folder.
9. In Pinegrow, unload any previous versions of the plugin.
10. Follow [usage](#usage) section for instructions to load your new plugin.

## Community

- [Pinegrow Forum](https://forum.pinegrow.com/c/third-party/24)

## Thanks & Inspirations

- [Matjaž Trontelj](https://twitter.com/mattront) - Founder, Pinegrow and more...
- [Official Pinegrow Developer Documentation](https://pinegrow.com/docs/developers/).
- [Adding UIKit to Pinegrow Series](https://www.robertmeans.net/adding-uikit-to-pinegrow-pt-1/), by our community member [Bob](https://twitter.com/BobMPhD)

## License

[MIT](./LICENSE)
