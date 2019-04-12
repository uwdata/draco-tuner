import React from 'react';
import { PairEval, PairEvalType } from '../../../model/pair';
import { Splinter } from '../pair-card/index';
import './eval-minimap-cell.css';
import classnames from 'classnames';

export interface EvalMinimapCellStoreProps {
  evalType: PairEvalType;
  focused: boolean;
}

export interface EvalMinimapCellDispatchProps {
  toggleFocusPair: (pairId: string, on: boolean) => void;
}

export interface EvalMinimapCellOwnProps {
  pairId: string;
}

export interface EvalMinimapCellProps
  extends EvalMinimapCellStoreProps,
    EvalMinimapCellDispatchProps,
    EvalMinimapCellOwnProps {}

export interface EvalMinimapCellState {}

export default class EvalMinimap extends React.PureComponent<EvalMinimapCellProps, EvalMinimapCellState> {
  render() {
    let color;
    switch (this.props.evalType) {
      case PairEval.PASS:
        color = Splinter.GREEN;
        break;
      case PairEval.FAIL:
        color = Splinter.RED;
        break;
      case PairEval.UNSAT:
        color = Splinter.GREY;
        break;
      default:
        color = Splinter.WHITE;
        break;
    }

    if (this.props.focused) {
      color = Splinter.BLUE;
    }

    const style = { backgroundColor: color };
    const styleName = classnames({
      'eval-minimap-cell': true,
    });

    return (
      <div
        styleName={styleName}
        style={style}
        onClick={() => {
          this.props.toggleFocusPair(this.props.pairId, !this.props.focused);
        }}
      />
    );
  }
}
