import classnames from 'classnames';
import { Constraint } from 'draco-vis';
import _ from 'lodash';
import * as React from 'react';
import './constraint-tuner.css';

export interface ConstraintTunerStoreProps {
  constraints: Constraint[];
  focusLeftViolationCounts?: number[];
  focusRightViolationCounts?: number[];
}

export interface ConstraintTunerDispatchProps {
  updateConstraints: (constraints: Constraint[]) => void;
}

export interface ConstraintTunerOwnProps {}

export interface ConstraintTunerProps
  extends ConstraintTunerStoreProps,
    ConstraintTunerDispatchProps,
    ConstraintTunerOwnProps {}

export interface ConstraintTunerState {
  constraints: Constraint[];
  updateQueued?: number;
}

export default class ConstraintTuner extends React.PureComponent<ConstraintTunerProps, ConstraintTunerState> {
  static DEBOUNCE_DURATION = 100;

  constructor(props: ConstraintTunerProps) {
    super(props);

    this.state = {
      constraints: [],
    };

    this.updateStore = this.updateStore.bind(this);
  }

  static getDerivedStateFromProps(props: ConstraintTunerProps, state: ConstraintTunerState) {
    if (state.updateQueued) {
      return state;
    }

    return {
      ...state,
      constraints: props.constraints,
    };
  }

  updateStore() {
    this.props.updateConstraints(this.state.constraints);
    this.setState({ updateQueued: undefined });
  }

  render() {
    const hasLeftFocus = !_.isUndefined(this.props.focusLeftViolationCounts);
    const hasRightFocus = !_.isUndefined(this.props.focusRightViolationCounts);

    const constraintRows = this.state.constraints.map((constraint, index) => {
      let focused = true;
      if (hasLeftFocus) {
        if (this.props.focusLeftViolationCounts[index] === 0) {
          focused = false;
        }
      }

      if (hasRightFocus) {
        if (this.props.focusRightViolationCounts[index] > 0) {
          focused = true;
        }
      }

      const styleNames = classnames({
        focused: focused && (hasLeftFocus || hasRightFocus),
        unfocused: !focused && (hasLeftFocus || hasRightFocus),
      });

      return (
        <tr key={constraint.name} styleName={styleNames}>
          <td>{constraint.name}</td>
          <td>
            <input
              styleName="cost-input"
              type="number"
              value={constraint.weight}
              onChange={event => {
                const newConstraint: Constraint = {
                  ...constraint,
                  weight: +event.target.value,
                };

                const newConstraints = this.state.constraints.map((c, i) => {
                  return i === index ? newConstraint : c;
                });

                window.clearTimeout(this.state.updateQueued);
                const updateQueued = window.setTimeout(this.updateStore, ConstraintTuner.DEBOUNCE_DURATION);
                this.setState({
                  updateQueued,
                  constraints: newConstraints,
                });
              }}
            />
          </td>
          {hasLeftFocus ? <td>{this.props.focusLeftViolationCounts[index]}</td> : null}
          {hasRightFocus ? <td>{this.props.focusRightViolationCounts[index]}</td> : null}
        </tr>
      );
    });

    return (
      <div styleName="constraint-tuner">
        <table styleName="constraint-table">
          <tr key="header">
            <th>name</th>
            <th>cost</th>
            {hasLeftFocus ? <th>left # violations</th> : null}
            {hasRightFocus ? <th>right # violations</th> : null}
          </tr>
          {constraintRows}
        </table>
      </div>
    );
  }
}