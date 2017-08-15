export default (html) => {
  return (`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <title>Movie App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body>
        <div id="app">
        ${html}
        <div/>
        <script src="/assets/main.js"></script>
      </body>
    </html>
  `)
}

