import * as React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxWorkerMiddleware from 'redux-worker-middleware';
import Worker from 'worker-loader!./worker/Worker'; // tslint:disable-line
import '../src/index.global.css';
import App from './components/App';
import './index.global.css';
import { rootReducer } from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  reduxWorkerMiddleware(new Worker()),
  reduxThunk
  // @ts-ignore
)(createStore);

const persistedJSON = localStorage.getItem('reduxState');
const persistedState = persistedJSON ? JSON.parse(persistedJSON) : undefined;
if (persistedState) {
  persistedState.draco.finishedRunIds = new Set<number>();
}

export const store = createStoreWithMiddleware(rootReducer, persistedState);

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

export const withReduxSettings = {
  Provider,
  store,
};

// @ts-ignore
window.store = store;
(window as any).runId = 0;

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root') as HTMLElement
);
