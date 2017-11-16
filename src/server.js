import 'ignore-styles';
import '../config/env';

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './App';

const WebpackIsomorphicTools = require('webpack-isomorphic-tools');

const app = express();
const port = process.env.PORT || 8080;

app.get('*', async (req, res, next) => {
  res.send(
    '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
          <meta name="theme-color" content="#000000" />

          <link rel="manifest" href="http://localhost:3000/manifest.json" />
          <link rel="shortcut icon" href="http://localhost:3000/favicon.ico" />

          <title>React App</title>
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

          <script src="http://localhost:3000/static/js/bundle.js" />
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