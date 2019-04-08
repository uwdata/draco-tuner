import addons from '@storybook/addons';
import withReduxEnhancer from 'addon-redux/enhancer';
import registerRedux from 'addon-redux/register';
import withRedux from 'addon-redux/withRedux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { rootReducer } from '../src/reducers';

registerRedux(addons);
export const store = createStore(rootReducer, withReduxEnhancer);

export const withReduxSettings = {
  Provider,
  store,
}

export const withReduxDecorator = withRedux(addons)(withReduxSettings);
