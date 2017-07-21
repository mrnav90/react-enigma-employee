import {isAuthenticated} from './cookie';

export function ensureAuth(nextState, replace) {
  if (!isAuthenticated()) {
    replace({
      pathname: '/sign-in',
      state: {nextPathname: nextState.location.pathname}
    });
  }
}
