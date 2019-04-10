import { Constraint } from 'draco-vis';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { setConstraintMap } from '../../actions/draco-actions';
import { ConstraintMap } from '../../model';
import { RootState } from '../../reducers';
import ConstraintTuner, {
  ConstraintTunerDispatchProps,
  ConstraintTunerOwnProps,
  ConstraintTunerStoreProps,
} from '../presenters/constraint-tuner';

function mapStateToProps(state: RootState, props: ConstraintTunerOwnProps): ConstraintTunerStoreProps {
  const sortBy = [(c: Constraint) => (c.type === 'soft' ? 0 : 1), (c: Constraint) => c.name];
  const constraints = ConstraintMap.toConstraintList(state.draco.constraintMap, sortBy);

  return {
    constraints,
  };
}

function mapDispatchToProps(dispatch: Dispatch, props: ConstraintTunerOwnProps): ConstraintTunerDispatchProps {
  return {
    updateConstraints: (constraints: Constraint[]): void => {
      const constraintMap = ConstraintMap.fromConstraintList(constraints);
      dispatch(setConstraintMap(constraintMap));
    },
  };
}

export default connect<ConstraintTunerStoreProps, ConstraintTunerDispatchProps, ConstraintTunerOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(ConstraintTuner);
