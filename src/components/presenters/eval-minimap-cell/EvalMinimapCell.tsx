import classnames from 'classnames';
import React from 'react';
import { CollectionItemEval } from '../../../model';
import { EvalMinimapType } from '../eval-minimap/EvalMinimap';
import { Splinter } from '../pair-card/index';
import './eval-minimap-cell.css';

export interface EvalMinimapCellStoreProps {
  evalType: CollectionItemEval;
  focused: boolean;
  important: boolean;
}

export interface EvalMinimapCellDispatchProps {
  toggleFocusPair: (id: string, on: boolean) => void;
}

export interface EvalMinimapCellOwnProps {
  id: string;
  type: EvalMinimapType;
}

export interface EvalMinimapCellProps
  extends EvalMinimapCellStoreProps,
    EvalMinimapCellDispatchProps,
    EvalMinimapCellOwnProps {}

export interface EvalMinimapCellState {}

export default class EvalMinimapCell extends React.PureComponent<EvalMinimapCellProps, EvalMinimapCellState> {
  render() {
    let color;
    switch (this.props.evalType) {
      case CollectionItemEval.PASS:
        color = Splinter.GREEN;
        break;
      case CollectionItemEval.FAIL:
        color = Splinter.RED;
        break;
      case CollectionItemEval.UNSAT:
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
      important: this.props.important,
    });

    return (
      <div
        styleName={styleName}
        style={style}
        onClick={() => {
          this.props.toggleFocusPair(this.props.id, !this.props.focused);
        }}
      />
    );
  }
}
