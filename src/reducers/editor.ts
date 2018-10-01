import { UPDATE_EDITOR_CODE } from '../actions';

const editor = (state: any = { code: '' }, action: any) => {
  switch (action.type) {
    case UPDATE_EDITOR_CODE:
      return {
        ...state,
        code: action.value,
      };
    default:
      return state;
  }
};

export default editor;
