import { pgFrameworkConfig as config } from './config.js'

var framework = new PgFramework(config.key, config.name)
framework.type = config.type
framework.allow_single_type = config.allow_single_type
framework.description = config.description
framework.author = config.author
framework.author_link = config.author_link
framework.info_badge = config.info_badge
framework.default = config.default
framework.show_in_manager = config.show_in_manager
framework.ignore_css_files = config.ignore_css_files
framework.detect_async = config.detect_async
// Used to get url if script is included directly into edit.html
framework.setScriptFileByScriptTagId(
  `plugin-${config.scriptTagId}-${config.major_version}-mt`,
) //get url if script is included directly into edit.html
framework.skip_opening_new_pages_created_from_templates =
  config.skip_opening_new_pages_created_from_templates
framework.show_templates_only_inside_projects =
  config.show_templates_only_inside_projects
framework.no_prop_section_subtitles = config.no_prop_section_subtitles
pinegrow.addFramework(framework, 3)

// THIS DOESN'T WORK, AS WEBPACK import.meta.url GETS REPLACE WITH ACTUAL VALUES DURING BUILD
// import { fileURLToPath } from 'url'
// const __dirname = path.dirname(fileURLToPath(import.meta.url))
// framework.dependencyRoot = path.resolve(__dirname, '..')

export { framework }
