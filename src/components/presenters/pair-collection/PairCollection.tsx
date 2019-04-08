import * as React from 'react';
import { PairCardContainer } from '../../containers';
import './pair-collection.css';

export interface PairCollectionProps {
  pairIds: number[];
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
        { pairCards }
      </div>
    )
  }
}
