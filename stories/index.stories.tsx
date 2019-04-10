import addons from '@storybook/addons';
import withReduxEnhancer from 'addon-redux/enhancer';
import registerRedux from 'addon-redux/register';
import withRedux from 'addon-redux/withRedux';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import reduxWorkerMiddleware from 'redux-worker-middleware';
// @ts-ignore
import Worker from 'worker-loader!../src/worker/Worker';
import '../src/index.global.css';
import { rootReducer } from '../src/reducers';
registerRedux(addons);

const createStoreWithEnhancer = (reducer) => createStore(reducer, withReduxEnhancer);
const createStoreWithMiddleware = applyMiddleware(
  reduxWorkerMiddleware(new Worker()),
  reduxThunk,
// @ts-ignore
)(createStoreWithEnhancer);

export const store = createStoreWithMiddleware(rootReducer);

export const withReduxSettings = {
  Provider,
  store,
}

export const withReduxDecorator = withRedux(addons)(withReduxSettings);

(window as any).runId = 0;
