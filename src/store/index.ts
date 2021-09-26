import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import home from './reducers/home/home'
import category from './reducers/category/category'
import seach from './reducers/seach/seach'
import my from './reducers/my/my'
import car from './reducers/car/car'

const store = createStore(combineReducers({
  home, category, seach, my, car
}), applyMiddleware(thunk))

export default store
