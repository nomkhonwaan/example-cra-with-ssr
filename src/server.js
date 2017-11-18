import 'ignore-styles';
import '../config/env';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './App';
import paths from '../config/paths';

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

const app = express();
const port = process.env.PORT || 8080;
const assets = {
  scripts: [
    {
      src: `${paths.publicUrl}static/js/bundle.js`
    }
  ],
  styles: []
};

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(paths.appBuild));
  
  const manifest = require('../build/asset-manifest.json');

  // Remove default development script
  assets.scripts.pop();

  Object.keys(manifest).reduce((bucket, key) => {
    if (/\.css$/.test(key)) {
      bucket.styles.push({
        href: `${paths.publicUrl}${manifest[key]}`,
        rel: 'stylesheet'
      });
    } else if (/\.js$/.test(key)) {
      bucket.scripts.push({
        src: `${paths.publicUrl}${manifest[key]}`
      });
    }

    return bucket;
  }, assets);
}

app.get('*', async (req, res) => {
  res.send(
    '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />

          <link rel="manifest" href={`${paths.publicUrl}manifest.json`} />
          <link rel="shortcut icon" href={`${paths.publicUrl}favicon.ico`} />

          <title>React App</title>

          {
            assets.styles.map(
              (val, key) =>
                <link key={key} rel={val.rel} href={val.href} />
            )
          }
        </head>
        <body>
          <noscript>
            You need to enable JavaScript to run this app.
          </noscript>
          <div
            id="root"
            dangerouslySetInnerHTML={{
            __html: ReactDOMServer.renderToString(<App />)
            }}
          />

          {
            assets.scripts.map(
              (val, key) => 
                <script key={key} src={val.src} />
            )
          }
        </body>
      </html>
    )
  );
});
  

(async () => {
  try {
    global.webpackIsomorphicTools = 
      await new WebpackIsomorphicTools(require('../config/webpack-isomorphic-tools-configuration')).server(require('path').resolve(__dirname, '..'));

    app.listen(port, () => {
      console.info(`Server has listening on port: ${port}`);
    });
  } catch (err) {
    console.error(err);
  }
})();