import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { addAspClause } from '../../actions/constraint-inspector-actions';
import { RootState } from '../../reducers';
import ConstraintInspector, {
  ConstraintInspectorDispatchProps,
  ConstraintInspectorOwnProps,
  ConstraintInspectorStoreProps,
} from '../presenters/constraint-inspector';

function mapStateToProps(state: RootState, props: ConstraintInspectorOwnProps): ConstraintInspectorStoreProps {
  const aspClauseIds = Object.keys(state.constraintInspector.aspClauses).sort();
  return {
    aspClauseIds,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: ConstraintInspectorOwnProps
): ConstraintInspectorDispatchProps {
  return {
    addAspClause: () => {
      dispatch(addAspClause());
    },
  };
}

export default connect<ConstraintInspectorStoreProps, ConstraintInspectorDispatchProps, ConstraintInspectorOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintInspector);
