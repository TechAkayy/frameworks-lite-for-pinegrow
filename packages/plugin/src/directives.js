import { key, framework, addLibSection } from './helpers.js'
import { frameworks } from './data/index.js'
import { frameworksLiteState } from './shared-state.js'
import { ClearAction } from './action-clear.js'
import { DeleteAction } from './action-delete.js'

let activeFramework, isShortform, autoReloadOnUpdate

const onShowProperties = (page, sections, pgel, defs, showPropertiesView) => {
  activeFramework = frameworksLiteState.activeFramework
  isShortform = frameworksLiteState.isShortform
  autoReloadOnUpdate = frameworksLiteState.autoReloadOnUpdate

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

  const getAttrList = (pgel) => {
    const _this = pgel
    const attrList = []
    if (
      pgel.script ||
      pgel.comment ||
      !pgel.attributes ||
      pgel.attributes.length === 0
    ) {
      return attrList
    }

    var i = 0
    var in_name = true
    var in_value = false
    var cur_name = ''
    var cur_value = ''
    var in_quote = null

    var attrReadUntil = function (end_ch, ignore) {
      //var idx = _this.attributes.indexOf(end_ch, i);

      var idx = scripts_possible
        ? indexOfCodeAware(_this.attributes, end_ch, i)
        : _this.attributes.indexOf(end_ch, i)

      do {
        if (idx < 0) {
          i = _this.attributes.length
          return null
        } else {
          /*
                 if(ignore) {
                 var ign_idx = _this.attributes.indexOf(ignore, i);
                 if(ign_idx >= 0 && idx >= ign_idx && idx + end_ch.length <= ign_idx + ignore.length) {
                 i = idx + end_ch.length;
                 continue;
                 }
                 }
                 */
          var s = _this.attributes.substr(i, idx - i)
          i = idx + end_ch.length
          return s
        }
      } while (i < _this.attributes.length)
    }

    var scripts_possible = pgel.attributes.indexOf('<') >= 0

    while (i < pgel.attributes.length) {
      var ch = pgel.attributes.charAt(i)
      if (
        ch === ' ' ||
        ch === '\t' ||
        ch === '\n' ||
        ch === '\r' ||
        ch === '/' ||
        ch === '>' ||
        ch === '='
      ) {
        //space
        if (cur_name.length > 0) {
          //name done

          var has_equal = false
          if (i < pgel.attributes.length - 1) {
            while (i < pgel.attributes.length && (ch === ' ' || ch === '=')) {
              if (ch === '=') has_equal = true
              i++
              ch = pgel.attributes.charAt(i)
            }
          }

          if (has_equal) {
            var which_quote = '"'

            in_value = true
            if (ch === '"' || ch === "'") {
              in_quote = ch
              which_quote = ch
            } else {
              in_quote = null
            }
            var val = ''
            if (in_quote) {
              i++
              val = attrReadUntil(in_quote) //disable escaping quotes, '\\' + in_quote);
            } else {
              if (i < pgel.attributes.length - 1) {
                //var next_ch;
                do {
                  val += ch
                  i++
                  ch = pgel.attributes.charAt(i)
                  //next_ch = pgel.attributes.length < i + 1 ? pgel.attributes.charAt(i+1) : null;
                } while (
                  i < pgel.attributes.length &&
                  ch !== ' ' &&
                  ch !== '>' &&
                  (ch !== '/' || i + 1 < pgel.attributes.length)
                )
              }
            }
            attrList.push({
              name: cur_name,
              value: val,
              quote: which_quote,
              name_lc: cur_name.toLowerCase(),
            })
          } else {
            i--
            attrList.push({
              name: cur_name,
              value: null,
              name_lc: cur_name.toLowerCase(),
            })
          }
          cur_name = ''
        }
      } else {
        //nonspace
        cur_name += ch //keep the case .toLowerCase();

        var si = pgGetScriptInfo(cur_name)

        if (si) {
          i++
          var r = attrReadUntil(si.close)
          cur_name += r + si.close
          if (r.length) i--
        }
      }
      i++
    }
    if (cur_name.length) {
      attrList.push({
        name: cur_name,
        value: null,
        name_lc: cur_name.toLowerCase(),
      })
    }
    //console.log(attrList);
    return attrList
  }

  const addDirectives = (title, label, directivesList) => {
    //Add another section for VUE directivesList
    const directives_section = {
      framework,
      name: `${title} Directives`,
      fields: {},
    }

    const directivesAttributes = directivesList.map(
      (action) => action.attribute,
    )
    const infoColor =
      pinegrow.getWorkspaceTheme() === 'light' ? '#4396c7' : '#33add6'
    //go through attributes and list all directivesList
    pgel.getAttrList().forEach(function (a) {
      let attrName = a.name

      if (directivesAttributes.includes(attrName)) {
        const field_key = key + '.' + attrName

        directives_section.fields[field_key] = {
          type: 'text',
          name: attrName,
          action: 'custom',
          // attribute: attrName,
          with_clear_icon: function () {
            const $input = this.$input
            if ($input.length) {
              $input.val('').trigger('input')
            } else {
              const api = new PgApi()
              api.removeAttribute(null /* to all sel elements */, attrName)
            }

            if (autoReloadOnUpdate) {
              setTimeout(() => {
                pgel.getPage()?.refresh()
              }, 500)
            } else if (!$input.length) {
              //a quick and dumb way to refresh the prop panel
              pinegrow.selectedElements.reselect()
            }
          },

          // From attribute editor to this prop defn (Into Control)
          get_value: function (pgel, field_key, values, fdef) {
            const activeDirectiveGroup = frameworks.find(
              (fx) => fx.name === activeFramework.name,
            )

            let attrName = fdef.name

            // Look for 'client:load' in pgel
            var attr = findSingleAttr(attrName, pgel)

            if (attr) {
              var value = attr.value
              return value
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
            if (!attr) {
              return
            }

            const content_col = pinegrow.getCollection().getList()
            if (content_col.length > 1) {
              return
            }

            let attrName = attr.name
            pgel.setAttr(attrName, value)

            if (eventType === 'change') {
              const currentAttrList = getAttrList(pgel)
              const currentAttr = currentAttrList.find(
                (curr_attr) => curr_attr.name === attrName,
              )
              if (currentAttr) {
                // const currentAttrValue = currentAttr.value || 'true'
                const currentAttrValue = currentAttr.value
                if (currentAttrValue !== value) {
                  if (autoReloadOnUpdate) {
                    setTimeout(() => {
                      pgel.getPage()?.refresh()
                    }, 500)
                  }
                }
              }
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

            var $inputContainer = $field.find('div.crsa-input')
            var $input = $inputContainer.find('input.crsa-input')
            if (!$input.length) {
              // In case of a select dropdown
              $input = $inputContainer.data('pgAutocomplete')
            }

            fdef.$input = $input

            var $clearIcon = $inputContainer.find('i.icon-close')
            if ($clearIcon.length) {
              $input.css('padding-right', '35px')
              $clearIcon.css('top', '7px')
              $clearIcon.css('right', '20px')
              if (value) {
                $clearIcon.css('display', 'block')
              }
            }

            // Add clear icon
            // if (!$field.data('clear_action')) {
            //   var clear_action = new ClearAction(
            //     field_key,
            //     fdef,
            //     $inputContainer,
            //     $input,
            //     pgel,
            //   )
            //   $field.data('clear_action', clear_action)
            // }

            // Add delete action
            if (!$field.data('delete_action')) {
              var delete_action = new DeleteAction(
                field_key,
                fdef,
                $inputContainer,
                $input,
                pgel,
              )
              $field.data('delete_action', delete_action)
            }
          },
          // on_field_updated: (pgel, $field, fdef, control, field_key, field) => {
          //   // console.log('Field Updated')
          //   // Nudge so that clear-icon shows up
          //   var $inputContainer = $field.find('div.crsa-input')
          //   var $input = $inputContainer.find('input.crsa-input')
          //   if ($input.length) {
          //     $input.trigger('change')
          //   }
          // },
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

          if (
            pgel.tagNameOriginal !== 'template' &&
            (this.attribute === 'x-for' || this.attribute === 'x-if')
          ) {
            const wrapWithTemplate = `<template></template>`
            var pgNew = pgCreateNodeFromHtml(wrapWithTemplate)
            api.setAttribute(pgNew, this.attribute, this.default_value)
            api.wrapWithElement(pgel, pgNew.toStringOriginal())
          } else {
            api.setAttribute(
              null /* to all sel elements */,
              this.attribute,
              this.default_value,
            )
          }

          if (autoReloadOnUpdate) {
            setTimeout(() => {
              pgel.getPage()?.refresh()
            }, 500)
          } else {
            //a quick and dumb way to refresh the prop panel
            pinegrow.selectedElements.reselect()
          }
        }

        const actions = directivesList.map((directive) => ({
          ...directive,
          action: addDirective,
        }))

        const contextMenu = new CrsaContextMenu(actions, $b)
        contextMenu.addSmartInput()
        contextMenu.showForElement($b, null, 4)
      },
    }

    //remove previous directivesList section
    const indexDirectives = sections.findIndex(
      (section) => section.name === `${title} Directives`,
    )
    if (indexDirectives > -1) {
      sections.splice(indexDirectives, 1)
    }

    const indexAttributesEditor = sections.findIndex(
      (section) => section.name === 'Attribute editor',
    )

    if (indexAttributesEditor > -1) {
      sections.splice(indexAttributesEditor, 0, directives_section)
    } else {
      sections.unshift(directives_section)
    }
  }

  frameworks.forEach((fx) => {
    const { directives, lifecycleHooks } = fx.directives
    const directivesList = [...directives, ...lifecycleHooks]
    if (fx.name === activeFramework.name) {
      addDirectives(fx.label, 'Add directive', directivesList)
    }
  })

  // Remove Properties for <button> on top
  $('.pg-show-properties-name').remove()
}

pinegrow.addEventHandler('on_show_properties', onShowProperties)

const removeCloakTag = (page) => {
  try {
    let styleTags = page.activeView
      .getWindow()
      .document.querySelectorAll('style')

    for (let i = 0; i < styleTags.length; i++) {
      const styleTag = styleTags[i]
      if (
        styleTag.textContent.includes('[v-cloak]') ||
        styleTag.textContent.includes('[x-cloak]')
      ) {
        styleTag.remove()
      }
    }
  } catch (err) {
    // console.log(err)
  }
}

pinegrow.addEventHandler('on_page_refreshed', removeCloakTag)
pinegrow.addEventHandler('on_page_loaded', removeCloakTag)
