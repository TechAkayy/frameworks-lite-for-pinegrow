import { framework as pgFramework, templatesUrl } from './helpers.js'

try {
  var templates_url = __DEVMODE__ ? `${templatesUrl}/` : `${templatesUrl}/`
  var thumbs_url = templates_url + 'screenshots/'

  var pages = []

  pages.push(
    {
      name: 'petite-vue-page.html',
      desc_name: 'Petite Vue Page',
      url: templates_url + 'petite-vue-page.html',
      image_direct: thumbs_url + 'petite-vue-page.jpg',
    },
    {
      name: 'alpinejs-page.html',
      desc_name: 'Alpinejs Page',
      url: templates_url + 'alpinejs-page.html',
      image_direct: thumbs_url + 'alpinejs-page.jpg',
    },
    {
      name: 'standard-vue-page.html',
      desc_name: 'Standard Vue Page',
      url: templates_url + 'standard-vue-page.html',
      image_direct: thumbs_url + 'standard-vue-page.jpg',
    },
  )

  var notRequiredFiles = []
  var templatesOrder = pages.map((page) => page.url.replace(templates_url, ''))

  pgFramework.addTemplateProjectFromResourceFolder(
    'templates',
    null,
    0,
    function (node) {
      var currentFilesName = notRequiredFiles.filter(function (fileName) {
        return node.name == fileName
      })
      if (currentFilesName && currentFilesName.length > 0) {
        node.required = false
      }

      var nodeIndex = templatesOrder.indexOf(node.name)
      if (nodeIndex >= 0) node.order = nodeIndex
    },
  )
  pgFramework.templatesLoaded = true
} catch (err) {
  console.log(err)
}

// pinegrow.addEventHandler('on_project_closed', () => {
//   const flist = pinegrow.getFrameworksListFromStorage()
//   const newFlist = []

//   if (pluginUrl) {
//     let pluginRelativeUrl = pluginUrl
//     if (pluginUrl.indexOf('node_modules') > -1) {
//       pluginRelativeUrl = pluginUrl.substring(
//         pluginUrl.indexOf('node_modules') + 12
//       )
//     }
//     flist.forEach((url) => {
//       if (!url.endsWith(pluginRelativeUrl)) {
//         newFlist.push(url)
//       }
//     })
//   } else {
//     newFlist = flist
//   }

//   crsaStorage.setValue('frameworks', newFlist)
// })
