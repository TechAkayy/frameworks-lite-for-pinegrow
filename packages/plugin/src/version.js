import { framework as f } from './framework.js'
import { pgFrameworkConfig as config } from './config.js'

export let version = config.minor_version
export let minor_version = config.version

let current_version

const setCurrentVersion = function (ver) {
  current_version = ver
  f.name_short = `${config.name}`
}

var force_version = pinegrow.getSetting(`${config.key}-force-version`, 'auto')
if (force_version != 'auto') {
  setCurrentVersion(parseFloat(force_version))
}

// export const getVersionForPage = function (page, force) {
//   if (force_version != 'auto') {
//     setCurrentVersion(parseFloat(force_version))
//     return
//   }
//   if (page.data[`${config.type}Version`] && !force) {
//     setCurrentVersion(page.data[`${config.type}Version`])
//     //console.log('version = ' + current_version);
//   } else {
//     page.stylesheetsThatContain(
//       /bootstrap\sv(5[0-9\.]*)/i,
//       /bootstrap(\.min|)\.(css)/i,
//       function (list, matches, async) {
//         if (list.length > 0) {
//           var a = matches[0][1].split('.')
//           var version = parseFloat(a[0])
//           if (a.length > 1) {
//             version += parseFloat(a[1]) / 10.0
//           }
//           setCurrentVersion(version)
//           page.data[`${config.type}Version`] = version
//           if (async) {
//             pinegrow.selectedElements.reselect() //trigger update
//           }
//           console.log('version = ' + current_version + ' ' + async)
//         }
//       },
//       force,
//     )
//   }
// }

export const reqVersion = function (min_ver) {
  return current_version >= min_ver
}

export const skipVersion = function (min_ver) {
  return current_version < min_ver
}

setCurrentVersion(version)
