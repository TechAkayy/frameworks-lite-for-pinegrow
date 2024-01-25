import { frameworksLiteState } from './shared-state.js'

// Modelled after PgCSSFieldExtension
export class ClearAction {
  constructor(field_name, fdef, $fc, $input, pgel) {
    $input.css('padding-right', '35px')

    var $clear_icon = $(
      '<i class="icon field-icon-infield icon-close" style="color:#2d2d2e;top:7px;right:17px;"></i>',
    ).appendTo($input.parent())

    //called when setting the value into the field
    this.onSetValue = (val) => {
      if (!val) {
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

    $clear_icon.on('click', function (e) {
      $input.val('').trigger('input')
      reloadPageAndReselectElement()

      return false
    })

    $input.on('input change updateclearicon', function () {
      var val = $input.val()
      if (val.length) {
        pg$Show($clear_icon)
      } else {
        pg$Hide($clear_icon)
      }
    })
  }

  destroy() {}
}
