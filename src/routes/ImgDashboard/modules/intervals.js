import { Map, fromJS } from 'immutable';
import { fetchIfNecessary, setCurrentImageIndex } from './images';
import { setupRotationInterval } from './imgDashboard';

export const SET_INTERVAL = 'SET_INTERVAL'
export const DELETE_INTERVAL = 'DELETE_INTERVAL';


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function setInterval2(interval = undefined) {
  return {
    type: SET_INTERVAL,
    interval
  }
}

export function deleteInterval() {
  return {
    type: DELETE_INTERVAL
  }
}

export function rotateImage() {
  return (dispatch, getState) => {
    const images = getState().imgDashboard.images.get('images');
    const length = images.toJS().length;

    const randomNumber = getRandomInt(0, length - 1);

    dispatch(setCurrentImageIndex(randomNumber));
  }
}

export function createRotationInterval(dispatch) {
  return setInterval(() => {
    dispatch(rotateImage());
  }, 4000)
}

export function setRotationInterval() {
  return (dispatch, getState) => {
    return dispatch(fetchIfNecessary())
      .then(() => {
        dispatch(setupRotationInterval());
        return Promise.resolve();
    })
  }
}

export function setRotationIntervalIfNecessary() {
  return (dispatch, getState) => {
    const state = getState();
    const interval = state.imgDashboard.intervals.get('interval');

    if(!interval) {
      dispatch(setRotationInterval());
      return Promise.resolve();
    }
    else return Promise.resolve();
  }
}

export function deleteRotationInterval() {
  return (dispatch, getState) => {

    const state = getState();
    const interval = state.imgDashboard.intervals.get('interval');

    if(interval) {
      clearInterval(interval);
      return dispatch(deleteInterval());
    }
    else return Promise.resolve();
  }
}

const ACTION_HANDLERS = {
  [SET_INTERVAL]: (state, action) => {
    return state.set('interval', action.interval);
  },
  [DELETE_INTERVAL]: (state) => {
    return state.set('interval', undefined);
  }
}

const initialState = new Map(fromJS({
  interval: undefined
}));

export default function intervalReducer (state = initialState, action) {
  console.log('dupa', state, action);
  if(!action) action = {};
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
