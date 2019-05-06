import _ from 'lodash';
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
import { APP_REDUCER_INITIAL_STATE } from './reducers/app-reducer';
import { CHART_COLLECTION_REDUCER_INITIAL_STATE } from './reducers/chart-collection-reducer';
import { CONSTRAINT_INSPECTOR_INITIAL_STATE } from './reducers/constraint-inspector-reducer';
import { CONSTRAINT_TUNER_REDUCER_INITIAL_STATE } from './reducers/constraint-tuner-reducer';
import { DRACO_REDUCER_INITIAL_STATE } from './reducers/draco-reducer';
import { PAIR_COLLECTION_REDUCER_INITIAL_STATE } from './reducers/pair-collection-reducer';
import { TEXT_EDITOR_REDUCER_INITIAL_STATE } from './reducers/text-editor-reducer';

const createStoreWithMiddleware = applyMiddleware(
  reduxWorkerMiddleware(new Worker()),
  reduxThunk
  // @ts-ignore
)(createStore);

const persistedJSON = localStorage.getItem('reduxState');
let persistedState = persistedJSON ? JSON.parse(persistedJSON) : undefined;

if (!_.isUndefined(persistedState) && persistedState.app.__version__ !== VERSION) {
  persistedState = {
    app: {
      ...APP_REDUCER_INITIAL_STATE,
    },
    chartCollection: {
      ...CHART_COLLECTION_REDUCER_INITIAL_STATE,
      charts: persistedState.chartCollection.charts,
    },
    constraintInspector: {
      ...CONSTRAINT_INSPECTOR_INITIAL_STATE,
    },
    constraintTuner: {
      ...CONSTRAINT_TUNER_REDUCER_INITIAL_STATE,
    },
    draco: {
      ...DRACO_REDUCER_INITIAL_STATE,
      constraintMap: persistedState.draco.constraintMap,
    },
    pairCollection: {
      ...PAIR_COLLECTION_REDUCER_INITIAL_STATE,
      pairs: persistedState.pairCollection.pairs,
    },
    textEditor: {
      ...TEXT_EDITOR_REDUCER_INITIAL_STATE,
      asp: persistedState.textEditor.asp,
    },
  };
}

if (persistedState) {
  persistedState.draco.finishedRunIds = new Set<number>();
}

export const store = createStoreWithMiddleware(rootReducer, persistedState);

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
