import petiteVueFramework from './petite-vue/index.js'
import alpinejsFramework from './alpinejs/index.js'
import standardVueFramework from './standard-vue/index.js'

export const globalAppType = {
  name: 'global-app',
  label: 'Global App',
  headers: [
    `Progressive Enhancement - Sprinkles of interactivity`,
    // `Follows a monolithic architecture that eagerly loads, and where the page is top-down hydrated`
  ],
  footers: [],
}

export const islandAppType = {
  name: 'islands',
  label: 'Islands',
  headers: [
    `Progressive Enhancement - Islands of interactivity`,
    // `Follows an islands architecture where islands COULD BE independently (and progressively) loaded and hydrated (partial hydration)`,
  ],
  footers: [
    `Multiple apps/islands across the page with it's own exclusive scope and mount point`,
  ],
}

export const moduleScriptType = {
  name: 'module-scripts',
  label: 'Module Scripts',
  headers: [`App with Script (module) - Recommended`],
  footers: [],
}

export const classicScriptType = {
  name: 'classic-scripts',
  label: 'Classic Scripts',
  headers: [`App with Script (classic)`],
  footers: [],
}

export const frameworks = [
  {
    ...petiteVueFramework,
    scriptTypes: [moduleScriptType, classicScriptType],
    appTypes: [
      {
        ...globalAppType,
        footers: [
          ...globalAppType.footers,
          `A global app for the entire page that manages regions marked with the v-scope attribute`,
        ],
      },
      islandAppType,
    ],
  },
  {
    ...standardVueFramework,
    scriptTypes: [moduleScriptType, classicScriptType],
    appTypes: [islandAppType],
  },
  {
    ...alpinejsFramework,
    scriptTypes: [classicScriptType],
    appTypes: [
      {
        ...globalAppType,
        footers: [
          ...globalAppType.footers,
          `A global app for the entire page that manages tags that are enriched with Alpinejs directives`,
        ],
      },
    ],
  },
]
