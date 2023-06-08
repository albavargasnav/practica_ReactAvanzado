// import { createStore } from 'redux';

// action { type: 'INCREMENT' }
// action { type: 'DECREMENT' }

function reducer(state = 0, action) {
    switch (action.type) {
      case 'INCREMENT':
        return state + 1;
      case 'DECREMENT':
        return state - 1;
      default:
        return state;
    }
  }
  
  function createStore(reducer, preloadedState) {
    let state = preloadedState;
    let listeners = [];
    const getState = () => state;
    const dispatch = action => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
    };
    const subscribe = listener => {
      listeners.push(listener);
      return function () {
        listeners = listeners.filter(l => l !== listener);
      };
    };
    dispatch({ type: 'INIT' });
    return {
      getState,
      dispatch,
      subscribe,
    };
  }
  
  const store = createStore(reducer);
  const showState = () => console.log(store.getState());
  showState();
  
  const unsubscribe = store.subscribe(showState);
  store.dispatch({ type: 'INCREMENT' });
  store.dispatch({ type: 'DECREMENT' });
  unsubscribe();
  store.dispatch({ type: 'DECREMENT' });
  store.dispatch({ type: 'DECREMENT' });
  store.dispatch({ type: 'DECREMENT' });
  store.dispatch({ type: 'INCREMENT' });