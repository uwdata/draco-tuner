import { vl2asp } from 'draco-core';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { getType } from 'typesafe-actions';
import { collectionActions, RootAction } from '../../actions';
import { runDraco } from '../../actions/draco-actions';
import { RootState } from '../../reducers';
import { CollectionState, PairItem } from '../../reducers/collection';
import './collection-pane.css';
import PairCard from './pairs/PairCard';

interface StateProps {
  collection: CollectionState;
}

interface DispatchProps {
  updatePairItem: (pairItem: PairItem) => void;
}

interface Props extends StateProps, DispatchProps {}

interface State {
  open: boolean[];
}

class CollectionPane extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const open = props.collection.pairs.map(() => false);
    this.state = {
      open,
    };

    this.expandAll = this.expandAll.bind(this);
    this.collapseAll = this.collapseAll.bind(this);
    this.reload = this.reload.bind(this);
  }

  render() {
    return (
      <div styleName="collection-pane">
        <div styleName="collection">
          <div styleName="controls">
            <button styleName="button" onClick={this.reload}>reload</button>
            <button styleName="button" onClick={this.expandAll}>expand all</button>
            <button styleName="button" onClick={this.collapseAll}>collapse all</button>
          </div>
          {
            this.props.collection.pairs.map((pair, i) => {
              return <PairCard key={i} pair={pair} open={this.state.open[i]}/>;
            })
          }
        </div>
      </div>
    );
  }

  expandAll() {
    const open = this.state.open.map(() => true);
    this.setState({ open });
  }

  collapseAll() {
    const open = this.state.open.map(() => false);
    this.setState({ open });
  }

  reload() {
    this.props.collection.pairs.forEach((pair) => {
      this.props.updatePairItem(pair.left);
      this.props.updatePairItem(pair.right);
    });
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    collection: state.collection,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    updatePairItem: (pairItem: PairItem) => {
      dispatch(
        runDraco(
          vl2asp(pairItem.vlSpec).join('\n'),
          getType(collectionActions.updatePairItem),
          pairItem,
        ),
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollectionPane);
