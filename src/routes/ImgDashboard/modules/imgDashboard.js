import fetch from 'isomorphic-fetch'
import { Map, fromJS, List } from 'immutable';

// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const SET_CURRENT_IMAGE_INDEX = 'SET_CURRENT_IMAGE_INDEX';
export const SET_VIEW_MODE = 'SET_VIEW_MODE';
export const SET_INTERVAL = 'SET_INTERVAL'
export const DELETE_INTERVAL = 'DELETE_INTERVAL';
// ------------------------------------
// Actions
// ------------------------------------

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


export function receiveImages (payload = []) {
  return {
    type: RECEIVE_IMAGES,
    payload: payload
  }
}

export function setViewMode(mode = 'rotate') {
  return {
    type: SET_VIEW_MODE,
    mode
  }
}

export function setInterval2(interval = undefined) {
  return {
    type: SET_INTERVAL,
    interval
  }
}

export function deleteInterval(interval = undefined) {
  return {
    type: DELETE_INTERVAL,
    interval
  }
}

export function setCurrentImageIndex(index = 0) {
  return {
    type: SET_CURRENT_IMAGE_INDEX,
    index
  }
}

function transformImageData(response) {
  return response.data.images.map((el) => {
    return el.link;
  })
}


export function fetchIfNecessary() {
  return (dispatch, getState) => {
    const images = getState().imgDashboard.get('images');
    console.log('images', images);

    if(!images) {
      return dispatch(fetchImages());
    }
    else return Promise.resolve();

  }
}


export function fetchImages() {
  console.log('fetcg');
  const options = {
    method: 'GET',
    headers: {
      'Authorization': 'Client-ID 9f9611ea36d5134'
    }
  }

  return (dispatch) => {
    return fetch('https://api.imgur.com/3/album/ZOEfe', options)
      .then(response => response.json())
      .then(json => transformImageData(json))
      .then(data => dispatch(receiveImages(data)))
      .catch(err => console.log(err));
  }
}

export function setupImgDashboard() {
  return (dispatch, getState) => {
    return dispatch(fetchIfNecessary())
      .then(() => dispatch(setRotationIntervalIfNecessary()));
  }
}

export function setRotationIntervalIfNecessary() {
  return (dispatch, getState) => {
    const state = getState();

    if(!state.interval)
      return dispatch(setRotationInterval());
    else return Promise.resolve();
  }

}
export function setRotationInterval() {
  return (dispatch, getState) => {
    dispatch(fetchIfNecessary())
      .then(() => {
        const state = getState();
        const images = state.imgDashboard.get('images');

        const interval = setInterval(() => {
          const length = images.toJS().length;
          const randomNumber = getRandomInt(0, length - 1);

          dispatch(setCurrentImageIndex(randomNumber));

        }, 4000);
        return dispatch(setInterval2(interval));
    })
  }
}


export function deleteRotationInterval() {
  return (dispatch, getState) => {
    const state = getState();

    if(state.interval) {
      clearInterval(state.interval);
      dispatch(deleteRotationInterval());
    }
  }
}
/*  This is a thunk, meaning it is a functsion that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk!

    NOTE: This is solely for demonstration purposes. In a real application,
    you'd probably want to dispatch an action of COUNTER_DOUBLE and let the
    reducer take care of this logic.  */

// export const doubleAsync = () => {
//   return (dispatch, getState) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         dispatch(increment(getState().counter))
//         resolve()
//       }, 200)
//     })
//   }
// }

export const actions = {
  fetchImages
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [RECEIVE_IMAGES]: (state, action) => {
    return state.set('images', fromJS(action.payload))
  },
  [SET_CURRENT_IMAGE_INDEX]: (state, action) => {
    return state.set('currentImageIndex', action.index);
  },
  [SET_VIEW_MODE]: (state, action) => {
    return state.set('viewerMode', action.mode)
  },
  [SET_INTERVAL]: (state, action) => {
    return state.set('interval', action.interval);
  },
  [DELETE_INTERVAL]: (state) => {
    state.set('interval', undefined);
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Map();
export default function imgDashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
