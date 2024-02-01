export const pgFrameworkConfig = {
  // Templates are expected at the same base url of pluginURL (pluginPath). So, plugin.cjs & templates folder are to be in the same folder inside dist. Hence, the plugin.cjs is not generated into a separate folder like './lib/plugin.cjs'
  plugin_path: './plugin.cjs',
  templates_path: './templates',

  version: '2.0.0',
  major_version: '2',
  minor_version: '2.0',

  //Optional, add a badge to the framework list notify user of new or updated status
  info_badge: '',

  // Define a framework type - if you plan on having multiple versions, this should be the same for each version.

  type: 'frameworks-lite-for-pinegrow',
  short_type: 'frameworkslite4pg',
  //Prevent the activation of multiple versions of the framework - if this should be allowed, change to false
  allow_single_type: true,

  short_name: 'Frameworks Lite',

  dependency: '@techakayy/frameworks-lite-for-pinegrow',

  get name() {
    return `${this.short_name} ${this.minor_version}`
  },

  get key() {
    return `${this.type}`
  },

  // shouldn't contain /, for eg, @nuxt/ui
  get scriptTagId() {
    return `${this.short_type}`
  },

  get prefix() {
    return `${this.short_type}${this.minor_version}`
  },

  // Which library this plugin is for
  get library() {
    return `${this.type}`
  },

  syncWithLibrarySemVer: 'minor',

  //Add a framework description to be displayed with the framework templates
  get description() {
    return `<a href="http://github.com/techakayy/frameworks-lite-for-pinegrow">${this.name}</a> components & blocks.`
  },

  //Add a framework author to be displayed with the framework templates
  author: 'Ahmed Kaja',

  //Add a website "https://techakayy.com" or mailto "mailto:info@techakayy.com" link for redirect on author name click
  author_link: 'http://github.com/techakayy/frameworks-lite-for-pinegrow',
  video_tutorial:
    'https://github.com/techakayy/frameworks-lite-for-pinegrow#frameworks-lite-for-pinegrow---a-community-plugin',

  // get pgf_type() {
  // 	return pgf[this.type]
  // },

  get default() {
    return (this.pgf_type && this.pgf_type.activated_by_default) || false
  },

  get show_in_manager() {
    return true
  },

  skip_opening_new_pages_created_from_templates: true,
  show_templates_only_inside_projects: true,
  // no_prop_section_subtitles: true,
  // TODO - when is this used?
  get simple() {
    return (this.pgf_type && this.pgf_type.simple) || false
  },

  // TODO: applicable?
  // ignore_css_files: [
  // /(^|\/)vuetify\.(css)/i,
  // /(^|\/)vuetify\.min\.(css)/i,
  // /(^|\/)materialdesignicons\.(css)/i,
  // /(^|\/)materialdesignicons\.min\.(css)/i,
  // ],

  // TODO: applicable?
  // detect_async: function (crsaPage, done) {
  //   crsaPage.stylesheetsThatContain(
  //     /vuetify\sv3/i,
  //     /vuetify(\.min|)\.(css)/i,
  //     function (list) {
  //       done(list.length > 0)
  //     },
  //   )
  // },
}
