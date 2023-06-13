import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import thunk from 'redux-thunk';

import * as auth from '../components/auth/service';
import * as adverts from '../components/adverts/service';

//import {auth, adverts} from './reducers';
import * as reducers from './reducers';
import * as actionCreators from './actions'


const reducer = combineReducers(reducers);

const composeEnhancers = composeWithDevTools ({
    actionCreators,
})

// const thunk = store => next => action => {}

// const thunk = function (store) {
//     return function (next) {
//       return function (action) {
//         if (typeof action === 'function') {
//           return action(store.dispatch, store.getState);
//         }
//         return next(action);
//       };
//     };
//   };
  
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
  
  const noAction = () => next => action => {
    if (action.type === 'NO_TROW') {
      return;
    }
    return next(action);
  };
  
  const middleware = [
    thunk.withExtraArgument({ auth, adverts }),
    timestamp,
    logger,
    noAction,
  ];
  

export default function configureStore(preloadedState) {
    const store = createStore(
        reducer,
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware)),
      );
    return store;
}