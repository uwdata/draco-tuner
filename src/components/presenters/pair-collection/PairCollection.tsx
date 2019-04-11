import classnames from 'classnames';
import _ from 'lodash';
import * as React from 'react';
import { PairCardContainer } from '../../containers';
import './pair-collection.css';

export interface PairCollectionStoreProps {
  pairIds: string[];
  finishedRunIds: Set<number>;
}

export interface PairCollectionDispatchProps {
  reloadPairs: (runId: number) => void;
  clearFocusPair: () => void;
}

export interface PairCollectionOwnProps {}

export interface PairCollectionProps
  extends PairCollectionStoreProps,
    PairCollectionDispatchProps,
    PairCollectionOwnProps {}

export interface PairCollectionState {
  selectedPairs: Set<string>;
  runId?: number;
}

export default class PairCollection extends React.PureComponent<PairCollectionProps, PairCollectionState> {
  constructor(props: PairCollectionProps) {
    super(props);

    this.state = {
      selectedPairs: new Set(),
    };

    this.toggleSelectedPairs = this.toggleSelectedPairs.bind(this);
  }

  render() {
    const pairCards = this.props.pairIds.map((id, i) => {
      return (
        <PairCardContainer
          key={i}
          id={id}
          open={this.state.selectedPairs.has(id)}
          selectPair={(id: string) => this.toggleSelectedPairs([id])}
        />
      );
    });

    const reloadButtonStyle = classnames({
      reloading: !_.isUndefined(this.state.runId) && !this.props.finishedRunIds.has(this.state.runId),
    });

    return (
      <div styleName="pair-collection">
        <div styleName="controls">
          <div styleName="button-container">
            <button
              styleName={reloadButtonStyle}
              onClick={() => {
                const runId = (window as any).runId;
                (window as any).runId += 1;

                this.setState({
                  runId,
                });
                this.props.reloadPairs(runId);
              }}
            >
              reload
            </button>
          </div>
          <div styleName="button-container">
            <button
              onClick={() => {
                const selectedPairs = this.props.pairIds.reduce((set, id) => {
                  set.add(id);
                  return set;
                }, new Set<string>());

                this.setState({ selectedPairs });
              }}
            >
              expand
            </button>
          </div>
          <div styleName="button-container">
            <button
              onClick={() => {
                const selectedPairs = new Set();
                this.setState({ selectedPairs });
                // this.props.clearFocusPair();
              }}
            >
              collapse
            </button>
          </div>
          <div styleName="button-container">
            <input placeholder="filter" />
          </div>
        </div>
        <div styleName="view">{pairCards}</div>
      </div>
    );
  }

  toggleSelectedPairs(ids: string[]) {
    this.setState((state, props) => {
      const selectedPairs = _.clone(state.selectedPairs);
      ids.forEach(id => {
        if (selectedPairs.has(id)) {
          selectedPairs.delete(id);
        } else {
          selectedPairs.add(id);
        }
      });
      return { selectedPairs };
    });
  }
}
