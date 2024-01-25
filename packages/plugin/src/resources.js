import { frameworks } from './data/index.js'
import { frameworksLiteState } from './shared-state.js'
import { framework as pgFramework, templatesUrl } from './helpers.js'

try {
  var templates_url = __DEVMODE__ ? `${templatesUrl}/` : `${templatesUrl}/`
  var thumbs_url = templates_url + 'screenshots/'

  var pages = []

  pages.push(
    {
      name: 'petite-vue-global-app.html',
      desc_name: 'Petite Vue - Global App',
      url: templates_url + 'petite-vue-global-app.html',
      image_direct: thumbs_url + 'petite-vue-global-app.jpg',
    },
    {
      name: 'petite-vue-islands.html',
      desc_name: 'Petite Vue - Islands',
      url: templates_url + 'petite-vue-islands.html',
      image_direct: thumbs_url + 'petite-vue-islands.jpg',
    },
    {
      name: 'alpinejs-global-app.html',
      desc_name: 'Alpinejs - Global App',
      url: templates_url + 'alpinejs-global-app.html',
      image_direct: thumbs_url + 'alpinejs-global-app.jpg',
    },
    {
      name: 'standard-vue-islands.html',
      desc_name: 'Standard Vue - Islands',
      url: templates_url + 'standard-vue-islands.html',
      image_direct: thumbs_url + 'standard-vue-islands.jpg',
    },
    {
      name: 'example-commits.html',
      desc_name: 'example-commits',
      url: templates_url + 'example-commits.html',
      image_direct: thumbs_url + 'example-commits.jpg',
    },
    {
      name: 'example-grid.html',
      desc_name: 'example-grid',
      url: templates_url + 'example-grid.html',
      image_direct: thumbs_url + 'example-grid.jpg',
    },
    {
      name: 'example-markdown.html',
      desc_name: 'example-markdown',
      url: templates_url + 'example-markdown.html',
      image_direct: thumbs_url + 'example-markdown.jpg',
    },
    {
      name: 'example-svg.html',
      desc_name: 'example-svg',
      url: templates_url + 'example-svg.html',
      image_direct: thumbs_url + 'example-svg.jpg',
    },
    {
      name: 'example-todomvc.html',
      desc_name: 'example-todomvc',
      url: templates_url + 'example-todomvc.html',
      image_direct: thumbs_url + 'example-todomvc.jpg',
    },
    {
      name: 'example-tree.html',
      desc_name: 'example-tree',
      url: templates_url + 'example-tree.html',
      image_direct: thumbs_url + 'example-tree.jpg',
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

const onFileCreatedFromMasterPage = (file, selectedProject, cb, info) => {
  if (file.name.includes('standard-vue')) {
    frameworksLiteState.activeFramework = frameworks.find(
      (fx) => 'standard-vue' === fx.name,
    )
  } else if (file.name.includes('alpinejs')) {
    frameworksLiteState.activeFramework = frameworks.find(
      (fx) => 'alpinejs' === fx.name,
    )
  } else {
    frameworksLiteState.activeFramework = frameworks.find(
      (fx) => 'petite-vue' === fx.name,
    )
  }
}

pinegrow.addEventHandler(
  'on_file_created_from_master_page',
  onFileCreatedFromMasterPage,
)
