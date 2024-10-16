// 'head' | 'body' | 'head-prepend' | 'body-prepend'
const cdnScripts = {
  globalApp: {
    scriptModuleNoExample: [
      {
        injectTo: 'body-prepend',
        // ESM via cdn is available (https://github.com/11ty/is-land/issues/22), so no need to package, updated webpack config, scripts.js & index.js for src/island folder and menu.js modules
        // code: `<script type="module" src="/@11ty/is-land/is-land.js" data-pg-name="__SLOT1__11ty-App"></script>`,
        code: `<script type="module" src="https://unpkg.com/@11ty/is-land@4.0.0/is-land.js" data-pg-name="__SLOT1__11ty-App"></script>`,
      },
    ],
  },
  pikadayIntegrationIsland: {
    injectTo: 'body',
    code: `<is-land data-pg-name="__SLOT1__11ty-Island" on:visible>
  <template data-island>
    <link
      rel="stylesheet"
      type="text/css"
      href="https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css"
    />
    <script src="https://cdn.jsdelivr.net/npm/pikaday/pikaday.js"></script>
    <style id="pika-dark-styles">
      /**
      * This theme is an example to show how you can create your own.
      * Can also be imported from cdn - https://cdn.jsdelivr.net/npm/pikaday/css/pikaday.css
      */
      .pika-single.dark-theme {
        color: #fff;
        background: #333;
        border: 1px solid #666;
        border-bottom-color: #999;
      }

      .dark-theme .pika-label {
        background-color: #333;
      }

      .dark-theme .pika-prev,
      .dark-theme .is-rtl .pika-next {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAQAAACGG/bgAAAAQ0lEQVR4Ae3KIQ4AIBTD0N0/IeHGI3UIRA3ut/Zl+ltXc5++htVAmIAwAWECwgSEKbgthEoIlRAqIVRCqINQB9nDgQd7ktwFo6UpWQAAAABJRU5ErkJggg==');
      }

      .dark-theme .pika-next,
      .dark-theme .is-rtl .pika-prev {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAeCAQAAACGG/bgAAAAP0lEQVQ4y+3TMQoAMAgEwfwfAvvjTZ1uGzuvHhBPPGczEG+FRqqRaqQaqUaqkX6QBmmjacvQ6qEVTjsh+xizebvlaWptGXZAAAAAAElFTkSuQmCC');
      }

      .dark-theme .pika-table th {
        color: #999;
      }

      .dark-theme .pika-button {
        color: #fff;
        background: #222;
      }

      .dark-theme .pika-week {
        color: #999;
      }

      .dark-theme .is-today .pika-button {
        color: #33aaff;
      }

      .dark-theme .is-selected .pika-button {
        color: #fff;
        background: #33aaff;
        box-shadow: inset 0 1px 3px #178fe5;
      }

      .dark-theme .is-disabled .pika-button {
        color: #999;
        opacity: 0.3;
      }

      .dark-theme .pika-button:hover {
        color: #fff !important;
        background: #ff8000 !important;
      }
    </style>
    <style id="appointment-form-styles">
      .p-4 {
        padding: 1rem /* 16px */;
      }
      .flex {
        display: flex;
      }
      .items-center {
        align-items: center;
      }
      .justify-center {
        justify-content: center;
      }
      .p-1 {
        padding: 0.25rem;
      }
      .appearance-none {
        appearance: none;
      }
      .border {
        border-width: 1px;
      }
      .py-2 {
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      }
      .rounded-full {
        border-radius: 9999px;
      }
      .text-gray-600 {
        color: rgb(75 85 99);
      }
      .w-full {
        width: 100%;
      }
      .bg-primary-600 {
        background-color: rgb(79 70 229);
      }
      .hover:bg-primary-700:hover {
        background-color: rgb(67 56 202);
      }
      .inline-block {
        display: inline-block;
      }
      .px-6 {
        padding-left: 1.5rem;
        padding-right: 1.5rem;
      }
      .text-center {
        text-align: center;
      }
      .text-white {
        color: rgb(255 255 255);
      }
    </style>
    __SLOT2__
  </template>
  __SLOT3__
</is-land>`,
  },
}

export { cdnScripts }
export default cdnScripts
