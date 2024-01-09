import { framework } from './helpers.js'
import { directiveGroups } from './data/index.js'

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

let activeFramework

// fullform (false), shortform (true)
let isShortform

let autoReloadOnUpdate

const $menu = $(`
<li class="aadropdown menu-addon">
    <a href="#" class="aadropdown-toggle" data-toggle="aadropdown"><span>Frameworks</span></a>
</li>
`)

const onProjectLoaded = () => {
  $menu.remove()

  activeFramework = frameworks[0]
  isShortform = false
  autoReloadOnUpdate = false

  const projectInfo = pinegrow.getCurrentProjectInfo()
  if (projectInfo) {
    const lastUsedFramework = projectInfo.getSetting('framework_directives')
    if (lastUsedFramework) {
      activeFramework = frameworks.find((fx) => lastUsedFramework === fx.name)
    }
    isShortform = !!projectInfo.getSetting('use-shortform-for-prop-binder')
    autoReloadOnUpdate = !!projectInfo.getSetting('auto-reload-on-update')
  }

  const activeDirectiveGroup = directiveGroups[activeFramework.name]

  pinegrow.addPluginControlToTopbar(framework, $menu, true)

  let frameworks_menu = []
  frameworks.forEach((fx) => {
    frameworks_menu.push({
      label: fx.label,
      check: function () {
        return fx.name === activeFramework.name
      },
      action: function () {
        activeFramework = fx
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

      if (!isShortform) {
        isShortform = false
        if (projectInfo) {
          projectInfo.setSetting('use-shortform-for-prop-binder', isShortform)
        }
      }

      // menu.add({
      //   label: `Use shorthand`,
      //   helptext,
      //   check: function () {
      //     return isShortform
      //   },
      //   action: function () {
      //     isShortform = !isShortform
      //     if (projectInfo) {
      //       projectInfo.setSetting('use-shortform-for-prop-binder', isShortform)
      //       projectInfo.save()
      //     }
      //   },
      // })
    }

    if (!autoReloadOnUpdate) {
      autoReloadOnUpdate = false
      if (projectInfo) {
        projectInfo.setSetting('auto-reload-on-update', autoReloadOnUpdate)
      }
    }

    menu.add({
      label: `Auto reload on update`,
      helptext: 'Automatically reload page when directives are updated!',
      check: function () {
        return autoReloadOnUpdate
      },
      action: function () {
        autoReloadOnUpdate = !autoReloadOnUpdate
        if (projectInfo) {
          projectInfo.setSetting('auto-reload-on-update', autoReloadOnUpdate)
          projectInfo.save()
        }
      },
    })
  }
}

const onProjectClosed = () => {
  $menu.remove()
  // Reload menu with vanilla settings
  onProjectLoaded()
}

// Entry-1: Plugin loaded via plugin manager for the first time
if (pinegrow.getCurrentProjectInfo() !== null) {
  onProjectLoaded()
}

// Entry-2: Plugin already loaded & Project was opened
pinegrow.addEventHandler('on_project_loaded', onProjectLoaded)
pinegrow.addEventHandler('on_project_closed', onProjectClosed)

// Entry-3: When opening just a page template and not a project
onProjectLoaded()

export { activeFramework, isShortform, autoReloadOnUpdate }
