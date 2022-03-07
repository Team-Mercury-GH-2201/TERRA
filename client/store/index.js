import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import auth from './auth';
import allPlantsReducer from './allPlants';
import usersReducer from './users';
import singlePlantReducer from './singlePlant';
import cartReducer from './cart';

const reducer = combineReducers({
  auth: auth,
  plants: allPlantsReducer,
  users: usersReducer,
  plant: singlePlantReducer,
  cart: cartReducer,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

store.subscribe(() => {
  const state = store.getState();
  console.log('STORE STATE', state);
});

export default store;
export * from './auth';
