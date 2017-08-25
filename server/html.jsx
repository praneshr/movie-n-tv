import config from 'config'

export default (html, criticalCSS) => {
  const manifest = __non_webpack_require__('./build/assets/manifest.json')
  const chunkManifest = __non_webpack_require__('./build/assets/chunk-manifest.json')
  const css = config.server.assets.css.map((k) => {
    return `<link rel="preload" href="/assets/${manifest[`${k}.css`]}" as="style" onload="this.rel='stylesheet'"></link>
    <noscript><link rel="stylesheet" href="/assets/${manifest[`${k}.css`]}"></noscript>`
  })
  const js = config.server.assets.js.map((k) => {
    return `<script src="/assets/${manifest[`${k}.js`]}" defer></script>`
  })
  return (`
    <!doctype html>
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#212121" />
        <link rel="manifest" href="/assets/app_manifest.json" />
        <title>Movie App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        <style id="critical-css">${criticalCSS.join('')}</style>
        <link rel="preload" href="https://fonts.googleapis.com/css?family=Nunito:400,700,800,900" as="style" onload="this.rel='stylesheet'" />
        <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito:400,700,800,900" /></noscript>
        <script>
          !function(a){"use strict";var b=function(b,c,d){function e(a){return h.body?a():void setTimeout(function(){e(a)})}function f(){i.addEventListener&&i.removeEventListener("load",f),i.media=d||"all"}var g,h=a.document,i=h.createElement("link");if(c)g=c;else{var j=(h.body||h.getElementsByTagName("head")[0]).childNodes;g=j[j.length-1]}var k=h.styleSheets;i.rel="stylesheet",i.href=b,i.media="only x",e(function(){g.parentNode.insertBefore(i,c?g:g.nextSibling)});var l=function(a){for(var b=i.href,c=k.length;c--;)if(k[c].href===b)return a();setTimeout(function(){l(a)})};return i.addEventListener&&i.addEventListener("load",f),i.onloadcssdefined=l,l(f),i};"undefined"!=typeof exports?exports.loadCSS=b:a.loadCSS=b}("undefined"!=typeof global?global:this);
          !function(a){if(a.loadCSS){var b=loadCSS.relpreload={};if(b.support=function(){try{return a.document.createElement("link").relList.supports("preload")}catch(b){return!1}},b.poly=function(){for(var b=a.document.getElementsByTagName("link"),c=0;c<b.length;c++){var d=b[c];"preload"===d.rel&&"style"===d.getAttribute("as")&&(a.loadCSS(d.href,d,d.getAttribute("media")),d.rel=null)}},!b.support()){b.poly();var c=a.setInterval(b.poly,300);a.addEventListener&&a.addEventListener("load",function(){b.poly(),a.clearInterval(c)}),a.attachEvent&&a.attachEvent("onload",function(){a.clearInterval(c)})}}}(this);
        </script>
        ${css.join('\n')}
      </head>
      <body>
      <div id="app">${html}<div/>
      <script>
        window.webpackManifest=${JSON.stringify(chunkManifest)}
      </script>
      ${js.join('\n')}
      </body>
    </html>
  `)
}

