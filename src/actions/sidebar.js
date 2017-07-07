import {ACTION_TYPES} from 'constants';

export function openSidebar() {
  return dispatch => {
    dispatch({
      type: ACTION_TYPES.OPEN_SIDEBAR,
      isShow: true,
      display: 'block'
    });
  };
}

export function closeSidebar() {
  return dispatch => {
    dispatch({
      type: ACTION_TYPES.CLOSE_SIDEBAR,
      isShow: false,
      display: 'none'
    });
  };
}
