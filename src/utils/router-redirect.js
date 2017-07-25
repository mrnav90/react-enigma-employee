import {isAuthenticated, getUserInfo} from './cookie';

export function ensureAuth(nextState, replace) {
  if (!isAuthenticated()) {
    replace({
      pathname: '/sign-in',
      state: {nextPathname: nextState.location.pathname}
    });
  }
}

export function redirectLoginStatus(nextState, replace) {
  if (isAuthenticated()) {
    const userInfo = getUserInfo();
    switch (userInfo.status) {
      case 2:
        replace({
          pathname: '/term-service',
          state: {nextPathname: nextState.location.pathname}
        });
        break;
      case 3:
        replace({
          pathname: '/register-user-info',
          state: {nextPathname: nextState.location.pathname}
        });
        break;
      case 4:
        replace({
          pathname: '/',
          state: {nextPathname: nextState.location.pathname}
        });
        break;
      case 5:
        replace({
          pathname: '/stop-service',
          state: {nextPathname: nextState.location.pathname}
        });
        break;
      default: break;
    }
  }
}
