import { framework, dependencyRoot, isExistsAndDirectory } from './helpers.js'
import { pgFrameworkConfig as config } from './config.js'
import { frameworks } from './data/index.js'
import { frameworksLiteState } from './shared-state.js'
// import { tutorialPanel } from './tutorial-panel.js'
import { island } from './island/index.js'

// let activeFramework = frameworks[0]
frameworksLiteState.activeFramework = frameworks[0]
// fullform (false), shortform (true)
// let isShortform = false
frameworksLiteState.isShortform = false
// let autoReloadOnUpdate = false
frameworksLiteState.autoReloadOnUpdate = false

const $menu = $(`
<li class="aadropdown menu-addon">
    <a href="#" class="aadropdown-toggle" data-toggle="aadropdown"><span>Frameworks</span></a>
</li>
`)

const copyDir = (src, dest, callback) => {
  const copy = (copySrc, copyDest) => {
    fs.readdir(copySrc, (err, list) => {
      if (err) {
        callback(err)
        return
      }
      list.forEach((item) => {
        const ss = path.resolve(copySrc, item)
        fs.stat(ss, (err, stat) => {
          if (err) {
            callback(err)
          } else {
            const curSrc = path.resolve(copySrc, item)
            const curDest = path.resolve(copyDest, item)

            if (stat.isFile()) {
              // file, copy directly
              fs.createReadStream(curSrc).pipe(fs.createWriteStream(curDest))
            } else if (stat.isDirectory()) {
              // directory, recursively
              fs.mkdirSync(curDest, { recursive: true })
              copy(curSrc, curDest)
            }
          }
        })
      })
    })
  }

  fs.access(dest, (err) => {
    if (err) {
      // If the target directory does not exist, create it
      fs.mkdirSync(dest, { recursive: true })
    }
    copy(src, dest)
  })
}

const addPackages = (projectRoot, dependency) => {
  const packageFolderName = dependency.packageFolderName

  try {
    const sourcePackagePath = path.resolve(
      dependencyRoot,
      packageFolderName,
      island.packageRoot,
    )
    if (isExistsAndDirectory(sourcePackagePath)) {
      const destPackagePath = path.resolve(projectRoot, island.packageRoot)
      if (isExistsAndDirectory(destPackagePath)) {
        pinegrow.showQuickMessage(
          `Frameworks lite: ${dependency.label} package already exists!`,
        )
      } else {
        copyDir(sourcePackagePath, destPackagePath)
      }
    }
  } catch (err) {
    console.log(err)
  }
}

const processScriptInjection = (scriptArr) => {
  const page = pinegrow.getSelectedPage()
  if (page) {
    const headNode = page.sourceNode.findOne('head')
    const bodyNode = page.sourceNode.findOne('body')
    if (!headNode || !bodyNode) {
      pinegrow.showQuickMessage(
        'Frameworks lite: Ensure that the page contains head and body tags!',
      )
    }

    var api = new PgApi()

    scriptArr.forEach((scriptObj) => {
      let insertPosition = scriptObj.injectTo.endsWith('prepend')
        ? 'prepend'
        : 'append'
      // 'insertBefore'
      // 'insertAfter'
      let dest = scriptObj.injectTo.startsWith('head') ? headNode : bodyNode

      api.insertElements(scriptObj.code, dest, insertPosition, {
        select: true,
        highlight: true,
        scroll: true,
        repeater: true,
        format_html: true,
      })
      pinegrow.showQuickMessage(
        `Frameworks lite: Added tags for ${frameworksLiteState.activeFramework.label} at ${scriptObj.injectTo} !`,
      )
    })

    setTimeout(() => {
      page.refresh()
    }, 500)
  } else {
    pinegrow.showQuickMessage('Frameworks lite: Open a page first!')
  }
}

const addCloakTag = (attribute) => {
  try {
    const page = pinegrow.getSelectedPage()
    if (!page) {
      return
    }

    const styleTags = page.sourceNode.find('style')
    for (let i = 0; i < styleTags.length; i++) {
      const styleTag = styleTags[i]
      const vCloakExists = styleTag.content.includes('[v-cloak]')
      const xCloakExists = styleTag.content.includes('[x-cloak]')

      if (vCloakExists || xCloakExists) {
        pinegrow.showQuickMessage(
          `Frameworks lite: ${
            vCloakExists ? 'v-cloak' : 'x-cloak'
          }'s inline style already exists.`,
        )
        return
      }
    }

    processScriptInjection([
      {
        injectTo: 'head',
        code: `<style>[${attribute}] { display: none !important; } </style>`,
      },
    ])
  } catch (err) {
    console.log(err)
  }
}

