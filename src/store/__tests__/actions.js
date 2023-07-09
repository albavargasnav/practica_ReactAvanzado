import {
  advertsLoadedSuccess,
  authLogoutSuccess,
  authLogin,
  authLoginRequest,
  authLoginSuccess,
  authLoginFailure,
} from '../actions';

import { ADVERTS_LOADED_SUCCESS, AUTH_LOGOUT } from '../types';

describe('advertsLoadedSuccess', () => {
  test('should return a "ADVERTS_LOADED_SUCCESS" action', () => {
    const adverts = 'adverts';
    const expectedAction = {
      type: ADVERTS_LOADED_SUCCESS,
      payload: adverts,
    };
    const action = advertsLoadedSuccess(adverts);
    expect(action).toEqual(expectedAction);
  });
});

describe('authLogoutSuccess', () => {
  test('should return an "AUTH_LOGOUT" action', () => {
    const expectedAction = {
      type: AUTH_LOGOUT,
    };
    expect(authLogoutSuccess()).toEqual(expectedAction);
  });
});

describe('authLogin', () => {
  const credentials = 'credentials';
  const redirectUrl = 'redirectUrl';
  const action = authLogin(credentials);

  const dispatch = jest.fn();
  const service = { auth: {} };
  const router = {
    navigate: jest.fn(),
    state: { location: { state: { from: { pathname: redirectUrl } } } },
  };

  test('when login api resolves should follow the login flow', async () => {
    // service.auth.login = jest.fn().mockImplementation(() => Promise.resolve());
    service.auth.login = jest.fn().mockResolvedValue();
    await action(dispatch, undefined, { service, router });

    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
    expect(service.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginSuccess());
    expect(router.navigate).toHaveBeenCalledWith(redirectUrl);
  });

  test('when login api rejects should follow error flow', async () => {
    const error = new Error('unauthorized');
    service.auth.login = jest.fn().mockRejectedValue(error);
    await action(dispatch, undefined, { service });

    expect(dispatch).toHaveBeenNthCalledWith(1, authLoginRequest());
    expect(service.auth.login).toHaveBeenCalledWith(credentials);
    expect(dispatch).toHaveBeenNthCalledWith(2, authLoginFailure(error));
  });
});