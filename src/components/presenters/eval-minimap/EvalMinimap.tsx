import React from 'react';
import { EvalMinimapCellContainer } from '../../containers/index';
import './eval-minimap.css';

export interface EvalMinimapStoreProps {}

export interface EvalMinimapDispatchProps {}

export interface EvalMinimapOwnProps {
  pairIds: string[];
}

export interface EvalMinimapProps extends EvalMinimapStoreProps, EvalMinimapDispatchProps, EvalMinimapOwnProps {}

export interface EvalMinimapState {}

export default class EvalMinimap extends React.PureComponent<EvalMinimapProps, EvalMinimapState> {
  render() {
    const cells = this.props.pairIds.map((id, i) => {
      return <EvalMinimapCellContainer key={i} pairId={id} />;
    });

    return <div styleName="eval-minimap">{cells}</div>;
  }
}
