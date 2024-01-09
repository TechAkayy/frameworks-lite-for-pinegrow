import { framework } from './helpers.js'
import { directiveGroups } from './data/index.js'
import { TutorialPanel, tutorialPanelState } from './tutorial-panel.js'

export const capitalize = (s) => (s && s[0].toUpperCase() + s.slice(1)) || ''

const frameworks = Object.keys(directiveGroups).reduce((acc, name) => {
  const label = capitalize(name.replace('-', ' '))
  return [
    ...acc,
    {
      name,
      label,
    },
  ]
}, [])

// let activeFramework = frameworks[0]
tutorialPanelState.activeFramework = frameworks[0]
// fullform (false), shortform (true)
// let isShortform = false
tutorialPanelState.isShortform = false
// let autoReloadOnUpdate = false
tutorialPanelState.autoReloadOnUpdate = false

const $menu = $(`
<li class="aadropdown menu-addon">
    <a href="#" class="aadropdown-toggle" data-toggle="aadropdown"><span>Frameworks</span></a>
</li>
`)

const tutorialPanel = new TutorialPanel()

const onProjectLoaded = () => {
  $menu.remove()

  const projectInfo = pinegrow.getCurrentProjectInfo()
  if (projectInfo) {
    const lastUsedFramework = projectInfo.getSetting('framework_directives')
    if (lastUsedFramework) {
      tutorialPanelState.activeFramework = frameworks.find(
        (fx) => lastUsedFramework === fx.name,
      )
    }
    tutorialPanelState.isShortform = !!projectInfo.getSetting(
      'use-shortform-for-prop-binder',
    )
    tutorialPanelState.autoReloadOnUpdate = !!projectInfo.getSetting(
      'auto-reload-on-update',
    )
  }

  const activeDirectiveGroup =
    directiveGroups[tutorialPanelState.activeFramework.name]

  pinegrow.addPluginControlToTopbar(framework, $menu, true)

  let frameworks_menu = []
  frameworks.forEach((fx) => {
    frameworks_menu.push({
      label: fx.label,
      check: function () {
        return fx.name === tutorialPanelState.activeFramework.name
      },
      action: function () {
        tutorialPanelState.activeFramework = fx
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

    if (activeDirectiveGroup.propBinders?.length) {
      const helptext = activeDirectiveGroup.propBinders.reduce(
        (acc, { fullform, shortform }) =>
          `${acc ? `${acc}<br>` : acc}${fullform} as ${shortform}`,
        ``,
      )

      if (!tutorialPanelState.isShortform) {
        tutorialPanelState.isShortform = false
        if (projectInfo) {
          projectInfo.setSetting(
            'use-shortform-for-prop-binder',
            tutorialPanelState.isShortform,
          )
        }
      }

      // menu.add({
      //   label: `Use shorthand`,
      //   helptext,
      //   check: function () {
      //     return tutorialPanelState.isShortform
      //   },
      //   action: function () {
      //     tutorialPanelState.isShortform = !tutorialPanelState.isShortform
      //     if (projectInfo) {
      //       projectInfo.setSetting('use-shortform-for-prop-binder', tutorialPanelState.isShortform)
      //       projectInfo.save()
      //     }
      //   },
      // })
    }

    if (!tutorialPanelState.autoReloadOnUpdate) {
      tutorialPanelState.autoReloadOnUpdate = false
      if (projectInfo) {
        projectInfo.setSetting(
          'auto-reload-on-update',
          tutorialPanelState.autoReloadOnUpdate,
        )
      }
    }

    menu.add({
      label: `Auto reload on update`,
      helptext: 'Automatically reload page when directives are updated!',
      check: function () {
        return tutorialPanelState.autoReloadOnUpdate
      },
      action: function () {
        tutorialPanelState.autoReloadOnUpdate =
          !tutorialPanelState.autoReloadOnUpdate
        if (projectInfo) {
          projectInfo.setSetting(
            'auto-reload-on-update',
            tutorialPanelState.autoReloadOnUpdate,
          )
          projectInfo.save()
        }
      },
    })

    menu.add({
      type: 'divider',
    })

    menu.add({
      label: `Quick Start`,
      helptext: 'In-app onboarding tutorial!',
      action: function () {
        tutorialPanel.openPanel()
      },
    })
  }
}

const onProjectClosed = () => {
  $menu.remove()
  // Reload menu with vanilla settings
  tutorialPanelState.activeFramework = frameworks[0]
  tutorialPanelState.isShortform = false
  tutorialPanelState.autoReloadOnUpdate = false
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
