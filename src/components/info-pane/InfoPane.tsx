import classnames from 'classnames';
import { SolutionSet, Violation } from 'draco-vis';
import * as React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'; // tslint:disable-line
import { Dispatch } from 'redux';
import { RootAction } from '../../actions';
import { setEditorDracoSolutionSet, showInfoPane, switchEditor, updateDracoEditorCode } from '../../actions/editor-actions'; // tslint:disable-line
import { RootState } from '../../reducers';
import VegaLiteChart from '../vega-lite-chart/VegaLiteChart';
import './info-pane.css';

interface StateProps {
  dracoSolution: SolutionSet;
  show: boolean;
  cost?: number;
  violations?: Violation[];
  vlSpec?: any;
  asp?: any;
}

interface DispatchProps {
  showInfoPane: (show: boolean) => void;
  updateDracoEditor: (code: string, sol: SolutionSet) => void;
}

interface Props extends StateProps, DispatchProps {}

class InfoPane extends React.Component<Props, any> {
  constructor(props: Props) {
    super(props);

    this.handleClose = this.handleClose.bind(this);
  }

  render() {
    const styles = classnames({
      'info-pane': true,
      show: this.props.show,
    });

    return (
      <div styleName={styles}>
        <div styleName="buttons">
          <button
            styleName="close"
            onClick={this.handleClose}/>
        </div>
        <div styleName="content">
          <div styleName="column">
            <h4>{`Cost: ${this.props.cost}`}</h4>
            <h4>Violations</h4>
            <ViolationTable violations={this.props.violations} />
            <h4>Draco Spec</h4>
            <pre
              styleName="code draco"
              onClick={() => {
                this.props.updateDracoEditor(this.props.asp, this.props.dracoSolution);
              }}>
              {this.props.asp}
            </pre>
          </div>
          <div styleName="chart-column">
              <div styleName="chart">
                <VegaLiteChart vlSpec={this.props.vlSpec} renderer="svg" actions={false}/>
              </div>
          </div>
        </div>
      </div>
    );
  }

  handleClose() {
    this.props.showInfoPane(false);
  }
}

interface ViolationTableProps {
  violations: Violation[];
}

const VIOLATION_REGEX = /violation\((.+?)\)/;
const NESTED_VIOLATION_REGEX = /(\w+)+/g;

class ViolationTable extends React.Component<ViolationTableProps, any> {
  render() {
    if (!this.props.violations) {
      return null;
    }

    return (
      <table styleName="violation-table">
        <tbody>
        {
          this.props.violations
            .map((row: Violation, i: number) => {
              const match = VIOLATION_REGEX.exec(row.witness);

              console.log(row.witness);
              if (!match) {
                throw Error(`invalid violation ${JSON.stringify(row)}`);
              }

              console.log(match[1]);
              const args = match[1].match(NESTED_VIOLATION_REGEX);
              if (!args) {
                throw Error(`invalid violation ${JSON.stringify(row)}`);
              }

              const constraint = row.constraint;
              const description = row.description;

              const tooltipContents = `<div>${constraint}<br/><br/>${description}</div>`;

              return (
                <tr key={i} styleName="table-row">
                  <td>{row.weight}</td>
                  <td
                    data-tip={tooltipContents}
                    data-html={true}
                    data-place="right"
                    data-effect="solid"
                  >{`${args[0]}(${args[1]})`}</td>
                  <ReactTooltip />
                </tr>
              );
            })
        }
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const infoPaneState = state.editor.infoPane;
  const show = infoPaneState.show;
  const vlSpec = infoPaneState.vlSpec;

  const cost = infoPaneState.dracoSpec ? infoPaneState.dracoSpec.models[0].costs[0] : null;
  const facts = infoPaneState.dracoSpec ? infoPaneState.dracoSpec.models[0].facts : null;
  const violations = infoPaneState.dracoSpec ? infoPaneState.dracoSpec.models[0].violations : null;

  const props: StateProps = {
    cost,
    show,
    vlSpec,
    violations,
    asp: infoPaneState.aspSpec,
    dracoSolution: infoPaneState.dracoSpec,
  };

  return props;
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    showInfoPane: (show: boolean) => {
      dispatch(showInfoPane(show));
    },
    updateDracoEditor: (code: string, sol: SolutionSet) => {
      dispatch(updateDracoEditorCode(code));
      dispatch(setEditorDracoSolutionSet(sol));
      dispatch(switchEditor('draco'));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoPane);
