import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../reducers';
import EvalMinimap, {
  EvalMinimapDispatchProps,
  EvalMinimapOwnProps,
  EvalMinimapStoreProps,
} from '../presenters/eval-minimap';

function mapStateToProps(state: RootState, props: EvalMinimapOwnProps): EvalMinimapStoreProps {
  return {
    type: EvalMinimap.PAIRS,
  };
}

function mapDispatchToProps(
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  props: EvalMinimapOwnProps
): EvalMinimapDispatchProps {
  return {};
}

export default connect<EvalMinimapStoreProps, EvalMinimapDispatchProps, EvalMinimapOwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(EvalMinimap);
