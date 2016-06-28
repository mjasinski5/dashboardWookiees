import { Map, fromJS } from 'immutable';

export const SET_INTERVAL = 'SET_INTERVAL'
export const DELETE_INTERVAL = 'DELETE_INTERVAL';


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


export function deleteRotationInterval() {
  return (dispatch, getState) => {

    const state = getState();
    const interval = state.get('interval');

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
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
