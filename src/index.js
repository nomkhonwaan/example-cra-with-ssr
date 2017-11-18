import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { AppContainer } from 'react-hot-loader';

if (module.hot) {
  module.hot.accept('./App', () => {
    render(require('./App').default);
  });
}

render(App);
registerServiceWorker();

function render(App) {
  ReactDOM.hydrate(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  );
}
