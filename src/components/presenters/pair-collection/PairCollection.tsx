import * as React from 'react';
import { PairCardContainer } from '../../containers';
import './pair-collection.css';

export interface PairCollectionStoreProps {
  pairIds: number[];  
}

export interface PairCollectionDispatchProps {
  reloadPairs: () => void;
}

export interface PairCollectionProps
  extends PairCollectionStoreProps, PairCollectionDispatchProps {
}

export interface PairCollectionState {}

export default class PairCollection
  extends React.PureComponent<PairCollectionProps, PairCollectionState> {
  
  render() {
    const pairCards =
      this.props.pairIds
        .map((id, i) => {
          return <PairCardContainer key={i} id={id} open={true} />
        });

    return (
      <div styleName="pair-collection">
        <div styleName="controls">
          <button onClick={this.props.reloadPairs}>reload</button>
        </div>
        <div styleName="view">
          { pairCards }
        </div>
      </div>
    )
  }
}
