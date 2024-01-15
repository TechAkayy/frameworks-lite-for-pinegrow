import { key, framework, addLibSection } from './helpers.js'
import { frameworks } from './data/index.js'
import { frameworksLiteState } from './shared-state.js'

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
        /*
             if(cur_name === '<?php' || cur_name === '<?=') {
             i++;
             var r = attrReadUntil('?>');
             cur_name +=  r + '?>';
             if(r.length) i--;
             }*/
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
      // TODO: Shortform
      // if (isShortform) {
      //   const activeDirectiveGroup = frameworks.find(
      //     (fx) => fx.name === activeFramework.name,
      //   )
      //   activeDirectiveGroup.directives.propBinders.forEach(
      //     ({ fullform, shortform }) => {
      //       if (attrName.startsWith(fullform)) {
      //         attrName = attrName.replace(fullform, shortform)
      //       }
      //     },
      //   )
      // }

      if (directivesAttributes.includes(attrName)) {
        const field_key = key + '.' + attrName

        directives_section.fields[field_key] = {
          type: 'text',
          name: attrName,
          action: 'custom',
          // attribute: attrName,
          with_clear_icon: function () {
            const api = new PgApi()
            api.removeAttribute(null /* to all sel elements */, attrName)
            if (autoReloadOnUpdate) {
              setTimeout(() => {
                pgel.getPage()?.refresh()
              }, 500)
            } else {
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

            // TODO: Shortform
            // activeDirectiveGroup.directives.propBinders.forEach(
            //   ({ fullform, shortform }) => {
            //     if (attrName.startsWith(fullform)) {
            //       attrName = attrName.replace(fullform, shortform)
            //     }
            //     if (!attr) {
            //       attr = findSingleAttr(attrName, pgel)
            //     }
            //   },
            // )

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
            // if (!attr) {
            //   return
            // }

            // const content_col = pinegrow.getCollection().getList()
            // if (content_col.length > 1) {
            //   return
            // }

            // Remove existing msg if the props panel msg is binded (:msg)
            // if ((!value || value === 'false') && attr) {
            // 	// if control has ':maxHeight' or 'v-bind:maxHeight', and pgel has 'max-height', then remove the unbounded attr from pgel
            // 	pgel.removeAttr(attr.name)
            // 	pinegrow.reselectElement()
            // 	return
            // }

            // if (value === null) {
            //   const api = new PgApi()
            //   const attrName = attr.name
            //   api.removeAttribute(null /* to all sel elements */, attrName)
            //   if (autoReloadOnUpdate) {
            //     setTimeout(() => {
            //       pgel.getPage()?.refresh()
            //     }, 500)
            //   } else {
            //     //a quick and dumb way to refresh the prop panel
            //     pinegrow.selectedElements.reselect()
            //   }
            //   return
            // }

            let attrName = attr.name
            // TODO: Shortform
            // if (isShortform) {
            //   const activeDirectiveGroup = frameworks.find(
            //     (fx) => fx.name === activeFramework.name,
            //   )
            //   activeDirectiveGroup.directives.propBinders.forEach(
            //     ({ fullform, shortform }) => {
            //       if (attrName.startsWith(fullform)) {
            //         attrName = attrName.replace(fullform, shortform)
            //       }
            //     },
            //   )
            // }

            // pgel.setAttr(attrName, value)

            if (value === 'true') {
              pgel.setAttr(attrName, null)
            } else {
              pgel.setAttr(attrName, value)
            }

            if (eventType === 'change') {
              const currentAttrList = getAttrList(pgel)
              const currentAttr = currentAttrList.find(
                (curr_attr) => curr_attr.name === attrName,
              )
              if (currentAttr) {
                const currentAttrValue = currentAttr.value || 'true'
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

    sections.unshift(directives_section)
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
