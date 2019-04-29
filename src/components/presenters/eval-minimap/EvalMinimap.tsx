import React from 'react';
import { ChartEvalMinimapCellContainer, PairEvalMinimapCellContainer } from '../../containers/index';
import './eval-minimap.css';

export interface EvalMinimapStoreProps {
  type: EvalMinimapType;
}

export interface EvalMinimapDispatchProps {}

export interface EvalMinimapOwnProps {
  ids: string[];
}

export interface EvalMinimapProps extends EvalMinimapStoreProps, EvalMinimapDispatchProps, EvalMinimapOwnProps {}

export interface EvalMinimapState {}

export default class EvalMinimap extends React.PureComponent<EvalMinimapProps, EvalMinimapState> {
  static PAIRS: 'pairs' = 'pairs';
  static CHARTS: 'charts' = 'charts';

  render() {
    const cells = this.props.ids.map((id, i) => {
      if (this.props.type === EvalMinimap.PAIRS) {
        return <PairEvalMinimapCellContainer key={i} id={id} type={this.props.type} />;
      }
      return <ChartEvalMinimapCellContainer key={i} id={id} type={this.props.type} />;
    });

    return <div styleName="eval-minimap">{cells}</div>;
  }
}

export type EvalMinimapType = typeof EvalMinimap.PAIRS | typeof EvalMinimap.CHARTS;
