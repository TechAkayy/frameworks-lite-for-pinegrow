import { framework } from './helpers.js'
import { frameworks } from './data/index.js'
import { frameworksLiteState } from './shared-state.js'
// import { tutorialPanel } from './tutorial-panel.js'

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
      label: `Add CDN Script (choose one of below two options)`,
    })

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
          type: 'header',
          label: `App with Script (module) - Recommended`,
        },
        {
          label: 'Manual init with an example',
          helptext: 'Added to start of body tag.',
          action: function () {
            // Add script block to start of body tag
          },
        },
        {
          label: 'Manual init only',
          helptext: 'Added to start of body tag.',
          action: function () {
            // Add script block to start of body tag
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
          label: 'Manual init with an example',
          helptext: 'Added before closing of body tag.',
          action: function () {
            // Add script block before closing body tag
          },
        },
        {
          label: 'Manual init only',
          helptext: 'Added before closing of body tag.',
          action: function () {
            // Add script block before closing body tag
          },
        },
        {
          type: 'divider',
        },
        {
          label: 'Auto init (simplest - added to head tag)',
          helptext: 'Added to head tag, includes defer and init attributes.',
          action: function () {
            // Add script to head tag
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
          type: 'header',
          label: `App with Script (classic)`,
        },
        {
          label: 'Manual init with an example',
          helptext: 'Added before closing of body tag.',
          action: function () {
            // Add script block before closing body tag
          },
        },
        {
          label: 'Manual init only',
          helptext: 'Added before closing of body tag.',
          action: function () {
            // Add script block before closing body tag
          },
        },
        {
          type: 'divider',
        },
        {
          label: 'Auto init (simplest - added to head tag)',
          helptext: 'Added to head tag, includes defer attribute.',
          action: function () {
            // Add script to head tag
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
      label: `Global App`,
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
            // Add script block to start of body tag
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
            // Add script block before closing body tag
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
            // Add script block to start of body tag
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
            // Add script block before closing body tag
          },
        },
      )
    }

    menu.add({
      label: `Individual Islands`,
      submenu: addCdnScriptForIndividualIslands,
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
