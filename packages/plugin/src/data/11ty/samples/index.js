import petiteVueSamples from '../../petite-vue/samples/index.js'

const samples = []

const makeItAProgressiveIsland = (label, scripts) => {
  return scripts.map((script) => {
    const _script = {
      ...script,
    }
    if (script.app || script.scope) {
      const prefix = label.replace(' ', '-')
      _script.code = `<script type="module" src="https://unpkg.com/@11ty/is-land@4.0.0/is-land.js" data-pg-name="${prefix}-11ty-App"></script>
<is-land data-pg-name="${prefix}-11ty-Island" on:visible>
    <template data-island>
        ${script.app}
    </template>    
    ${script.scope}
</is-land>`
    }
    return _script
  })
}
petiteVueSamples.forEach(({ name, label, helptext, globalApp, island }) => {
  samples.push({
    // Enclose script tag within template tag
    framework: 'petite-vue',
    name,
    label,
    helptext,
    globalApp: makeItAProgressiveIsland(label, globalApp),
    island: makeItAProgressiveIsland(label, island),
  })
})

export { samples }
export default samples
