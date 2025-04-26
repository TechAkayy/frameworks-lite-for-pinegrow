import { framework, dependencyRoot, isExistsAndDirectory } from './helpers.js'
import { pgFrameworkConfig as config } from './config.js'
import { frameworks, globalAppType } from './data/index.js'
import { frameworksLiteState } from './shared-state.js'
// import { tutorialPanel } from './tutorial-panel.js'
import island from './data/11ty/index.js'

const resetPreferences = () => {
  if (
    frameworksLiteState.activeFramework.scriptTypes[0].name === 'module-scripts'
  ) {
    frameworksLiteState.preferModuleScripts = true
  } else {
    frameworksLiteState.preferModuleScripts = false
  }

  if (frameworksLiteState.activeFramework.appTypes[0].name === 'islands') {
    frameworksLiteState.preferIslands = true
  } else {
    frameworksLiteState.preferIslands = false
  }
}

frameworksLiteState.activeFramework = frameworks[0]
resetPreferences()

const $menu = $(`
<li class="aadropdown menu-addon">
    <a href="#" class="aadropdown-toggle" data-toggle="aadropdown"><span>Frameworks</span></a>
</li>
`)

const processScriptInjection = (scriptArr) => {
  const page = pinegrow.getSelectedPage()
  if (page) {
    const headNode = page.sourceNode.findOne('head')
    const bodyNode = page.sourceNode.findOne('body')
    if (!headNode || !bodyNode) {
      pinegrow.showQuickMessage(
        'Frameworks Lite: Ensure that the page contains head and body tags!',
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

      api.insertElements(
        scriptObj.code.replace(
          '__SLOT1__',
          `${frameworksLiteState.activeFramework.prefix}-`,
        ),
        dest,
        insertPosition,
        {
          select: true,
          highlight: true,
          scroll: true,
          repeater: true,
          format_html: true,
        },
      )

      pinegrow.showQuickMessage(
        `Frameworks Lite: Added tags for ${frameworksLiteState.activeFramework.label} at ${scriptObj.injectTo} !`,
      )
    })

    setTimeout(() => {
      page.refresh()
    }, 500)
  } else {
    pinegrow.showQuickMessage('Frameworks Lite: Open a page first!')
  }
}

