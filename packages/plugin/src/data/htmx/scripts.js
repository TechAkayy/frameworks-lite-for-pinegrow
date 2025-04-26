// const sampleState = `
// <script data-pg-name="Global-HTMX-App">
//   async function searchReddit(query) {
//     const resultsList = document.getElementById('resultsList');
//     if (!query.trim()) {
//       resultsList.innerHTML = '';
//       return;
//     }

//     try {
//       const response = await fetch(\`https://www.reddit.com/search.json?q=\${encodeURIComponent(
//         query,
//       )}\`);
//       const data = await response.json();
//       const posts = data.data.children;

//       resultsList.innerHTML = posts.map(post => \`
//         <li style="margin-top: 1rem;">
//           <a href="\${post.data.url}" target="_blank" data-pg-external-link>\${post.data.title}</a>
//         </li>
//       \`).join('');
//     } catch (error) {
//       console.error('Error fetching Reddit data:', error);
//       resultsList.innerHTML = '<li>Search failed.</li>';
//     }
//   }
// </script>`

// const sampleScope = `<div style="max-width: 560px; margin: 0 auto; padding: 1rem;" data-pg-collapsed>
//     <input id="searchBox" type="search" name="search" placeholder="Type.. eg, cake" oninput="searchReddit(this.value)" style="border: 1px solid #ccc; padding: 0.5rem; width: 100%; box-sizing: border-box;"/>
//     <div id="result" style="padding-top: 1rem; padding-bottom: 1rem;">
//         <ul id="resultsList" style="list-style: none; padding: 0; margin: 0;"></ul>
//     </div>
// </div>
// `

const sampleState = `
<script data-pg-name="Global-HTMX-App">
  htmx.defineExtension('fakeServer', {
     onEvent(name, evt) {
       if (name === 'htmx:beforeRequest' && evt.detail.requestConfig.path.startsWith('/search')) {
         evt.preventDefault();

         const url = new URL(evt.detail.pathInfo.finalRequestPath, window.location.origin);
         const query = url.searchParams.get('search') || '';

         if (!query.trim()) {
           evt.detail.target.innerHTML = '';
           return;
         }

         fetch(\`https://www.reddit.com/search.json?q=\${encodeURIComponent(query)}\`)
           .then(response => response.json())
           .then(data => {
             const posts = data.data.children;
             const html = posts.map(post => \`
               <li style="margin-top: 1rem;">
                 <a href="\${post.data.url}" target="_blank">\${post.data.title}</a>
               </li>
             \`).join('');

             evt.detail.target.innerHTML = html;
           })
           .catch(() => {
             evt.detail.target.innerHTML = '<li>Search failed.</li>';
           });
       }
     }
   });
</script>
`

const sampleScope = `<div
  style="max-width: 560px; margin: 0 auto; padding: 1rem"
  hx-ext="fakeServer"
>
  <input
    id="searchBox"
    type="search"
    name="search"
    placeholder="Type.. eg, cake"
    hx-get="/search"
    hx-trigger="input changed delay:300ms"
    hx-target="#resultsList"
    hx-swap="innerHTML"
    style="
      border: 1px solid #ccc;
      padding: 0.5rem;
      width: 100%;
      box-sizing: border-box;
    "
    hx-params="*"
  />
  <div id="result" style="padding-top: 1rem; padding-bottom: 1rem">
    <ul id="resultsList" style="list-style: none; padding: 0; margin: 0"></ul>
  </div>
</div>
`

const sampleScopesForGlobal = `<div style="padding: 20px; margin: 20px; border-radius: 4px; border-width: 2px; outline: 1px solid #cccccc;">
  <div style="display: flex; margin: 8px; padding: 8px; justify-content: center; align-items: center;">
    <p style="text-align: center; width: 50%; min-width: 400px;">
      Hello, I'm within an <code>htmx</code> region, and I'm using a local script called <code>fakeServer</code> method that fetches remote data from Reddit. This <code>fakeServer</code> method would typically run server-side, but it is included client-side here just for illustrative purposes.
    </p>
  </div>
  ${sampleScope}
</div>`

const scriptClassicGlobal = (withState = false) => {
  return `<script src="https://unpkg.com/htmx.org@2.0.4" data-pg-name="Global-HTMX"></script>${
    withState ? sampleState : ''
  }`
}

// 'head' | 'body' | 'head-prepend' | 'body-prepend'
const cdnScripts = {
  globalApp: {
    scriptClassicWithExample: [
      {
        injectTo: 'body-prepend',
        code: `${sampleScopesForGlobal}`,
      },
      {
        injectTo: 'body',
        code: `${scriptClassicGlobal(true)}`,
      },
    ],

    scriptClassicAutoInit: [
      {
        injectTo: 'head',
        code: `<script defer src="https://unpkg.com/htmx.org@2.0.4" data-pg-name="HTMX"></script>`,
      },
    ],
  },
}

export { cdnScripts }
export default cdnScripts
