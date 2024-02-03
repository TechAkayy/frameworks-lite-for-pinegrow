import { frameworksLiteState } from './shared-state.js'

// Modelled after PgCSSFieldExtension
export class DeleteAction {
  constructor(field_name, fdef, $fc, $input, pgel) {
    this.fdef = fdef
    this.$container = $fc
    this.pgel = pgel

    var _this = this
    this.$container.on('contextmenu', function (e) {
      e.preventDefault()
      _this.showMenu()
      return false
    })

    this.$element = $(
      pgE('div', {
        class: 'pg-css-field-pill',
      }),
    )

    this.$element.css('display', 'flex')
    this.$element.css('align-items', 'center')
    this.$element.css('justify-content', 'center')
    this.$element.css('z-index', '1')

    // updatePill
    var el = this.$element.get(0)
    el.innerHTML = `<i class="icon icon-down" style="top:0px;"></i>`

    this.$container.get(0).appendChild(this.$element.get(0))

    $fc.addClass('pg-field-with-css-ext')
    $fc.closest('.crsa-field').addClass('pg-field-with-css-ext-on-crsa-field')

    this.$element.on('click', function (e) {
      e.preventDefault()
      _this.showMenu()
      return false
    })
  }

  destroy() {}

  showMenu() {
    this.actions = []

    const reloadPageAndReselectElement = () => {
      if (frameworksLiteState.autoReloadOnUpdate) {
        setTimeout(() => {
          this.pgel.getPage()?.refresh()
        }, 500)
      } else {
        //a quick and dumb way to refresh the prop panel
        pinegrow.selectedElements.reselect()
      }
    }

    var _this = this
    _this.actions.push({
      label: 'remove',
      action: function () {
        let attrName = _this.fdef.name

        const api = new PgApi()
        api.removeAttribute(null /* to all sel elements */, attrName)
        reloadPageAndReselectElement()

        return false
      },
    })

    const menu = new CrsaContextMenu(
      this.actions,
      this.$element || this.$container,
    )
    menu.showForElement(this.$element || this.$container)
  }
}
