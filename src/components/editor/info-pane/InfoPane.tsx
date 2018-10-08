import classnames from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootAction } from '../../../actions';
import { showInfoPane } from '../../../actions/editor-actions';
import { RootState } from '../../../reducers';
import './info-pane.css';

interface StateProps {
  show: boolean;
  cost?: number;
  violations?: any;
  asp?: any;
}

interface DispatchProps {
  showInfoPane: (show: boolean) => void;
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
        <h4>{`Cost: ${this.props.cost}`}</h4>
        <h4>Violations</h4>
        <pre styleName="code">
          {this.props.violations}
        </pre>
        <h4>Draco Spec</h4>
        <pre styleName="code">
          {this.props.asp}
        </pre>
      </div>
    );
  }

  handleClose() {
    this.props.showInfoPane(false);
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  const infoPaneState = state.editor.infoPane;
  const show = infoPaneState.show;

  const cost = infoPaneState.dracoSpec ? infoPaneState.dracoSpec.models[0].costs[0] : null;
  const facts = infoPaneState.dracoSpec ? infoPaneState.dracoSpec.models[0].facts : null;

  const props: StateProps = {
    cost,
    show,
    asp: infoPaneState.aspSpec,
  };

  if (facts) {
    const violationFacts =
      facts.filter((fact: string) => {
        return fact.startsWith('violation');
      });

    const violations = `${violationFacts.join('.\n')}.\n`;

    props.violations = violations;
  }

  return props;
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): DispatchProps => {
  return {
    showInfoPane: (show: boolean) => {
      dispatch(showInfoPane(show));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InfoPane);
