import _ from 'lodash';
import * as React from 'react';
import { PairCardContainer } from '../../containers';
import './pair-collection.css';

export interface PairCollectionStoreProps {
  pairIds: string[];
}

export interface PairCollectionDispatchProps {
  reloadPairs: () => void;
  clearFocusPair: () => void;
}

export interface PairCollectionOwnProps {}

export interface PairCollectionProps
  extends PairCollectionStoreProps,
    PairCollectionDispatchProps,
    PairCollectionOwnProps {}

export interface PairCollectionState {
  selectedPairs: Set<string>;
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

    return (
      <div styleName="pair-collection">
        <div styleName="controls">
          <button onClick={this.props.reloadPairs}>reload</button>
          <button
            onClick={() => {
              const selectedPairs = this.props.pairIds.reduce((set, id) => {
                set.add(id);
                return set;
              }, new Set<string>());

              this.setState({ selectedPairs });
            }}
          >
            expand all
          </button>
          <button
            onClick={() => {
              const selectedPairs = new Set();
              this.setState({ selectedPairs });
              this.props.clearFocusPair();
            }}
          >
            collapse all
          </button>
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
