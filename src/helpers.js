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
import { fileURLToPath } from 'url'
const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

export const pluginPath = path
  .resolve(__dirname, config.plugin_path)
  .replace('src', 'dist')
export const pluginUrl = crsaMakeUrlFromFile(pluginPath)
f.pluginUrl = pluginUrl

export const templatesPath = path
  .resolve(__dirname, config.templates_path)
  .replace('src', 'dist')
export const templatesUrl = crsaMakeUrlFromFile(templatesPath)
f.templatesUrl = templatesUrl
