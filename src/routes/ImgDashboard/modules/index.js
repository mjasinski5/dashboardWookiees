import { default as viewModeReducer } from './viewMode';
import { default as imgDashboard } from './imgDashboard';
import { combineReducers } from 'redux';

export default combineReducers({
  viewModeReducer,
  imgDashboard
})
