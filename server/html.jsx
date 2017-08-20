import config from 'config'

export default (html) => {
  const manifest = __non_webpack_require__('./build/assets/manifest.json')
  const chunkManifest = __non_webpack_require__('./build/assets/chunk-manifest.json')
  const css = config.server.assets.css.map((k) => {
    return `<link rel="stylesheet" href="/assets/${manifest[`${k}.css`]}"></link>`
  })
  const js = config.server.assets.js.map((k) => {
    return `<script src="/assets/${manifest[`${k}.js`]}"></script>`
  })
  return (`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Movie App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        ${css.join('\n')}
      </head>
      <body>
        <div id="app">
        ${html}
        <div/>
        <script>
          window.webpackManifest=${JSON.stringify(chunkManifest)}
        </script>
        ${js.join('\n')}
      </body>
    </html>
  `)
}

