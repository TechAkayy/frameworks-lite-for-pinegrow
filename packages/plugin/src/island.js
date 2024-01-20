import { key, framework, addLibSection } from './helpers.js'

const slot_def_cache = {}

const onShowProperties = (page, sections, pgel, defs, showPropertiesView) => {
  // SLOTS

  // Make sure all current selected elements has the same parent to show the slot section
  let areParentsSameForAllSelectedPgels = true
  const content_col = pinegrow.getCollection().getList()
  if (content_col.length > 1) {
    areParentsSameForAllSelectedPgels = content_col.reduce(
      (acc, selPgel) => pgel.parent === selPgel.parent && acc,
      true,
    )
  }
  const uniqueKey = `island_slots`
  if (!areParentsSameForAllSelectedPgels) {
    const slots_section = {
      framework,
      key: uniqueKey,
      name: `Island Hydration`,
      fields: {
        label: {
          name: `<div style="text-align:center;">Progressive hydration on islands can be applied only on siblings of the same parent.</div>`,
          type: 'displayhtml',
          action: 'custom',
        },
      },
    }

    //remove previous component slots section
    const indexSlots = sections.findIndex(
      (section) => section.key === uniqueKey,
    )
    if (indexSlots > -1) {
      sections.splice(indexSlots, 1)
    }

    sections.unshift(slots_section)
  } else {
    var has_slots = false

    const addSlots = (customComponent, parentIsOwn) => {
      const get_fields = function () {
        customComponent.slots = customComponent.slots || []

        var fields = customComponent.slots.reduce((acc, slot) => {
          const { name: slotName, description, 'doc-url': docUrl } = slot
          let { 'vue-properties': slotProps } = slot

          let isSlotAlreadyUsedUp = false
          let defaultTemplateSlot

          if (slotName === 'default') {
            // Check if there is an existing template data-island
            defaultTemplateSlot = customComponent.pgel.findOne(
              'template[data-island]',
            )
          }

          const slotDefnShortCode = `${slotName}${
            slotProps?.length ? `="{...}"` : ``
            // : `="{ }"`
          }`

          const slotDefnPreviewCode = slotProps?.length
            ? `${camelize(slotName)}Props${
                slotProps?.length
                  ? `="{ ${slotProps
                      .map((slotProp) => slotProp.name)
                      .join(', ')} }"`
                  : ``
                // : `="{ }"`
              }`
            : slotDefnShortCode

          const slotDefnCode = `${slotName}${
            slotProps?.length ? `="${camelize(slotName)}Props"` : ``
            // : `="{ }"`
          }`

          let slotDefnHtml = `Mark as ${slotDefnShortCode}`

          if (slotName === 'default' && !defaultTemplateSlot) {
            slotDefnHtml = `Mark as ${slotDefnShortCode}`
          }

          if (pgel.tagNameOriginal === 'template') {
            const allSlotNamesShortForm = customComponent.slots.map((slot) => ({
              name: slot.name,
              form: `${slot.name}`,
            }))

            const existingAttr = pgel.attrList.find((attr) =>
              allSlotNamesShortForm
                .map((slot) => slot.form)
                .includes(attr.name),
            )

            if (existingAttr) {
              const existingAttrSlot = allSlotNamesShortForm.find(
                (slot) => slot.form === existingAttr.name,
              )
              if (existingAttrSlot.name !== slotName) {
                return acc
              }
            }
          } else if (isSlotAlreadyUsedUp) {
            if (!(slotName === 'default' && !defaultTemplateSlot)) {
              return acc
            }
          }

          let slotCode = `<template ${slotDefnCode}></template>`

          if (customComponent.key === 'island') {
            slotCode = `<is-land ${slotDefnCode}></is-land>`
          }

          let field = {}

          const uniqueKey = `${customComponent.name}_named_slot_${slotName}${
            parentIsOwn ? '_parentIsOwn' : '_parentIsNotOwn'
          }${isSlotAlreadyUsedUp ? '_slotAlreadyUsedUp' : '_slotUnused'}
              ${
                defaultTemplateSlot
                  ? '_defaultTemplateSlot'
                  : '_defaultTemplateSlotNone'
              }`

          if (!slot_def_cache[uniqueKey]) {
            var createSlot = function (
              pgel,
              $button,
              values,
              $fc,
              force_loc,
              isSlotAlreadyUsedUp,
              slotName,
              slotProps,
            ) {
              // Wrap non-template elements into default slot
              if (slotName === 'default' && !defaultTemplateSlot) {
                var pgNew = pgCreateNodeFromHtml(slotCode)
                if (parentIsOwn) {
                  pgel.prepend(pgNew)
                } else {
                  pgel.parent.prepend(pgNew)
                }
                const nonTemplateElements =
                  customComponent.pgel.children.filter(
                    (pgel) => pgel.tagNameOriginal !== 'template',
                  )
                nonTemplateElements.forEach((pgel) => pgNew.append(pgel))
                return
              }

              if (isSlotAlreadyUsedUp) {
                return
              }

              var api = new PgApi()
              var wrap_col = new PgCollection()
              wrap_col.add(pgel)

              var content_col

              // force_loc === 'outside' (wrapping elements into named slot)
              // Are the parents of all the selected elements same?

              if (force_loc === 'outside') {
                let areParentsSameForAllSelectedPgels = true
                content_col = pinegrow.getCollection()
                content_col.forEachElement(function (pgel) {
                  areParentsSameForAllSelectedPgels &&
                    pgel.parent === customComponent.pgel
                })

                if (!areParentsSameForAllSelectedPgels) {
                  pinegrow.showQuickMessage(
                    `Select only direct children of ${customComponent.name} to wrap them into named slot ${slotName}!`,
                    2500,
                    true,
                    true,
                    0,
                  )
                  return
                }
              }

              if (force_loc === 'inside') {
                var pgNew = pgCreateNodeFromHtml(slotCode)
                pgel.prepend(pgNew)
                pinegrow.selectElement(pgNew)
              } else {
                if (content_col.getLength() > 0) {
                  wrapWithElement(content_col, slotCode)
                }
              }
            }

            slot_def_cache[uniqueKey] =
              // isSlotAlreadyUsedUp
              // 	? {
              // 			name: `<div style="text-align:center;">${slotDefnCode}</div>`,
              // 			type: 'displayhtml',
              // 			action: 'custom',
              // 	  }
              // 	:
              {
                type: 'button',
                // add_class: 'pg-dm-colors-buttons',
                name: slotDefnHtml,
                // TODO: Is it possible to conditionally disabled the button?
                // dm_no_lock: isSlotAlreadyUsedUp, // lock button if slot was already used up
                func: function (pgel, $button, values, $fc, event) {
                  event.stopPropagation()
                  createSlot(
                    pgel,
                    $button,
                    values,
                    $fc,
                    parentIsOwn ? 'inside' : 'outside',
                    isSlotAlreadyUsedUp,
                    slotName,
                    slotProps,
                  )
                },
                get helptext() {
                  if (slotName === 'data-island' && !defaultTemplateSlot) {
                    if (isSlotAlreadyUsedUp) {
                      return `Wrap non-template elements as default slot <b>${slotName}</b> for <b>${customComponent.name}</b>.`
                    } else {
                      return `Create empty named slot <b>${slotName}</b> for <b>${customComponent.name}</b>.`
                    }
                  }

                  return isSlotAlreadyUsedUp
                    ? `${slotDefnPreviewCode}`
                    : parentIsOwn
                    ? `Create empty named slot <b>${slotName}</b> for <b>${customComponent.name}</b>.`
                    : `Wrap the selected element(s) as named slot <b>${slotName}</b> for <b>${customComponent.name}</b>.`
                },
              }
          } else {
            //lets just update slotName values in fieldDef so that it is up to date with the current slotName
            const fdef = slot_def_cache[uniqueKey]
            fdef.slotName = slotName
          }
          field[uniqueKey] = slot_def_cache[uniqueKey]

          has_slots = true
          return { ...acc, ...field }
        }, {})
        // console.log(fields);

        const sortObj = (obj) => {
          return Object.keys(obj)
            .sort()
            .reduce(
              (acc, key) => ({
                ...acc,
                [key]: obj[key],
              }),
              {},
            )
        }

        return { ...sortObj(fields) }
      }

      const uniqueKey = `${customComponent.name}_island_slots`

      const slots_section = {
        framework,
        key: uniqueKey,
        name: `Island Hydration`,
        fields: get_fields(), //just call this once,
        // component_definition (below) is not required as we are not using custom control in the field definitions above
        //custom control fields sections require link to the component type definition
        // component_definition: def_slots,
      }

      //remove previous component slots section
      const indexSlots = sections.findIndex(
        (section) => section.key === uniqueKey,
      )
      if (indexSlots > -1) {
        sections.splice(indexSlots, 1)
      }

      has_slots && sections.unshift(slots_section)

      // //add the section
      // if (has_slots) {
      // 	sections.splice(1, 0, slots_section) //after props
      // } else {
      // 	sections.unshift(slots_section)
      // }
      // }
    }

    const customComponent = {
      name: pgel.tagNameOriginal,
      pgel,
      slots: [
        {
          key: 'island',
          name: 'is-land',
          description: 'Mark the island for progressive hydration.',
          'doc-url': '',
          'vue-properties': [],
        },
        {
          key: 'data-island',
          name: 'data-island',
          description: 'Mark as data-island.',
          'doc-url': '',
          'vue-properties': [],
        },
      ],
    }

    addSlots(customComponent, false)
  }
}

function wrapWithElement(
  collection_or_el,
  code,
  check,
  on_wrapped,
  skip_select,
) {
  var collection = pinegrow.getCollection(collection_or_el).clone()

  var inserted = new PgCollection()

  var pgNew = pgCreateNodeFromHtml(code)

  collection.forEachElement(function (pgCurrent, i, total) {
    var problems = new pgParserSourceProblem(pgCurrent)

    if (!pgCurrent) {
      problems.add('element', pgCurrent, 'wrap with element')
    }
    if (!problems.ok()) {
      showAlert(problems.toString(), "Can't create the element")
      return
    }

    if (!canMakeChange(pgCurrent.parent, 'insert_element')) return

    var error = check ? check(pgCurrent) : false

    if (error) {
      pinegrow.showQuickMessage(error, 4000, false, 'error')
      return
    }

    if (!pgNew.parent) {
      pgNew.insertBefore(pgCurrent)
    }

    pgNew.append(pgCurrent)

    on_wrapped && on_wrapped(pgNew, pgCurrent)

    if (!skip_select) {
      pinegrow.selectedElements.replace(pgCurrent, pgNew)
    }

    inserted.add(pgNew)

    if (i == total - 1) {
      pinegrow.changeManager.didInsert(inserted)
      // pgNew.waitFor$DOMElementToAppear(function () {
      pinegrow.selectedElements.reselect()
      // })
    }
  })
  pinegrow.selectElement(pgNew)
}

pinegrow.addEventHandler('on_show_properties', onShowProperties)
