import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import thunk from 'redux-thunk';

import * as service from '../service';

import * as reducers from './reducers';
import * as actionCreators from './actions'

import { authLoginSuccess } from './actions';


const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools ({
    actionCreators,
})
  
  const logger = store => next => action => {
    if (action.type) {
      console.group(action.type);
      console.info('dispatching', action, store.getState());
      const result = next(action);
      console.log('next state', store.getState());
      console.groupEnd();
      return result;
    }
    return next(action);
  };
  
  const timestamp = () => next => action => {
    return next({
      ...action,
      meta: {
        ...action.meta,
        timestamp: Date.now(),
      },
    });
  };
  
  const failureRedirects = (router, redirectsMap) => () => next => action => {
    const result = next(action);
  
    if (action.error) {
      const redirect = redirectsMap[action.payload.status];
      if (redirect) {
        router.navigate(redirect);
      }
    return result;
  };
}
  
  export default function configureStore(preloadedState, { router }) {
    const middleware = [
      thunk.withExtraArgument({ service, router }),
      timestamp,
      logger,
    ];
  
    const store = createStore(
        reducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware)),
      );
    
      const token = localStorage.getItem('token');
      if (token) {
        store.dispatch(authLoginSuccess());
      }

    return store;
  }


