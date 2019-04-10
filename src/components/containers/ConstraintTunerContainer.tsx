import { Constraint } from 'draco-vis';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setConstraintMap } from '../../actions/draco-actions';
import { ConstraintMap } from '../../model';
import { RootState } from '../../reducers';
import ConstraintTuner, { ConstraintTunerDispatchProps, ConstraintTunerProps, ConstraintTunerStoreProps } from '../presenters/constraint-tuner';

function mapStateToProps(state: RootState, props: ConstraintTunerProps): ConstraintTunerStoreProps {
  const sortBy = [(c: Constraint) => c.type === 'soft' ? 0 : 1, (c: Constraint) => c.name];
  const constraints = ConstraintMap.toConstraintList(state.draco.constraintMap, sortBy);

  return {
    constraints
  };
}

function mapDispatchToProps(dispatch: Dispatch, props: ConstraintTunerProps): ConstraintTunerDispatchProps {
  return {
    updateConstraints: (constraints: Constraint[]): void => {
      const constraintMap = ConstraintMap.fromConstraintList(constraints);
      dispatch(setConstraintMap(constraintMap));
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintTuner);
