import { storiesOf } from "@storybook/react";
import React from 'react';
import { ConstraintTunerContainer } from "../src/components/containers";
import { withReduxDecorator } from "./index.stories";

storiesOf('ConstraintTuner', module)
  .addDecorator(withReduxDecorator)
  .add('default', () => <ConstraintTunerContainer />)
