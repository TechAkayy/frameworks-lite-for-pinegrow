//A simple way to display the directives as element actions in the Tree panel. Can be expanded with more useful features, for example showing editable component props in the tree and so on

const f = new PgFramework('pg.tree.painter', 'Tree Painter')
f.default = true
f.show_in_manager = false
f.not_main_types = true
f.has_actions = true

f.getActionTag = function (pgel, for_search, short) {
  var at = ''
  var v_slot_done = false

  pgel.getAttrList().forEach(function (a) {
    if (a.name.startsWith('v-') || a.name.startsWith('x-')) {
      if (a.name === 'v-slot') {
        at += `<span title="Named slot #${a.value}" style="margin-right:6px;">#${a.value}</span>`
        v_slot_done = true
      } else {
        at += `<span title="${a.value}" style="margin-right:6px;">${a.name}</span>`
      }
    }
  })

  if (!v_slot_done && pgel.tagName === 'template') {
    pgel.getAttrList().forEach(function (a) {
      if (a.name.startsWith('#')) {
        at += `<span title="Named slot ${a.name}" style="margin-right:6px;">${a.name}</span>`
      }
    })
  }
  return at.length ? at : null
}

pinegrow.addFramework(f)
