import classnames from 'classnames';
import _ from 'lodash';
import * as React from 'react';
import { PairFilter, PairFilterType } from '../../../model';
import { EvalMinimapContainer, PairCardContainer } from '../../containers';
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
  setPairFilters: (filterTypes: PairFilterType[]) => void;
  addCheckpoint: () => void;
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
  private prevFilterTypes: PairFilterType[];

  constructor(props: PairCollectionProps) {
    super(props);

    this.state = {
      selectedPairs: new Set(),
    };

    this.toggleSelectedPairs = this.toggleSelectedPairs.bind(this);
    this.prevFilterTypes = [];
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
                const filterTypes = PairFilter.getTypesFromString(val);

                if (!_.isEqual(this.prevFilterTypes, filterTypes)) {
                  this.prevFilterTypes = filterTypes;
                  this.props.setPairFilters(filterTypes);
                }
              }}
            />
          </div>
        </div>
        <div styleName="view">
          <div styleName="minimap">
            <EvalMinimapContainer pairIds={this.props.pairIds} />
          </div>
          <div styleName="pairs">{pairCards}</div>
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
