import classnames from 'classnames';
import { SolutionSet, Violation } from 'draco-vis';
import * as React from 'react';
import { connect } from 'react-redux';
import ReactTooltip from 'react-tooltip'; // tslint:disable-line
import { Dispatch } from 'redux';
import { Option } from 'ts-option';
import { RootAction } from '../../actions';
import { setEditorDracoSolutionSet, showInfoPane, switchEditor, updateDracoEditorCode } from '../../actions/editor-actions'; // tslint:disable-line
import { RootState } from '../../reducers';
import VegaLiteChart from '../vega-lite-chart/VegaLiteChart';
import './info-pane.css';

interface StateProps {
  dracoSolutionOpt: Option<SolutionSet>;
  show: boolean;
  costOpt: Option<number>;
  violationsOpt: Option<Violation[]>;
  vlSpecOpt: Option<any>;
  aspOpt: Option<any>;
}

interface DispatchProps {
  showInfoPane: (show: boolean) => void;
  updateDracoEditor: (code: string, solutionOpt: Option<SolutionSet>) => void;
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
            <h4>{`Cost: ${this.props.costOpt.orNull}`}</h4>
            <h4>Violations</h4>
            <ViolationTable violations={this.props.violationsOpt} />
            <h4>Draco Spec</h4>
            <pre
              styleName="code draco"
              onClick={() => {
                this.props.updateDracoEditor(this.props.aspOpt.orNull, this.props.dracoSolutionOpt);
              }}>
              {this.props.aspOpt.orNull}
            </pre>
          </div>
          <div styleName="chart-column">
              <div styleName="chart">
                <VegaLiteChart vlSpec={this.props.vlSpecOpt.orNull} renderer="svg" actions={false}/>
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
  violations: Option<Violation[]>;
}

const VIOLATION_REGEX = /soft\((.+?)\)/;
const NESTED_VIOLATION_REGEX = /(\w+)+/g;

export class ViolationTable extends React.Component<ViolationTableProps, any> {
  render() {
    if (this.props.violations.isEmpty) {
      return null;
    }

    return (
      <table styleName="violation-table">
        <tbody>
        {
          this.props.violations.get
            .map((row: Violation, i: number) => {
              const match = VIOLATION_REGEX.exec(row.witness);

              if (!match) {
                throw Error(`invalid violation ${JSON.stringify(row)}`);
              }

              const args = match[1].match(NESTED_VIOLATION_REGEX);
              if (!args) {
                throw Error(`invalid violation ${JSON.stringify(row)}`);
              }

              const constraint = row.asp;
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
  const vlSpecOpt = infoPaneState.vlSpecOpt;

  const costOpt = infoPaneState.dracoSpecOpt.map(_ => _.models[0].costs[0]);
  const factsOpt = infoPaneState.dracoSpecOpt.map(_ => _.models[0].facts);
  const violationsOpt = infoPaneState.dracoSpecOpt.map(_ => _.models[0].violations);

  const props: StateProps = {
    costOpt,
    show,
    vlSpecOpt,
    violationsOpt,
    aspOpt: infoPaneState.aspSpecOpt,
    dracoSolutionOpt: infoPaneState.dracoSpecOpt,
  };

  return props;
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    showInfoPane: (show: boolean) => {
      dispatch(showInfoPane(show));
    },
    updateDracoEditor: (code: string, solutionOpt: Option<SolutionSet>) => {
      dispatch(updateDracoEditorCode(code));
      dispatch(setEditorDracoSolutionSet(solutionOpt.get));
      dispatch(switchEditor('draco'));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoPane);
