import * as React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './components/App';
import { rootReducer } from './reducers';

import './index.global.css';

const store = createStore(rootReducer);

// @ts-ignore
window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
