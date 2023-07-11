const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

function reducer(state = 0, action) {
  switch (action.type) {
    case INCREMENT:
      return state + action.payload;
    case DECREMENT:
      return state - action.payload;
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

const increment = step => ({
  type: INCREMENT,
  payload: step ?? 1,
});

const decrement = step => ({
  type: DECREMENT,
  payload: step ?? 1,
});

const store = createStore(reducer);
const showState = () => console.log(store.getState());
showState();

const unsubscribe = store.subscribe(showState);
// store.dispatch({ type: INCREMENT, payload: 2 });
store.dispatch(increment(2));
//store.dispatch({ type: DECREMENT, payload: 3 });
store.dispatch(decrement(3));

store.dispatch({ type: DECREMENT });
store.dispatch({ type: DECREMENT });
store.dispatch({ type: DECREMENT });
store.dispatch({ type: INCREMENT });
unsubscribe();