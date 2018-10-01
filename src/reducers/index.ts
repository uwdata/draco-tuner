import { combineReducers } from 'redux';
import editor from './editor';
import draco from './draco';

export default combineReducers({
  editor,
  draco,
});
