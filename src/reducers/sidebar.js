import {ACTION_TYPES} from 'constants';

export default (state = {}, action) => {
  switch (action.type) {
    case ACTION_TYPES.OPEN_SIDEBAR:
      return {
        ...state,
        isShow: action.isShow
      };
    case ACTION_TYPES.CLOSE_SIDEBAR:
      return {
        ...state,
        isShow: action.isShow
      };
    default:
      return state;
  }
};
