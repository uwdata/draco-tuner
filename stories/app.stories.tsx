import { storiesOf } from "@storybook/react";
import React from 'react';
import App from '../src/components/App';
import { withReduxDecorator } from "./index.stories";

storiesOf('App', module)
  .addDecorator(withReduxDecorator)
  .add('default', () => <App />)
