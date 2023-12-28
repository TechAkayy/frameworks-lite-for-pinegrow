import { key, framework, addLibSection } from './helpers.js'
import { directiveGroups } from './data/index.js'
import { activeFramework } from './menu.js'

const onShowProperties = (page, sections, pgel, defs, showPropertiesView) => {
  if (!showPropertiesView.showCustomSections) {
    //custom sections should not be shown in this panel (for example, TW bottom props).
    return
  }

  const findAttrsInList = function (attr, list, single, pgel) {
    if (!list) list = pgel.getAttrList()
    var r = []
    attr = attr.toLowerCase()
    for (var i = 0; i < list.length; i++) {
      if (attr === list[i].name_lc) {
        if (single) return list[i]
        r.push(list[i])
      }
    }
    if (single) return null
    return r
  }

  const findSingleAttr = function (attr, pgel) {
    return findAttrsInList(attr, null, true, pgel)
  }

  const addDirectives = (title, label, directives) => {
    //Add another section for VUE directives
    const directives_section = {
      framework,
      name: `${title} Directives`,
      fields: {},
    }

    const directivesAttributes = directives.map((action) => action.attribute)
    const infoColor =
      pinegrow.getWorkspaceTheme() === 'light' ? '#4396c7' : '#33add6'
    //go through attributes and list all directives
    pgel.getAttrList().forEach(function (a) {
      if (directivesAttributes.includes(a.name)) {
        const field_key = key + '.' + a.name
        directives_section.fields[field_key] = {
          type: 'text',
          name: a.name,
          action: 'custom',
          // attribute: a.name,
          with_clear_icon: function () {
            const api = new PgApi()
            api.removeAttribute(null /* to all sel elements */, a.name)
            //a quick and dumb way to refresh the prop panel
            pinegrow.selectedElements.reselect()
          },

          // From attribute editor to this prop defn (Into Control)
          get_value: function (pgel, field_key, values, fdef) {
            // Look for 'client:load' in pgel
            var attr = findSingleAttr(fdef.name, pgel)

            if (attr) {
              var value = attr.value
              if (value === 'true') {
                pgel.setAttr(attr.name, null)
              }
              return value || 'true'
            }
          },

          // From this prop defn to attribute editor (From Control)
          set_value: function (
            pgel,
            value,
            values,
            oldValue,
            eventType,
            fdef,
            $field,
          ) {
            // fdef.name = "maxHeight"
            // fdef.name = "maxHeight", then fieldDefnPropKebabized would be 'max-height'
            // Look for 'max-height'
            var attr = findSingleAttr(fdef.name, pgel)

            // Remove existing msg if the props panel msg is binded (:msg)
            // if ((!value || value === 'false') && attr) {
            // 	// if control has ':maxHeight' or 'v-bind:maxHeight', and pgel has 'max-height', then remove the unbounded attr from pgel
            // 	pgel.removeAttr(attr.name)
            // 	pinegrow.reselectElement()
            // 	return
            // }

            if (value === 'true') {
              pgel.setAttr(attr.name, null)
            } else {
              pgel.setAttr(attr.name, value)
            }
            return value
          },
          on_fields_created: (
            pgel,
            field_key,
            value,
            fdef,
            $field,
            values,
            recycled,
          ) => {
            // console.log('Field Created')
          },
          on_field_updated: (pgel, $field, fdef, control, field_key, field) => {
            // console.log('Field Updated')
            // Nudge so that clear-icon shows up
            var $inputContainer = $field.find('div.crsa-input')
            var $input = $inputContainer.find('input.crsa-input')
            if ($input.length) {
              $input.trigger('change')
            }
          },
        }
      }
    })

    //Add "Add directive" button
    directives_section.fields[title + '.add_directive'] = {
      type: 'button',
      name: label,
      func: function (pgel, $b, values, $fc, event) {
        event.preventDefault()
        event.stopPropagation()

        const addDirective = function () {
          const api = new PgApi()
          api.setAttribute(
            null /* to all sel elements */,
            this.attribute,
            this.default_value,
          )
          //a quick and dumb way to refresh the prop panel
          pinegrow.selectedElements.reselect()
        }

        const actions = directives.map((directive) => ({
          ...directive,
          action: addDirective,
        }))

        const m = new CrsaContextMenu(actions, $b)
        m.showForElement($b, null, 4)
      },
    }

    //remove previous directives section
    const indexDirectives = sections.findIndex(
      (section) => section.name === `${title} Directives`,
    )
    if (indexDirectives > -1) {
      sections.splice(indexDirectives, 1)
    }

    sections.unshift(directives_section)
  }

  Object.entries(directiveGroups).forEach(([frameworkName, directives]) => {
    if (frameworkName === activeFramework.name) {
      addDirectives(frameworkName, 'Add directive', directives)
    }
  })

  // Remove Properties for <button> on top
  $('.pg-show-properties-name').remove()
}

pinegrow.addEventHandler('on_show_properties', onShowProperties)