const onProjectLoaded = () => {
  $menu.remove()

  const projectInfo = pinegrow.getCurrentProjectInfo()
  if (projectInfo) {
    const lastUsedFramework = projectInfo.getSetting('framework_directives')
    if (lastUsedFramework) {
      frameworksLiteState.activeFramework = frameworks.find(
        (fx) => lastUsedFramework === fx.name,
      )
    }
    frameworksLiteState.isShortform = !!projectInfo.getSetting(
      'use-shortform-for-prop-binder',
    )
    frameworksLiteState.autoReloadOnUpdate = !!projectInfo.getSetting(
      'auto-reload-on-update',
    )
  }

  const activeDirectiveGroup = frameworks.find(
    (fx) => fx.name === frameworksLiteState.activeFramework.name,
  )

  pinegrow.addPluginControlToTopbar(framework, $menu, true)

  let frameworks_menu = []
  frameworks.forEach((fx) => {
    frameworks_menu.push({
      label: fx.label,
      helptext: fx.helptext,
      check: function () {
        return fx.name === frameworksLiteState.activeFramework.name
      },
      action: function () {
        frameworksLiteState.activeFramework = fx
        if (projectInfo) {
          projectInfo.setSetting('framework_directives', fx.name)
          projectInfo.save()
        }
        pinegrow.selectedElements.reselect()
      },
    })
  })

  var menuView = new PgDropdownMenu($('.menu-addon'))

  menuView.onGetActions = function (menu) {
    menu.add({
      label: `Video Tutorial & Docs`,
      action: function () {
        pinegrow.openExternalUrl(config.video_tutorial)
      },
    })

    menu.add({
      type: 'divider',
    })

    frameworks_menu.forEach((framework) => {
      menu.add(framework)
    })

    menu.add({
      type: 'divider',
    })

    if (activeDirectiveGroup.directives.propBinders?.length) {
      const helptext = activeDirectiveGroup.directives.propBinders.reduce(
        (acc, { fullform, shortform }) =>
          `${acc ? `${acc}<br>` : acc}${fullform} as ${shortform}`,
        ``,
      )

      if (!frameworksLiteState.isShortform) {
        frameworksLiteState.isShortform = false
        if (projectInfo) {
          projectInfo.setSetting(
            'use-shortform-for-prop-binder',
            frameworksLiteState.isShortform,
          )
        }
      }

      // menu.add({
      //   label: `Use shorthand`,
      //   helptext,
      //   check: function () {
      //     return frameworksLiteState.isShortform
      //   },
      //   action: function () {
      //     frameworksLiteState.isShortform = !frameworksLiteState.isShortform
      //     if (projectInfo) {
      //       projectInfo.setSetting('use-shortform-for-prop-binder', frameworksLiteState.isShortform)
      //       projectInfo.save()
      //     }
      //   },
      // })
    }

    // Add cdn script
    menu.add({
      type: 'header',
      label: `Progressive Enhancement (choose between either to add cdn scripts, don't mix them up)`,
    })

    const cdnScripts = frameworksLiteState.activeFramework.cdnScripts

    const addCdnScriptForglobalApp = []

    if (frameworksLiteState.activeFramework.name === 'petite-vue') {
      addCdnScriptForglobalApp.push(
        {
          type: 'header',
          label: `A global app for the entire page that manages regions marked with the v-scope attribute`,
        },
        {
          type: 'divider',
        },
        {
          label: 'Auto hydrated/init (simplest - added to head)',
          helptext: 'Added to head tag, includes defer and init attributes.',
          action: function () {
            const scriptArr = cdnScripts.globalApp.scriptClassicAutoInit
            processScriptInjection(scriptArr)
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `App with Script (module) - Recommended`,
        },
        {
          label: 'Manually hydrated/init, with empty state',
          helptext: 'Added to start of body tag.',
          action: function () {
            const scriptArr = cdnScripts.globalApp.scriptModuleNoExample
            processScriptInjection(scriptArr)
          },
        },
        {
          label: 'Manually hydrated/init, with sample state',
          helptext: 'Added to start of body tag.',
          action: function () {
            const scriptArr = cdnScripts.globalApp.scriptModuleWithExample
            processScriptInjection(scriptArr)
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `App with Script (classic)`,
        },
        {
          label: 'Manually hydrated/init, with empty state',
          helptext: 'Added before closing of body tag.',
          action: function () {
            const scriptArr = cdnScripts.globalApp.scriptClassicNoExample
            processScriptInjection(scriptArr)
          },
        },
        {
          label: 'Manually hydrated/init, with sample state',
          helptext: 'Added before closing of body tag.',
          action: function () {
            const scriptArr = cdnScripts.globalApp.scriptClassicWithExample
            processScriptInjection(scriptArr)
          },
        },
      )
    } else if (frameworksLiteState.activeFramework.name === 'alpinejs') {
      addCdnScriptForglobalApp.push(
        {
          type: 'header',
          label: `A global app for the entire page that manages tags using Alpinejs directives`,
        },
        {
          type: 'divider',
        },
        {
          label: 'Auto hydrated/init (simplest - added to head)',
          helptext: 'Added to head tag, includes defer attribute.',
          action: function () {
            const scriptArr = cdnScripts.globalApp.scriptClassicAutoInit
            processScriptInjection(scriptArr)
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `App with Script (classic)`,
        },
        {
          label: 'Manually hydrated/init, with empty state',
          helptext: 'Added before closing of body tag.',
          action: function () {
            const scriptArr = cdnScripts.globalApp.scriptClassicNoExample
            processScriptInjection(scriptArr)
          },
        },
        {
          label: 'Manually hydrated/init, with sample state',
          helptext: 'Added before closing of body tag.',
          action: function () {
            const scriptArr = cdnScripts.globalApp.scriptClassicWithExample
            processScriptInjection(scriptArr)
          },
        },
      )
    } else if (frameworksLiteState.activeFramework.name === 'standard-vue') {
      addCdnScriptForglobalApp.push(
        {
          type: 'header',
          label: `Not applicable.`,
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `Standard-Vue apps are always mounted to a tag (for eg div#app) in the page.`,
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `Use Petite-Vue or Alpinejs if you are after a simple global app.`,
        },
      )
    }

    menu.add({
      label: `Global App (full hydration)`,
      submenu: addCdnScriptForglobalApp,
    })

    const addCdnScriptForIndividualIslands = []

    if (frameworksLiteState.activeFramework.name === 'petite-vue') {
      addCdnScriptForIndividualIslands.push(
        {
          type: 'header',
          label: `Multiple apps across the page with it's own exclusive scope and mount point (islands)`,
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `App with Script (module) - Recommended`,
        },
        {
          label: 'Mounted to a sample island',
          helptext:
            'Added to start of body tag, app mounted to the sample island.',
          action: function () {
            const scriptArr = cdnScripts.islands.scriptModuleIsland
            processScriptInjection(scriptArr)
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `App with Script (classic)`,
        },
        {
          label: 'Mounted to a sample island',
          helptext:
            'Added before closing of body tag, app mounted to the sample island.',
          action: function () {
            const scriptArr = cdnScripts.islands.scriptClassicIsland
            processScriptInjection(scriptArr)
          },
        },
      )
    } else if (frameworksLiteState.activeFramework.name === 'alpinejs') {
      addCdnScriptForIndividualIslands.push(
        {
          type: 'header',
          label: `Not applicable.`,
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `Alpinejs app is simply global across the entire page.`,
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `Islands are technically possible, but not an intented use case of Alpinejs.`,
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `Use Petite-Vue or Standard-Vue if you are after Islands in HTML pages.`,
        },
      )
    } else if (frameworksLiteState.activeFramework.name === 'standard-vue') {
      addCdnScriptForIndividualIslands.push(
        {
          type: 'header',
          label: `Multiple apps across the page with it's own exclusive scope and mount point (islands).`,
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `App with Script (module) - Recommended`,
        },
        {
          label: 'Mounted to a sample island',
          helptext:
            'Added to start of body tag, app mounted to the sample island.',
          action: function () {
            const scriptArr = cdnScripts.islands.scriptModuleIsland
            processScriptInjection(scriptArr)
          },
        },
        {
          type: 'divider',
        },
        {
          type: 'header',
          label: `App with Script (classic)`,
        },
        {
          label: 'Mounted to a sample island',
          helptext:
            'Added before closing of body tag, app mounted to the sample island.',
          action: function () {
            const scriptArr = cdnScripts.islands.scriptClassicIsland
            processScriptInjection(scriptArr)
          },
        },
      )
    }

    menu.add({
      label: `Islands Architecture (partial hydration)`,
      submenu: addCdnScriptForIndividualIslands,
    })

    menu.add({
      type: 'divider',
    })

    const cloakAttr =
      frameworksLiteState.activeFramework.name === 'alpinejs'
        ? 'x-cloak'
        : frameworksLiteState.activeFramework.name.includes('vue')
        ? 'v-cloak'
        : ''

    if (cloakAttr) {
      menu.add({
        type: 'header',
        label: `Cloak inline style`,
      })

      menu.add({
        label: `Add ${cloakAttr} inline style`,
        action: function () {
          addCloakTag(cloakAttr)
          return
        },
        helptext: 'Added to head tag',
      })

      menu.add({
        type: 'divider',
      })
    }

    menu.add({
      type: 'header',
      label: `Progressive Hydration - How/when to hydrate islands (advanced)`,
    })

    menu.add({
      label: `Learn ${island.label} (official docs)`,
      action: function () {
        pinegrow.openExternalUrl(
          'https://www.11ty.dev/docs/plugins/partial-hydration/',
        )
      },
    })

    menu.add({
      label: `Add ${island.label} package`,
      helptext:
        'Package added to project, and import added to start of body tag.',
      action: function () {
        const projectRoot =
          pinegrow.getCurrentProject() && pinegrow.getCurrentProject().getDir()
        if (projectRoot) {
          addPackages(projectRoot, island)

          const scriptArr = island.cdnScripts.globalApp.scriptModuleNoExample
          processScriptInjection(scriptArr)
        } else {
          pinegrow.showQuickMessage(
            `Frameworks lite: Open a project first. ${island.label} can be added only to Pinegrow projects!`,
          )
        }
      },
    })

    const pikadayIntegrationIsland = island.cdnScripts.pikadayIntegrationIsland
    const pikadayIntegrationsScripts =
      frameworksLiteState.activeFramework.cdnScripts.islands
        ?.pikadayIntegrationsScripts
    const activeFxPrefix = frameworksLiteState.activeFramework.prefix || ''

    pikadayIntegrationsScripts?.forEach((pikadayIntegrationsScript) => {
      menu.add({
        label: `Add Pikaday Integration${
          pikadayIntegrationsScript.label
            ? ` (${pikadayIntegrationsScript.label})`
            : ''
        }`,
        helptext:
          'Added before closing of body tag, hydrates when entering viewport.',
        action: function () {
          pikadayIntegrationIsland[0].code = pikadayIntegrationIsland[0].code
            .replace('__SLOT__', pikadayIntegrationsScript.code)
            .replace('App-Appointment', `${activeFxPrefix}-App-Appointment`)
            .replace(
              'Island-Appointment',
              `${activeFxPrefix}-Island-Appointment`,
            )
          processScriptInjection(pikadayIntegrationIsland)
        },
      })
    })

    menu.add({
      type: 'divider',
    })

    menu.add({
      label: `Open Devtools`,
      action: function () {
        nw.Window.get().showDevTools()
        return
      },
      // helptext: '',
      kbd: 'CMD SHIFT C',
    })

    if (!frameworksLiteState.autoReloadOnUpdate) {
      frameworksLiteState.autoReloadOnUpdate = false
      if (projectInfo) {
        projectInfo.setSetting(
          'auto-reload-on-update',
          frameworksLiteState.autoReloadOnUpdate,
        )
      }
    }

    menu.add({
      label: `Auto reload on update`,
      helptext: 'Automatically reload page when directives are updated!',
      check: function () {
        return frameworksLiteState.autoReloadOnUpdate
      },
      action: function () {
        frameworksLiteState.autoReloadOnUpdate =
          !frameworksLiteState.autoReloadOnUpdate
        if (projectInfo) {
          projectInfo.setSetting(
            'auto-reload-on-update',
            frameworksLiteState.autoReloadOnUpdate,
          )
          projectInfo.save()
        }
      },
    })

    // menu.add({
    //   type: 'divider',
    // })

    // menu.add({
    //   label: `Quick Start`,
    //   helptext: 'In-app onboarding tutorial!',
    //   action: function () {
    //     tutorialPanel.openPanel()
    //   },
    // })
  }
}

const onProjectClosed = () => {
  $menu.remove()
  // Reload menu with vanilla settings
  frameworksLiteState.activeFramework = frameworks[0]
  frameworksLiteState.isShortform = false
  frameworksLiteState.autoReloadOnUpdate = false
  onProjectLoaded()
}

// Entry-1: Plugin loaded via plugin manager for the first time
// if (pinegrow.getCurrentProjectInfo() !== null) {
//   onProjectLoaded()
// }

const onSetWorkspaceTheme = (theme) => {
  console.log(theme)
}

// Entry-2: Plugin already loaded & Project was opened
pinegrow.addEventHandler('on_project_loaded', onProjectLoaded)
pinegrow.addEventHandler('on_project_closed', onProjectClosed)
pinegrow.addEventHandler('on_set_workspace_theme', onSetWorkspaceTheme)

// Entry-3: When opening just a page template and not a project
onProjectLoaded()

export { $menu }
