# Pinegrow External Build Process with Vite - A Community Template

This vite-powered external build process outputs both `tailwind.css` and `tailwind_for_wp_editor.css`, allowing the latter to be used in WordPress blocks.

While the `tailwind.css` build includes Tailwind preflight, `tailwind_for_wp_editor.css` omits the preflight styles since they do not integrate well with WordPress blocks.

A custom Vite plugin, `vite-plugin-pg.js`, serves this purpose and utilizes environment variables (`LIB` and `WP`) passed from the package.json script commands (`watch` and `watch-wp`). The `WP` environment variable is also employed in `tailwind.config.js` to conditionally enable or disable Tailwind preflight.

The external build process is node-based, so it only works with the Pinegrow Desktop app. It provides users the advantage of customizing the Tailwind config to any extent, using Tailwind plugins, and employing @apply directives, among other features.

Note that this external build workflow is useful when the primary method of Tailwind styling is through the Pinegrow Desktop app rather than the Pinegrow WP Plugin. Once the external build is selected, reverting to the internal compiler will fallback to using basic Tailwind directives, so it is not recommended.

## Usage

### Start the builds in watch mode

```bash
npm run dev # chains multiple watch commands
```

### Preview

```bash
npm run now # build & preview
```

### Build (for non-wordpress sites)

```bash
npm run build
```
