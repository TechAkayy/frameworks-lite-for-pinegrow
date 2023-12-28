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
const $menu = $(`
<li class="aadropdown menu-addon">
    <a href="#" class="aadropdown-toggle" data-toggle="aadropdown"><span>Frameworks</span></a>
</li>
`)

const onProjectLoaded = () => {
  const projectInfo = pinegrow.getCurrentProjectInfo()
  const lastUsedFramework = projectInfo.getSetting('framework_directives')

  activeFramework = frameworks[0]

  if (lastUsedFramework) {
    activeFramework = frameworks.find((fx) => lastUsedFramework === fx.name)
  }

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
        projectInfo.setSetting('framework_directives', fx.name)
        projectInfo.save()
        pinegrow.selectedElements.reselect()
      },
    })
  })

  var menuView = new PgDropdownMenu($('.menu-addon'))
  menuView.onGetActions = function (menu) {
    frameworks_menu.forEach((framework) => {
      menu.add(framework)
    })
  }
}

const onProjectClosed = () => {
  $menu.remove()
}

// Entry-1: Plugin loaded via plugin manager for the first time
if (pinegrow.getCurrentProjectInfo() !== null) onProjectLoaded()

// Entry-2: Plugin already loaded & Project was opened
pinegrow.addEventHandler('on_project_loaded', onProjectLoaded)
pinegrow.addEventHandler('on_project_closed', onProjectClosed)

export { activeFramework }
