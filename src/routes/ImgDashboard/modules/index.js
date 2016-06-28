import { default as viewModeReducer } from './viewMode';
import { default as imgDashboard } from './imgDashboard';
import { default as intervals } from './intervals';
import { default as images } from './images';

import { combineReducers } from 'redux';

export default combineReducers({
  viewModeReducer,
  images,
  intervals,
})
