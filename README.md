## Frameworks Lite For Pinegrow - A Community Plugin

A [Pinegrow](https://pinegrow.com/) Plugin that provides the ability to [progressively enhance](https://developer.mozilla.org/en-US/docs/Glossary/Progressive_Enhancement) your HTML with light-weight framework directives via the Props Panel.

Currently supported frameworks - [Petite-Vue](https://github.com/vuejs/petite-vue), [AlpineJS](https://alpinejs.dev/start-here) and [Standard-Vue](https://vuejs.org/guide/quick-start.html#using-the-global-build). To add a new framework, refer to the [Development & Contribution](#development--contribution) section.

❗Note: This is not an official plugin by the Pinegrow team, rather a personal contribution for the community. Follow me on twitter - [@techakayy](https://twitter.com/techakayy)

💻 Pinegrow plugins can be used only with Pinegrow desktop apps like Pinegrow Web Editor or Vue Designer. So, this plugin is not for Pinegrow Online or Pinegrow WP Plugin. Also, [Vue Designer](https://vuedesigner.com) already includes this feature and more, refer to below [section](#vue-with-pinegrow-or-vue-designer) for further details.

💙 This plugin is free to use, open-sourced with MIT license. Feel free to fork and improve. PRs, improvements to documentation, text/video tutorials are welcomed. I did put together this [presentation](https://techakayy.github.io/frameworks-lite-for-pinegrow/progressive-enhancement-hydration-with-vue-and-beyond.pdf) and hope to develop a course someday (no promises). You're welcome to use this presentation as needed to develop your own; I can share the keynote version if you're interested.

👏 Frameworks via cdn can be used with other Pinegrow Pro features like components, master pages, and also with Wordpress. Any contribution to the documentation showcasing such usage are welcomed.

## Quick Demo

[![Watch the video](/screenshots/demo.png)](https://www.youtube.com/watch?v=TyS7RpsQX_w)

## Usage

1. Download the latest plugin from [here](https://github.com/techakayy/frameworks-lite-for-pinegrow/releases/latest) (`frameworks-lite-for-pinegrow.zip`). Extract the zip file. The extracted folder contains:

   - `plugin.cjs` - the plugin file.
   - `templates` folder - that contains a bunch of html templates with cdn links.

     ![01-download-and-extract](/screenshots/quick-start/01-download-and-extract.jpg?raw=true '01-download-and-extract')

2. Open Pinegrow Desktop app.
3. Load the plugin (`plugin.cjs`) via **File -> Manage libraries & plugins** (scroll to the bottom of the panel).

   ![02-open-plugins-manager.jpg](/screenshots/quick-start/02-open-plugins-manager.jpg?raw=true '02-open-plugins-manager.jpg')

   ![03-choose-to-load-plugin.jpg](/screenshots/quick-start/03-choose-to-load-plugin.jpg?raw=true '03-choose-to-load-plugin.jpg')

   ![04-load-plugin.jpg](/screenshots/quick-start/04-load-plugin.jpg?raw=true '04-load-plugin.jpg')

   Note, the plugin is automatically **activated** for all pages, so you don't have to "Activate" it for each page.

   ![05-plugin-loaded.jpg](/screenshots/quick-start/05-plugin-loaded.jpg?raw=true '05-plugin-loaded.jpg')

4. Open your HTML page (or) project. You can choose a new page via menu **File -> New Page**.
5. Choose your favourite framework via **Frameworks** menu. If don't see it, try restarting Pinegrow, and re-open your project.

![06-choose-framework.jpg](/screenshots/quick-start/06-choose-framework.jpg?raw=true '06-choose-framework.jpg')

6. If you still do not see the `Frameworks` menu, then open devtools (cmd/ctrl+shift+c) and look for any errors. Create a new issue if required with the screenshot of the error.
7. Add cdn script to your page via **Frameworks/Add CDN Script (section)**. If in doubt with the various flavours, got with a **Global App** and add the recommended option with an example. Alternatively, use one of the templates via menu **File -> New Page** (look for **Frameworks Lite** in the vertical menu).

   ![07-add-cdn-script.jpg](/screenshots/quick-start/07-add-cdn-script.jpg?raw=true '07-add-cdn-script.jpg')

   ![08-mark-v-scope-regions.jpg](/screenshots/quick-start/08-mark-v-scope-regions.jpg?raw=true '08-mark-v-scope-regions.jpg')

   ![Templates](/screenshots/file9.png?raw=true 'Templates')

8. Choose a tag in the Tree Panel. The props panel will now include a new section with a `Add directive` button, and clicking that will display the list of directives for the chosen framework.

9. Select the directive as per your need, and see it get added as an attribute to the selected tag. Change the values of the directive as per your needs. Refresh the page to see the changes in action.

   ![09-add-directives.jpg](/screenshots/quick-start/09-add-directives.jpg?raw=true '09-add-directives.jpg')

10. To automatically refresh your page when a directive is added/updated, enabled the auto-reload option via **Frameworks -> Auto reload on update**.

    ![10-auto-reload-on-updates.jpg](/screenshots/quick-start/10-auto-reload-on-updates.jpg?raw=true '10-auto-reload-on-updates.jpg')

11. If you choose an island instead of a global app, then a sample island with a mount point is added. Tweak it to your needs.
    ![11-islands.jpg](/screenshots/quick-start/11-islands.jpg?raw=true '11-islands.jpg')
12. The instructions for other frameworks are the same with regards to adding the cdn script, or it's usage via the 'Add directive' button.
    ![12-other-frameworks.jpg](/screenshots/quick-start/12-other-frameworks.jpg?raw=true '12-other-frameworks.jpg')

> Note, the list of directives are not exhaustive. To learn about how to use them, refer to the official documentation of the framework.

## Common Gotchas

- Remember to include the CDN script, and ensure there are no duplicate conflicting ones.
- Don't mix global app with islands, it will result in unexpected conflicts.
- Don't mix frameworks, it can be hard to debug the behaviour.
- When using v-for of Petite-Vue or Standard-Vue, ensure you also add the key directive.
- When using x-for of Alpinejs, it must be added only to a `template` tag (the plugin does this for you).
- If you are using with Wordpress in Pinegrow,
  - avoid arrow functions.
  - avoid shorthand form for directives, and use full-form. For eg, use v-on:click instead of @click.

## Some suggestions

- Understand SEO impacts as these progressive enhancements are generally done on client-side. Remember to sprinkle them, and not over-use them.
- Understand that progressive enhancement is not a replacement for SSG or SSR.
- Avoid using `v-html, x-html` as it has xss vulnerabilities
- Use Vue-Devtools with Standard-Vue, and Alpinejs-Devtools with Alpinejs for debugging and troubleshooting. The devtools are available in chrome store, and use them by opening your page in an external browser.
- Any other tips you can think of for the community?

## Subscribe for updates

![Custom Notification1](/screenshots/file7.png?raw=true 'Custom Notification1')

![Custom Notification2](/screenshots/file8.png?raw=true 'Custom Notification2')

## Improvement opportunities

- [x] Support both simple HTML page only (Pinegrow free version) & projects (Pinegrow pro).
- [x] Add cdn script of different flavours to an existing page.
- [x] Auto-reload page when adding or updating directives.
- [x] Add examples via page templates from docs.
- [ ] In-app quick-start tutorial? - Should we use Pinegrow tutorials api or a separate dialog for this? Or may be just a simple vitepress docs site on netlify?
- [ ] Use the actions panel instead of props panel?
- [ ] Anything else you can think of?

## Vue with Pinegrow (or) Vue Designer?

This plugin is useful for progressive enhancement of your HTML pages (with or without a build tool).

For a Vite-powered Vue experience with Single-File components (.vue components), HMR updates, state-binding, interactive component libraries, and various cool features - check out [Vue Designer](https://vuedesigner.com).

## Screenshots (menu might be missing some options, requires update)

![Frameworks menu](/screenshots/file1.png?raw=true 'Frameworks menu')

Assuming the data comes from an external API, and can't be pre-rendered or server-rendered,

![Add directive](/screenshots/file2.png?raw=true 'Add directive')

![Add a loop](/screenshots/file3.png?raw=true 'Add a loop')

![Add a key](/screenshots/file4.png?raw=true 'Add a key')

![Refresh page](/screenshots/file5.png?raw=true 'Refresh page')

![Validate updates](/screenshots/file6.png?raw=true 'Validate updates')

## Development / Contribution

> We welcome all PRs/suggestions/improvements to both the plugin and documentation.

This project is a mono-repo, with two projects inside the `packages` folder.

- `plugin` folder for the plugin. This project uses webpack to bundle the plugin. This way, we can author the plugin as ES modules, and break them into smaller easy-to-maintain parts. Refer to `webpack.config.js`.
- `docs` folder for a separate documentation site/app (just a placeholder for now).

Pinegrow Plugins must be a Commonjs Javascript module that is loaded after the `pinegrow` instance. To learn Pinegrow Plugin development, refer to:

- [Official Pinegrow Developer Documentation](https://pinegrow.com/docs/developers/)
- [Adding UIKit to Pinegrow Series](https://www.robertmeans.net/adding-uikit-to-pinegrow-pt-1/), by our community member [Bob](https://twitter.com/BobMPhD)

```js
$(function () {
  $('body').one('pinegrow-ready', function (e, pinegrow) {
    //plugin body
  })
})
```

## Plugin Package (`packages/plugin`)

### `packages/plugin/src` folder

- `plugin.js` - Entry file that loads the plugin after the `pinegrow` instance is available.
- `load.js` - Simply imports all the different parts of the plugin.
- `config.js` - One place to maintain all the meta-data of the plugin.
- `framework.js` - Creates the `PgFramework` for the plugin.
- `version.js` - Versioning related utility functions. Not really used.
- `helpers.js` & `util.js` - Helper & utility functions.
- `shared-state.js` - Stores the current state of the menu options.
- `menu.js` - Adds a new `Frameworks` menu from where a framework can be activated, cdn scripts can be added to the page.
- `common.js` (not used) - Adds new components, samples. Refer to the `frameworks` folder of your local Pinegrow installation for inspiration (bootstrap plugins are good examples).
  - On Mac - `/Applications/Pinegrow.app/Contents/Resources/app.nw/frameworks\`
  - On Windows - `C:\Program Files\Pinegrow\frameworks\`
- `directives.js` - Displays the directives via the Props Panel for the active framework. The directives are maintained in the `src/data` folder (see next section).
- `resources.js` - Adds empty html templates (available with the `templates` folder) that pre-includes the cdn links for the frameworks.
- `tree-painter.js` - Displays `v-*` and `x-*` tags on page tree to easily identify them.

### `packages/plugin/src/data` folder

- Each framework's directives and cdn scripts are maintained in separate folders. `index.js` imports them all and exports them together as a single object.

## To add a new framework

1. Fork this repo, and clone it to your local machine.
2. Open project in your code editor, open your terminal and navigate to the project root.
3. Install dependencies - `npm install`.
4. Add a new file, say `my-framework.js` within the `packages/plugin/src/data/**` folders that contains an array of directives and cdn scripts (default exported). Refer to existing files for examples.
5. Import the new framework within `index.js` and add it to the exported object. Refer to existing code for an example.
6. Format your project (optional) - `npm run lint`.
7. Build the plugin - `npm run build`
8. Your new plugin is now available within the `packages/plugin/dist` folder.
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