const addCloakTag = (attribute) => {
  try {
    const page = pinegrow.getSelectedPage()
    if (!page) {
      pinegrow.showQuickMessage('Frameworks Lite: Open a page first!')
      return
    }

    const styleTags = page.sourceNode.find('style')
    for (let i = 0; i < styleTags.length; i++) {
      const styleTag = styleTags[i]
      const vCloakExists = styleTag.content.includes('[v-cloak]')
      const xCloakExists = styleTag.content.includes('[x-cloak]')

      if (vCloakExists || xCloakExists) {
        pinegrow.showQuickMessage(
          `Frameworks Lite: ${
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
    const _preferIslands = projectInfo.getSetting('prefer_islands')
    if (_preferIslands !== undefined && _preferIslands !== null) {
      frameworksLiteState.preferIslands = !!_preferIslands
    }

    const _preferModuleScripts = projectInfo.getSetting('prefer_module_scripts')
    if (_preferModuleScripts !== undefined && _preferModuleScripts !== null) {
      frameworksLiteState.preferModuleScripts = !!_preferModuleScripts
    }

    const _isShortform = projectInfo.getSetting('use-shortform-for-prop-binder')
    if (_isShortform !== undefined && _isShortform !== null) {
      frameworksLiteState.isShortform = !!_isShortform
    }

    const _autoReloadOnUpdate = projectInfo.getSetting('auto-reload-on-update')
    if (_autoReloadOnUpdate !== undefined && _autoReloadOnUpdate !== null) {
      frameworksLiteState.autoReloadOnUpdate = !!_autoReloadOnUpdate
    }

    const lastUsedFramework = projectInfo.getSetting('framework_directives')
    if (lastUsedFramework) {
      frameworksLiteState.activeFramework = frameworks.find(
        (fx) => lastUsedFramework === fx.name,
      )
      resetPreferences()
    }
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
        resetPreferences()
        pinegrow.selectedElements.reselect()
      },
    })
  })

  var menuView = new PgDropdownMenu($('.menu-addon'))

  menuView.onGetActions = function (menu) {
    let stepNo = 1
    menu.add({
      label: `Video Tutorial & Docs`,
      action: function () {
        pinegrow.openExternalUrl(config.video_tutorial)
      },
    })

    menu.add({
      type: 'divider',
    })

    menu.add({
      type: 'header',
      label: `Step ${stepNo++}: Choose a framework for the page`,
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
      label: `Step ${stepNo++}: Add a sample app to page`,
    })

    // menu.add({
    //   type: 'header',
    //   label: `Progressive Enhancement (choose between either to add cdn scripts, don't mix both)`,
    // })

    frameworksLiteState.activeFramework.appTypes.forEach((appType) => {
      if (
        (frameworksLiteState.preferIslands && appType.name === 'global-app') ||
        (!frameworksLiteState.preferIslands && appType.name === 'islands')
      ) {
        return
      }

      const addSampleAppSubMenu = []

      appType.headers.forEach((header) => {
        addSampleAppSubMenu.push(
          {
            type: 'header',
            label: header,
          },
          {
            type: 'divider',
          },
        )
      })

      if (frameworksLiteState.preferModuleScripts) {
        // Minimal Module Scripts & Samples
        const scriptType = frameworksLiteState.activeFramework.scriptTypes.find(
          (scriptType) => scriptType.name === 'module-scripts',
        )

        scriptType.headers.forEach((header) => {
          addSampleAppSubMenu.push(
            {
              type: 'header',
              label: header,
            },
            {
              type: 'divider',
            },
          )
        })

        if (appType.name === 'global-app') {
          frameworksLiteState.activeFramework.cdnScripts.globalApp
            .scriptModuleNoExample &&
            addSampleAppSubMenu.push({
              label: 'Sample App (empty state)',
              helptext: 'Added to start of body tag.',
              action: function () {
                const scriptArr =
                  frameworksLiteState.activeFramework.cdnScripts.globalApp
                    .scriptModuleNoExample
                processScriptInjection(scriptArr)
              },
            })

          frameworksLiteState.activeFramework.cdnScripts.globalApp
            .scriptModuleWithExample &&
            addSampleAppSubMenu.push({
              label: 'Sample App (with state & template)',
              helptext: 'Added to start of body tag.',
              action: function () {
                const scriptArr =
                  frameworksLiteState.activeFramework.cdnScripts.globalApp
                    .scriptModuleWithExample
                processScriptInjection(scriptArr)
              },
            })
        } else {
          frameworksLiteState.activeFramework.cdnScripts.islands
            .scriptModuleIsland &&
            addSampleAppSubMenu.push({
              label: 'Sample Island App',
              helptext:
                'Added to start of body tag, app mounted to the sample island.',
              action: function () {
                const scriptArr =
                  frameworksLiteState.activeFramework.cdnScripts.islands
                    .scriptModuleIsland
                processScriptInjection(scriptArr)
              },
            })
        }

        addSampleAppSubMenu.push(
          ...frameworksLiteState.activeFramework.samples.map(
            ({ label, globalApp, island }) => ({
              label,
              helptext: 'Added to start of body tag.',
              action: function () {
                const scriptArr =
                  appType.name === 'global-app' ? globalApp : island
                processScriptInjection(scriptArr)
              },
            }),
          ),
        )
      } else {
        addSampleAppSubMenu.push({
          type: 'divider',
        })

        // Minimal Classic Scripts
        const scriptType = frameworksLiteState.activeFramework.scriptTypes.find(
          (scriptType) => scriptType.name === 'classic-scripts',
        )

        scriptType.headers.forEach((header) => {
          addSampleAppSubMenu.push(
            {
              type: 'header',
              label: header,
            },
            {
              type: 'divider',
            },
          )
        })

        if (appType.name === 'global-app') {
          frameworksLiteState.activeFramework.cdnScripts.globalApp
            .scriptClassicNoExample &&
            addSampleAppSubMenu.push({
              label: 'Sample App (empty state)',
              helptext: 'Added before closing of body tag.',
              action: function () {
                const scriptArr =
                  frameworksLiteState.activeFramework.cdnScripts.globalApp
                    .scriptClassicNoExample
                processScriptInjection(scriptArr)
              },
            })
          frameworksLiteState.activeFramework.cdnScripts.globalApp
            .scriptClassicWithExample &&
            addSampleAppSubMenu.push({
              label: 'Sample App (with state & template)',
              helptext: 'Added before closing of body tag.',
              action: function () {
                const scriptArr =
                  frameworksLiteState.activeFramework.cdnScripts.globalApp
                    .scriptClassicWithExample
                processScriptInjection(scriptArr)
              },
            })

          frameworksLiteState.activeFramework.cdnScripts.globalApp
            .scriptClassicAutoInit &&
            addSampleAppSubMenu.push(
              {
                type: 'divider',
              },
              {
                label: 'Add bare script tag to head',
                helptext:
                  'Added to head tag, includes defer and init attributes.',
                action: function () {
                  const scriptArr =
                    frameworksLiteState.activeFramework.cdnScripts.globalApp
                      .scriptClassicAutoInit
                  processScriptInjection(scriptArr)
                },
              },
            )
        } else {
          frameworksLiteState.activeFramework.cdnScripts.islands
            .scriptClassicIsland &&
            addSampleAppSubMenu.push({
              label: 'Sample Island App',
              helptext:
                'Added to start of body tag, app mounted to the sample island.',
              action: function () {
                const scriptArr =
                  frameworksLiteState.activeFramework.cdnScripts.islands
                    .scriptClassicIsland
                processScriptInjection(scriptArr)
              },
            })
        }
      }

      appType.footers.forEach((footer) => {
        addSampleAppSubMenu.push(
          {
            type: 'divider',
          },
          {
            type: 'header',
            label: footer,
          },
        )
      })

      menu.add({
        label: appType.label,
        submenu: addSampleAppSubMenu,
      })
    })

    const cloakAttr =
      frameworksLiteState.activeFramework.name === 'alpinejs'
        ? 'x-cloak'
        : frameworksLiteState.activeFramework.name.includes('vue')
        ? 'v-cloak'
        : ''

    if (cloakAttr) {
      menu.add({
        type: 'divider',
      })

      menu.add({
        type: 'header',
        label: `Step ${stepNo++}: Enable use of cloak directive to hide flash of unrendered content`,
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

    const lltyIntegration = !!(
      frameworksLiteState.activeFramework.name === 'alpinejs' ||
      frameworksLiteState.activeFramework.name.includes('vue')
    )

    if (lltyIntegration) {
      menu.add({
        type: 'header',
        label: `Step ${stepNo++}: Optionally, load and hydrate islands conditionally`,
      })

      const add11tyIntegrations = []

      island.headers.forEach((header) => {
        add11tyIntegrations.push({
          type: 'header',
          label: header,
        })
      })

      // Restricted Sample Apps to use only Module Scripts
      frameworksLiteState.preferIslands &&
        frameworksLiteState.preferModuleScripts &&
        frameworksLiteState.activeFramework.appTypes.forEach((appType) => {
          if (
            (frameworksLiteState.preferIslands &&
              appType.name === 'global-app') ||
            (!frameworksLiteState.preferIslands && appType.name === 'islands')
          ) {
            return
          }

          const samplesOfActiveFramework = island.samples.filter(
            (sample) =>
              sample.framework === frameworksLiteState.activeFramework.name,
          )

          samplesOfActiveFramework.length &&
            add11tyIntegrations.push(
              {
                type: 'divider',
              },
              {
                type: 'header',
                label: appType.label,
              },
            )

          // GlobalApp
          samplesOfActiveFramework.forEach(
            ({ name, label, helptext, globalApp, island }) => {
              add11tyIntegrations.push({
                label,
                helptext,
                action: function () {
                  const scriptArr =
                    appType.name === 'global-app' ? globalApp : island
                  processScriptInjection(scriptArr)
                },
              })
            },
          )
        })

      add11tyIntegrations.push({
        type: 'divider',
      })

      const lltyGlobalApp = island.cdnScripts.globalApp.scriptModuleNoExample
      const pikadayIntegrationIsland =
        island.cdnScripts.pikadayIntegrationIsland
      const pikadayIntegrationsScripts =
        frameworksLiteState.activeFramework.cdnScripts.islands
          ?.pikadayIntegrationsScripts

      pikadayIntegrationsScripts?.forEach((pikadayIntegrationsScript) => {
        const localPikadayIntegrationIsland = [
          lltyGlobalApp,
          {
            ...pikadayIntegrationIsland,
            code: pikadayIntegrationIsland.code
              .replace(
                '__SLOT1__',
                `${frameworksLiteState.activeFramework.prefix}-`,
              )
              .replace('__SLOT2__', pikadayIntegrationsScript.__SLOT2__ || '')
              .replace('__SLOT3__', pikadayIntegrationsScript.__SLOT3__ || ''),
          },
        ]

        add11tyIntegrations.push({
          label: `Pikaday Datepicker${
            pikadayIntegrationsScript.label
              ? ` (${pikadayIntegrationsScript.label})`
              : ''
          }`,
          helptext:
            'Added before closing of body tag, hydrates when entering viewport.',
          action: function () {
            processScriptInjection(localPikadayIntegrationIsland)
          },
        })
      })

      add11tyIntegrations.push({
        type: 'divider',
      })

      add11tyIntegrations.push({
        type: 'header',
        label: `Refer to official docs for detailed usage`,
      })

      add11tyIntegrations.push({
        type: 'divider',
      })

      add11tyIntegrations.push({
        label: `Learn ${island.label} (official docs)`,
        action: function () {
          pinegrow.openExternalUrl(
            'https://www.11ty.dev/docs/plugins/partial-hydration/',
          )
        },
      })

      menu.add({
        label: `${island.label} (advanced)`,
        submenu: add11tyIntegrations,
      })
    }

    if (projectInfo) {
      menu.add({
        type: 'divider',
      })

      if (
        frameworksLiteState.activeFramework.appTypes.length > 1 ||
        frameworksLiteState.activeFramework.scriptTypes.length > 1
      ) {
        menu.add({
          type: 'header',
          label: 'Preference',
        })
      }

      if (frameworksLiteState.activeFramework.appTypes.length > 1) {
        menu.add({
          label: `Prefer Islands`,
          helptext: 'Prefer Islands over Global App!',
          check: function () {
            return frameworksLiteState.preferIslands
          },
          action: function () {
            frameworksLiteState.preferIslands =
              !frameworksLiteState.preferIslands
            if (projectInfo) {
              projectInfo.setSetting(
                'prefer_islands',
                frameworksLiteState.preferIslands,
              )
              projectInfo.save()
            }
            pinegrow.showAlert(
              `Ensure you use one app-type in your page, either Islands or a Global App. Mixing them up might result in unexpected conflicts and errors.`,
              'Islands vs Global App',
              'Ok',
            )
          },
        })
      }

      if (frameworksLiteState.activeFramework.scriptTypes.length > 1) {
        menu.add({
          label: `Prefer Module Scripts`,
          helptext: 'Prefer Module Scripts over Classic Scripts!',
          check: function () {
            return frameworksLiteState.preferModuleScripts
          },
          action: function () {
            frameworksLiteState.preferModuleScripts =
              !frameworksLiteState.preferModuleScripts
            if (projectInfo) {
              projectInfo.setSetting(
                'prefer_module_scripts',
                frameworksLiteState.preferModuleScripts,
              )
              projectInfo.save()
            }
            pinegrow.showAlert(
              `Ensure you use one script-type in your page for the same library. Mixing them up might result in unexpected conflicts and errors.`,
              'Module Scripts vs Classic Scripts',
              'Ok',
            )
          },
        })
      }

      menu.add({
        type: 'divider',
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
    }

    menu.add({
      label: `Open Devtools`,
      action: function () {
        nw.Window.get().showDevTools()
        return
      },
      // helptext: '',
      kbd: 'CMD SHIFT C',
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
  resetPreferences()
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
