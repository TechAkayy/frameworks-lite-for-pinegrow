import {
  addPrefixToSectionsAndFields,
  bm,
  prefix,
  framework,
  getSpacingControl,
  getGappingControl,
  getArrangeControl,
  getDevicesControlFactory,
  onSectionWithDevicesControlsShown,
  makeFieldLabelForSize,
} from './helpers.js'

//Add common sections to all elements
export const def_all = new PgComponentType(prefix + 'all', 'All elements', {
  selector: function (pgel) {
    return true
  },
  name: 'Div',
  display_name: 'tag',
  priority: 2001,
  sections: addPrefixToSectionsAndFields({
    bstextcontext: {
      //...
    },
  }),
})
framework.addComponentType(def_all)

framework.on_get_floating_tools_sections = function (page, sections) {
  // ...
  floating_sections.forEach(function (s) {
    sections.push(s)
  })
}
