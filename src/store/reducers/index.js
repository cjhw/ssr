import { combineReducers } from 'redux';
import homeReducer from './home';
import personalReducer from './personal';

export default combineReducers({
  home: homeReducer,
  personal: personalReducer,
});
