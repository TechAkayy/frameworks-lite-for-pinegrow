import { frameworksLiteState } from './shared-state.js'

// Modelled after PgCSSFieldExtension
export class ClearDeleteActions {
  constructor(field_name, fdef, $fc, $input, pgel) {
    $input.css('padding-right', '50px')

    var $delete_icon = $(
      '<i class="icon field-icon-infield icon-bin" style="color:#2d2d2e;top:5px;font-size:small;cursor:pointer;"></i>',
    ).appendTo($input.parent())

    var $clear_icon = $(
      '<i class="icon field-icon-infield icon-close" style="color:#2d2d2e;top:7px;right:30px;"></i>',
    ).appendTo($input.parent())

    //called when setting the value into the field
    this.onSetValue = (val) => {
      if (!val) {
        pg$Hide($delete_icon)
        pg$Hide($clear_icon)
      }
      return val
    }

    const reloadPageAndReselectElement = () => {
      if (frameworksLiteState.autoReloadOnUpdate) {
        setTimeout(() => {
          pgel.getPage()?.refresh()
        }, 500)
      } else {
        //a quick and dumb way to refresh the prop panel
        pinegrow.selectedElements.reselect()
      }
    }

    $delete_icon.on('click', function (e) {
      e.preventDefault()
      let attrName = fdef.name

      const api = new PgApi()
      api.removeAttribute(null /* to all sel elements */, attrName)
      reloadPageAndReselectElement()

      return false
    })

    $clear_icon.on('click', function (e) {
      $input.val('').trigger('input')
      reloadPageAndReselectElement()

      return false
    })

    $input.on('input change updateclearicon', function () {
      var val = $input.val()
      if (val.length) {
        pg$Show($delete_icon)
        pg$Show($clear_icon)
      } else {
        pg$Hide($delete_icon)
        pg$Hide($clear_icon)
      }
    })
  }

  destroy() {}
}
