import classnames from 'classnames';
import _ from 'lodash';
import * as React from 'react';
import { CollectionItemFilter, CollectionItemFilterObject } from '../../../model';
import { PairCardContainer, PairEvalMinimapContainer } from '../../containers';
import './pair-collection.css';

export interface PairCollectionStoreProps {
  pairIds: string[];
  finishedRunIds: Set<number>;
  pairEvalDeltaScore?: number;
  score: number;
}

export interface PairCollectionDispatchProps {
  reloadPairs: (runId: number) => void;
  clearFocusPair: () => void;
  setPairFilters: (filterTypes: CollectionItemFilterObject[]) => void;
  addCheckpoint: () => void;
  addEmptyPair: () => void;
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
  private prevFilters: CollectionItemFilterObject[];
  private paneRef: React.RefObject<HTMLDivElement>;

  constructor(props: PairCollectionProps) {
    super(props);

    this.state = {
      selectedPairs: new Set(),
    };

    this.paneRef = React.createRef();

    this.toggleSelectedPairs = this.toggleSelectedPairs.bind(this);
    this.prevFilters = [];
  }

  render() {
    const pairCards = this.props.pairIds.map((id, i) => {
      return (
        <PairCardContainer
          key={i}
          id={id}
          open={this.state.selectedPairs.has(id)}
          selectPair={(id: string, on: boolean) => this.toggleSelectedPairs([id], on)}
        />
      );
    });

    const reloadButtonStyle = classnames({
      reloading: !_.isUndefined(this.state.runId) && !this.props.finishedRunIds.has(this.state.runId),
    });

    let deltaStringSign = '';
    if (this.props.pairEvalDeltaScore > 0) {
      deltaStringSign = '+';
    }
    const deltaString =
      deltaStringSign + (_.isUndefined(this.props.pairEvalDeltaScore) ? '' : this.props.pairEvalDeltaScore.toString());
    const checkpointStyleNames = classnames({
      'icon-button': true,
      green: this.props.pairEvalDeltaScore > 0,
      red: this.props.pairEvalDeltaScore < 0,
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
              <span className="material-icons">refresh</span>
              {`${this.props.score} / ${this.props.pairIds.length}`}
            </button>
          </div>
          <div styleName="button-container">
            <button
              styleName={checkpointStyleNames}
              onClick={() => {
                this.props.addCheckpoint();
              }}
            >
              <span className="material-icons">flag</span>
              {deltaString}
            </button>
          </div>
          <div styleName="button-container">
            <button
              styleName="icon-button"
              onClick={() => {
                this.props.addEmptyPair();
                this.paneRef.current.scrollTop = this.paneRef.current.scrollHeight;
              }}
            >
              <span className="material-icons">add</span>
            </button>
          </div>
          <div styleName="button-container">
            <button
              className="material-icons"
              styleName="icon-button"
              onClick={() => {
                const selectedPairs = this.props.pairIds.reduce((set, id) => {
                  set.add(id);
                  return set;
                }, new Set<string>());

                this.setState({ selectedPairs });
              }}
            >
              unfold_more
            </button>
            <button
              className="material-icons"
              styleName="icon-button"
              onClick={() => {
                const selectedPairs = new Set();
                this.setState({ selectedPairs });
                // this.props.clearFocusPair();
              }}
            >
              unfold_less
            </button>
          </div>
          <div styleName="button-container">
            <input
              placeholder="filter"
              onChange={event => {
                const val = event.target.value;
                const filters = CollectionItemFilter.getObjectsFromString(val);

                if (!_.isEqual(this.prevFilters, filters)) {
                  this.prevFilters = filters;
                  this.props.setPairFilters(filters);
                }
              }}
            />
          </div>
        </div>
        <div styleName="view">
          <div styleName="minimap">
            <PairEvalMinimapContainer ids={this.props.pairIds} />
          </div>
          <div styleName="pairs" ref={this.paneRef}>
            {pairCards}
          </div>
        </div>
      </div>
    );
  }

  toggleSelectedPairs(ids: string[], on: boolean) {
    this.setState((state, props) => {
      const selectedPairs = _.clone(state.selectedPairs);
      ids.forEach(id => {
        if (on) {
          selectedPairs.add(id);
        } else {
          selectedPairs.delete(id);
        }
      });
      return { selectedPairs };
    });
  }
}
