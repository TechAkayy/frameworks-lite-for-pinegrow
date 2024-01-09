import { reactive } from 'vue'
import { $menu } from './menu.js'
import { pluginUrl } from './helpers.js'

// VERY IMPORTANT - tutorialPanelState is used reactively by the Tutorial app, so any changes to this object has to be retrofitted in that project
export let tutorialPanelState = reactive({
  // state
  theme: 'dark',
  activeFramework: { name: 'petite-vue', label: 'Petite vue' },
  isShortform: false,
  autoReloadOnUpdate: false,

  openMenu: function () {
    $menu.trigger('click')
  },

  copyToClipboard: function (content) {
    copyCodeToClipboard(content)
  },

  // state used to trigger actions in Pinegrow
  openUrl: function (url) {
    const isValidUrl = (urlString) => {
      try {
        return Boolean(new URL(urlString))
      } catch (err) {
        console.log(err)
        return false
      }
    }
    if (isValidUrl(url)) {
      pinegrow.openExternalUrl(url)
    }
  },
})

export class TutorialPanel {
  openPanel = () => {
    if (this.tutorialPanelPgQuickWindow?.win) {
      if (this.tutorialPanelPgQuickWindow.win.visible) {
        this.tutorialPanelPgQuickWindow.win.hide()
      } else {
        this.tutorialPanelPgQuickWindow.win.show()
      }
    } else {
      this.tutorialPanelPgQuickWindow = new TutorialPanelPgQuickWindow()
    }
  }
}

export class TutorialPanelPgQuickWindow {
  constructor($target) {
    var _this = this

    var uiComponent = new TutorialPanelUiComponent()

    var pw = window.outerWidth
    var ph = window.outerHeight

    var ew = (pw - 1024) / 2
    var eh = (ph - 700) / 2

    var win = new PgQuickWindow(
      `Frameworks Lite Plugin - Quick Start` /* title */,
      uiComponent,
      'TutorialPanelPgQuickWindow' /* key */,
      1024, // width
      700, // height
      false, // pinned, Focused when opening project? Yes, so that user can escape and close it immediately
      true, // floatable - can move this outside into a separate window across multiple monitors, default false
      false, // static_win (true - can't move around), default false
    )
    this.win = win
    this.uiComponent = uiComponent

    tutorialPanelState.closeDialog = () => {
      if (this.win?.visible) {
        this.win.hide()
      }
    }

    this.win.$element.css('transform', 'scale(0.95)')
    // this.win.noRightEdge()
    this.win.hideOnClose = true

    $target = $target || $('body')

    if ($target) {
      this.win.showFor$El(
        $target,
        true /* previous_position */,
        40 /* distance */,
        'down_top_left' /* top (side) */,
      ) // 'top', 'down', 'cover_right', 'cover_left', 'cover_bottom', 'down_top_left', 'down_no_resize'
      // this.win.autoSize()
      PgPositionElement(this.win.$element, 'center', 'center')
    }

    //uiComponent.onShown();

    // uiComponent.show()

    this.win.onDestroy = function () {
      uiComponent.destroy()
    }

    this.win.onHide = function () {
      // Do not destory on hide
      // _this.win.destroy()
    }

    this.win.$element.find('.pg-close').off('click')
    this.win.$element.find('.pg-close').on('click', function (e) {
      e.preventDefault()
      if (_this.win.hideOnClose) {
        _this.win.hide()
      } else {
        _this.win.destroy()
      }
    })
  }

  show = ($target) => {
    this.win.show(true)
    if ($target) {
      this.win.showFor$El($target)
    }
    pgQuickWindowManager.focus(this.win)
  }
}

