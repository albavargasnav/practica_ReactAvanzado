import {
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGOUT,
  ADVERTS_LOADED_SUCCESS,
  ADVERT_CREATED_SUCCESS,
  ADVERT_LOADED_SUCCESS,
  UI_RESET_ERROR,
} from './types';

export const defaultState = {
  auth: false,
  adverts: {
    areLoaded: false,
    data: [],
  },
  ui: {
    isLoading: false,
    error: null,
  },
};

// export default function reducer(state = defaultState, action) {
//   switch (action.type) {
//     case AUTH_LOGIN:
//       return { ...state, auth: true };
//     case AUTH_LOGOUT:
//       return { ...state, auth: false };
//     case ADVERTS_LOADED:
//       return { ...state, adverts: action.payload };
//     default:
//       return state;
//   }
// }

export function auth(state = defaultState.auth, action) {
  switch (action.type) {
    case AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        token: action.payload.token, // Asegúrate de asignar el token correctamente aquí
      };
    case AUTH_LOGOUT:
      return false;
    default:
      return state;
  }
}

export function adverts(state = defaultState.adverts, action) {
  if (action.type === ADVERTS_LOADED_SUCCESS) {
    return { areLoaded: true, data: action.payload };
  }
  if (action.type === ADVERT_LOADED_SUCCESS) {
    return { ...state, data: [action.payload] };
  }
  if (action.type === ADVERT_CREATED_SUCCESS) {
    // return { ...state, data: [action.payload, ...state.data] };
    return { ...state, data: [action.payload].concat(state.data) };
  }
  return state;
}

export function ui(state = defaultState.ui, action) {
  if (action.error) {
    return { isLoading: false, error: action.payload };
  }

  if (/_REQUEST$/.test(action.type)) {
    return { isLoading: true, error: null };
  }

  if (/_SUCCESS$/.test(action.type)) {
    return { isLoading: false, error: null };
  }

  if (action.type === UI_RESET_ERROR) {
    return { ...state, error: null };
  }

  return state;
}

export default function combinedReducer(state = defaultState, action) {
  return {
    auth: auth(state.auth, action),
    adverts: adverts(state.adverts, action),
    ui: ui(state.ui, action),
  };
}