import classnames from 'classnames';
import React from 'react';
import { CollectionItemEval, CollectionItemEvalType } from '../../../model';
import { EvalMinimapType } from '../eval-minimap/EvalMinimap';
import './eval-minimap-cell.css';

export interface EvalMinimapCellStoreProps {
  evalType: CollectionItemEvalType;
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
    let color = CollectionItemEval.toColor(this.props.evalType);

    if (this.props.focused) {
      color = CollectionItemEval.BLUE;
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
