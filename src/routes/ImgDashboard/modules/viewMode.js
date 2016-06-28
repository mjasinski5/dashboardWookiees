import { Map, fromJS, List } from 'immutable';
import { setRotationIntervalIfNecessary, deleteRotationInterval } from './imgDashboard';

export const DELETE_INTERVAL = 'DELETE_INTERVAL';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';

export function setViewMode(mode) {
  return {
    type: SET_VIEW_MODE,
    mode
  }
}

export function triggerViewMode(mode) {
  return (dispatch, getState) => {
    const state = getState();
    const currentMode = state;

    if(mode === currentMode) return Promise.resolve();

    dispatch(setViewMode(mode));

    switch(mode) {
      case 'staticMode':
        dispatch(deleteRotationInterval());
        return Promise.resolve();
      case 'rotation':
        dispatch(setRotationIntervalIfNecessary());
        return Promise.resolve();
    }
  }
}

const ACTION_HANDLERS = {
  [SET_VIEW_MODE]: (state, action) => {
    const returnValue = action.mode;

    return returnValue;
  }
}

const initialState = 'rotation'; //hardcoded TODO
export default function viewModeReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
