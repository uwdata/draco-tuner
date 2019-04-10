import { storiesOf } from "@storybook/react";
import React from 'react';
import { PairCollectionContainer } from "../src/components/containers";
import { withReduxDecorator } from "./index.stories";

storiesOf('PairCollection/PairCollection', module)
  .addDecorator(withReduxDecorator)
  .add('default', () => <PairCollectionContainer />)