export class TutorialPanelUiComponent {
  constructor(view) {
    this.view = view //pgUIView
    this.disposers = []

    var $element, $container
    if (this.view) {
      tutorialPanelState.closeDialog = () => {
        this.$modal.find('.modal-header > button').trigger('click')
      }

      $element = this.view.get$Element()
      $container = $('<div class="pg-tutorial-container"></div>').appendTo(
        $element,
      )
    } else {
      // // Below is used when loading tutorial in a pgQuickWindow
      $element = $('<div class="pg-tutorial"></div>')
      $element.css('width', '100%')
      $element.css('height', '100%')

      this.view = new PgUIView($element)
      this.view.onResize = function () {}
      this.view.onDestroy = function () {}
      $container = $('<div class="pg-tutorial-container"></div>').appendTo(
        $element,
      )
    }

    $container.css('width', '100%')
    $container.css('height', '100%')

    let $tutorialPanelContainer = $(
      `<iframe id='tutorial-container' nwdisable nwfaketop src="about:blank" class="full"sandbox="allow-top-navigation allow-scripts allow-forms allow-same-origin"  style="width:inherit; height:inherit; border:0px; padding-bottom:10px"> </iframe>`,
    )

    var url = path.dirname(pluginUrl)

    $tutorialPanelContainer.attr('src', `${url}/tutorial/index.html`)

    this.$tutorialPanelContainer = $tutorialPanelContainer
    // crsaHandleExternalLinks($tutorialPanelContainer)
    $container.append($tutorialPanelContainer)

    var _this = this

    this.tutorialPanelLoaded = false

    const loadTutorialPanel = () => {
      var timesRun = 0
      var loopRun = setInterval(() => {
        if (timesRun < 40) {
          initTutorialPanelContainerWindow()
        } else {
          clearInterval(loopRun)
        }

        timesRun += 1
      }, 10)

      var initTutorialPanelContainerWindow = () => {
        const tutorialPanelContainerWindow =
          _this.$tutorialPanelContainer.get(0).contentWindow
        // if (tutorialPanelContainerWindow && tutorialPanelContainerWindow.componentStore) {
        // 	console.log(tutorialPanelContainerWindow.componentStore)
        //   console.log(tutorialPanelContainerWindow.selectedComponentStore)
        // }
        if (tutorialPanelContainerWindow?.tutorialPanelState) {
          clearInterval(loopRun)
          // console.log(timesRun)
          const theme = pinegrow.getWorkspaceTheme()
          tutorialPanelContainerWindow.tutorialPanelState.theme =
            theme === 'gray' ? 'dark' : theme
          tutorialPanelContainerWindow.tutorialPanelState.activeFramework =
            tutorialPanelState.activeFramework
          tutorialPanelContainerWindow.tutorialPanelState.autoReloadOnUpdate =
            tutorialPanelState.autoReloadOnUpdate

          tutorialPanelContainerWindow.tutorialPanelState.openMenu =
            tutorialPanelState.openMenu

          tutorialPanelContainerWindow.tutorialPanelState.copyToClipboard =
            tutorialPanelState.copyToClipboard

          tutorialPanelContainerWindow.tutorialPanelState.openUrl =
            tutorialPanelState.openUrl

          tutorialPanelContainerWindow.tutorialPanelState.closeDialog =
            tutorialPanelState.closeDialog

          tutorialPanelState = tutorialPanelContainerWindow.tutorialPanelState
          // _this.tutorialPanelLoaded = true
          _this.init()
        }
      }
      initTutorialPanelContainerWindow()
    }

    $tutorialPanelContainer.on('load', function () {
      loadTutorialPanel()

      // if (!_this.tutorialPanelLoaded) {
      //   loadTutorialPanel()
      //   _this.tutorialPanelLoaded = false
      // } else {
      //   _this.tutorialPanelLoaded = false
      // }
    })

    // $tutorialPanelContainer.ready(function () {
    //   loadTutorialPanel()
    // })

    this.destroy = () => {}
  }

  init = () => {
    window.tutorialPanelState = tutorialPanelState

    const onSetWorkspaceTheme = (theme) => {
      const newTheme = theme === 'gray' ? 'dark' : theme
      const oldTheme = tutorialPanelState.theme

      if (newTheme !== oldTheme) {
        tutorialPanelState.theme = newTheme
      }
    }

    pinegrow.addEventHandler('on_set_workspace_theme', onSetWorkspaceTheme)
  }
}
