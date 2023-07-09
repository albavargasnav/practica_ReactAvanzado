import { advertsLoadedSuccess, authLogoutSuccess } from '../actions';

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