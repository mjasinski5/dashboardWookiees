import fetch from 'isomorphic-fetch'
import { Map, fromJS, List } from 'immutable';
import { default as viewModeReducer, setViewMode } from './viewMode';
import { setRotationIntervalIfNecessary } from './intervals';
// ------------------------------------
// Constants
// ------------------------------------
export const COUNTER_INCREMENT = 'COUNTER_INCREMENT'
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const SET_CURRENT_IMAGE_INDEX = 'SET_CURRENT_IMAGE_INDEX';
export const SET_INTERVAL = 'SET_INTERVAL'
export const DELETE_INTERVAL = 'DELETE_INTERVAL';
export const SET_NEXT_IMAGE_INDEX = 'SET_NEXT_IMAGE_INDEX';
// ------------------------------------
// Actions
// ------------------------------------


export function receiveImages (payload = []) {
  return {
    type: RECEIVE_IMAGES,
    payload: payload
  }
}


export function setCurrentImageIndex(index = 0) {
  return {
    type: SET_CURRENT_IMAGE_INDEX,
    index
  }
}

export function setNextImageIndex() {
  return (dispatch, getState)  => {
    const state = getState().imgDashboard.imgDashboard;

    const images = state.get('images');
    const maxLength = images ? images.toJS().length - 1 : 0;
    const currentImageIndex = state.get('currentImageIndex') ? state.get('currentImageIndex') : 0;
    let nextIndex = state.get('currentImageIndex') + 1;

    nextIndex > maxLength ? nextIndex = 0 : '';

    return dispatch(setCurrentImageIndex(nextIndex));
  }
}

export function setPreviousImageIndex() {
  return (dispatch, getState)  => {
    const state = getState().imgDashboard.imgDashboard;

    const images = state.get('images');
    const length = images ? images.toJS().length : 0;
    const currentImageIndex = state.get('currentImageIndex') ? state.get('currentImageIndex') : 0;
    let previousIndex = state.get('currentImageIndex') - 1;

    previousIndex < 0 ? previousIndex = length - 1  : '';

    return dispatch(setCurrentImageIndex(previousIndex));
  }
}

function transformImageData(response) {
  return response.data.images.map((el) => {
    return el.link;
  })
}


export function fetchIfNecessary() {
  return (dispatch, getState) => {
    const images = getState().imgDashboard.imgDashboard.get('images');

    if(!images || !images.length) {
      dispatch(fetchImages());
      return Promise.resolve();
    }
    else return Promise.resolve();

  }
}


export function fetchImages() {
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
  [SET_INTERVAL]: (state, action) => {
    return state.set('interval', action.interval);
  },
  [DELETE_INTERVAL]: (state) => {
    return state.set('interval', undefined);
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = new Map(fromJS({
  images: [],
  currentImageIndex: 0
}));
export default function imgDashboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
