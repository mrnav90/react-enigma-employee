import {ACTION_TYPES} from 'constants';

export function openSidebar() {
  return dispatch => {
    dispatch({
      type: ACTION_TYPES.OPEN_SIDEBAR,
      isShow: true
    });
    dispatch({
      type: ACTION_TYPES.SET_STYLE_SIDEBAR,
      style: {
        display: 'block'
      }
    });
  };
}

export function closeSidebar() {
  return dispatch => {
    dispatch({
      type: ACTION_TYPES.CLOSE_SIDEBAR,
      isShow: false
    });
    setTimeout(() => {
      dispatch({
        type: ACTION_TYPES.SET_STYLE_SIDEBAR,
        style: {
          display: 'none'
        }
      });
    }, 500);
  };
}
