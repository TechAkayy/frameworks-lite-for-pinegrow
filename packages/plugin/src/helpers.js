import { framework as f } from './framework.js'
export { f as framework }

import { pgFrameworkConfig as config } from './config.js'

export const prefix = config.prefix
var simple = config.simple
export const key = config.key

export const addLibSection = function (sec) {
  if (!simple) {
    f.addLibSection(sec)
  }
}

import path from 'path'
// import { fileURLToPath } from 'url'

// const __filename = fileURLToPath(import.meta.url)
// export const __dirname = path.dirname(__filename)

// https://stackoverflow.com/a/27369985
var getCurrentScript = function () {
  if (document.currentScript) {
    return document.currentScript.src
  } else {
    var scripts = document.getElementsByTagName('script')
    for (let i = 0; i < scripts.length; i++) {
      const script = scripts[i]
      if (script.src.includes(config.type)) {
        return script.src
      }
    }
  }
}

let pluginUrl
if (f.pluginUrl) {
  pluginUrl = f.pluginUrl
} else {
  pluginUrl = getCurrentScript()
  f.pluginUrl = pluginUrl
}

export { pluginUrl }

export const pluginPath = crsaMakeFileFromUrl(pluginUrl)
const dependencyRoot = path.dirname(pluginPath)

export const templatesPath = path.resolve(dependencyRoot, config.templates_path)
// .replace('src', 'dist')
export const templatesUrl = crsaMakeUrlFromFile(templatesPath)
f.templatesUrl = templatesUrl
