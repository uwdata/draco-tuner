import { connect } from "react-redux";
import { RootState } from "../../reducers";
import PairCollection, { PairCollectionProps, PairCollectionState } from "../presenters/pair-collection/PairCollection";

function mapStateToProps(rootState: RootState, props: PairCollectionProps) {
  const pairIds = Object.keys(rootState.pairs).map(pairId => +pairId);
  return {
    pairIds
  };
}

export default connect<PairCollectionProps, PairCollectionState>(
  mapStateToProps,
  null
)(PairCollection);
