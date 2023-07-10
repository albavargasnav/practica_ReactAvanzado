import { areAdvertsLoaded, getAdvert } from './selectors';
import {
    AUTH_LOGIN_FAILURE,
    AUTH_LOGIN_REQUEST,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGOUT,
    ADVERTS_LOADED_FAILURE,
    ADVERTS_LOADED_REQUEST,
    ADVERTS_LOADED_SUCCESS,
    ADVERT_LOADED_FAILURE,
    ADVERT_LOADED_SUCCESS,
    ADVERT_LOADED_REQUEST,
    UI_RESET_ERROR,
    ADVERT_CREATED_SUCCESS,
    ADVERT_CREATED_REQUEST,
    ADVERT_CREATED_FAILURE,
    TAGS_REQUEST,
    TAGS_SUCCESS,
    TAGS_FAILURE,
  } from './types';

  export const authLogin = credentials => async (dispatch, _getState, { service, router }) => {
    dispatch(authLoginRequest());
    try {
      const token = await service.auth.login(credentials);
      // Logged in
      dispatch(authLoginSuccess(token));
      // Redirect to pathname
      const to = router.state.location.state?.from?.pathname || '/';
      router.navigate(to);
    } catch (error) {
      dispatch(authLoginFailure(error));
    }
  };

export const authLoginRequest = () => ({
  type: AUTH_LOGIN_REQUEST,
});

export const authLoginSuccess = (token) => ({
  type: AUTH_LOGIN_SUCCESS,
  payload: {
    token: token,
  },
});

export const authLoginFailure = error => ({
  type: AUTH_LOGIN_FAILURE,
  error: true,
  payload: error,
});



  export const authLogoutSuccess = () => ({
    type: AUTH_LOGOUT,
  });

  export const authLogout =
  () =>
  async (dispatch, _getState, { service }) => {
    await service.auth.logout();
    dispatch(authLogoutSuccess());
  };

export const advertsLoadedRequest = () => ({
  type: ADVERTS_LOADED_REQUEST,
});

export const advertsLoadedSuccess = adverts => ({
  type: ADVERTS_LOADED_SUCCESS,
    payload: adverts,
});

export const advertsLoadedFailure = error => ({
  type: ADVERTS_LOADED_FAILURE,
  error: true,
  payload: error,
});

export const advertsLoaded =
  () =>
  async (dispatch, getState, { service }) => {
    if (areAdvertsLoaded(getState())) {
      return;
    }
    dispatch(advertsLoadedRequest());
    try {
      const adverts = await service.adverts.getLatestAdverts();
      dispatch(advertsLoadedSuccess(adverts));
    } catch (error) {
      dispatch(advertsLoadedFailure(error));
    }
  };

  export const advertLoadedRequest = () => ({
    type: ADVERT_LOADED_REQUEST,
  });
  
  export const advertLoadedSuccess = advert => ({
    type: ADVERT_LOADED_SUCCESS,
    payload: advert,
  });
  
  export const advertLoadedFailure = error => ({
    type: ADVERT_LOADED_FAILURE,
    error: true,
    payload: error,
  });
  
  export const advertLoad =
    advertId =>
    async (dispatch, getState, { service }) => {
      const isLoaded = getAdvert(advertId)(getState());
      if (isLoaded) {
        return;
      }
      dispatch(advertLoadedRequest());
      try {
        const advert = await service.adverts.getAdvert(advertId);
        dispatch(advertLoadedSuccess(advert));
      } catch (error) {
        dispatch(advertLoadedFailure(error));
      }
    };

    export const advertCreateRequest = () => ({
      type: ADVERT_CREATED_REQUEST,
    });
    
    export const advertCreateSuccess = advert => ({
      type: ADVERT_CREATED_SUCCESS,
      payload: advert,
    });
    
    export const advertCreateFailure = error => ({
      type: ADVERT_CREATED_FAILURE,
      error: true,
      payload: error,
    });
    
    export const advertCreate =
      advert =>
      async (dispatch, _getState, { service, router }) => {
        dispatch(advertCreateRequest());
        try {
          const { id } = await service.adverts.createAdvert(advert);
          const createdAdvert = await service.adverts.getAdvert(id);
          dispatch(advertCreateSuccess(createdAdvert));
          router.navigate(`/adverts/${id}`);
          return createdAdvert;
        } catch (error) {
          dispatch(advertCreateFailure(error));
        }
      };

      export const tagsRequest = () => ({
        type: TAGS_REQUEST,
      });
      
      export const tagsSuccess = (tags) => ({
        type: TAGS_SUCCESS,
        payload: tags,
      });
      
      export const tagsFailure = (error) => ({
        type: TAGS_FAILURE,
        payload: error,
      });

export const uiResetError = () => ({
    type: UI_RESET_ERROR,
  });

  

