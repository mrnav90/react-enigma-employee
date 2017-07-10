import {ACTION_TYPES} from 'constants';

const sidebarState = {
  isShow: false,
  style: {
    display: 'none'
  }
};

export default (state = sidebarState, action) => {
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
    case ACTION_TYPES.SET_STYLE_SIDEBAR:
      return {
        ...state,
        style: action.style
      };
    default:
      return state;
  }
};
