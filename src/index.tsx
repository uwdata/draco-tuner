import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxWorkerMiddleware from 'redux-worker-middleware';
import Worker from 'worker-loader!./worker/Worker'; // tslint:disable-line
import App from './components/App';
import './index.global.css';
import { rootReducer } from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  reduxWorkerMiddleware(new Worker()),
  reduxThunk,
)(createStore);

export const store = createStoreWithMiddleware(
  rootReducer,
);

// @ts-ignore
window.store = store;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement,
);
