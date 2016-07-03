import fetch from 'isomorphic-fetch'
import { Map, fromJS, List } from 'immutable';


export const SET_NEXT_IMAGE_INDEX = 'SET_NEXT_IMAGE_INDEX';
export const RECEIVE_IMAGES = 'RECEIVE_IMAGES';
export const SET_CURRENT_IMAGE_INDEX = 'SET_CURRENT_IMAGE_INDEX';

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
    const state = getState().imgDashboard.images;

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
    const state = getState().imgDashboard.images;

    const images = state.get('images');
    const length = images ? images.toJS().length : 0;
    const currentImageIndex = state.get('currentImageIndex') ? state.get('currentImageIndex') : 0;
    let previousIndex = state.get('currentImageIndex') - 1;

    previousIndex < 0 ? previousIndex = length - 1  : '';

    return dispatch(setCurrentImageIndex(previousIndex));
  }
}

export function fetchIfNecessary() {
  return (dispatch, getState) => {
    const state = getState().imgDashboard.images;
    const images = state.get('images');

    if(!images || !images.toJS().length) {
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

function transformImageData(response) {
  return response.data.images.map((el) => {
    return el.link;
  })
}

const ACTION_HANDLERS = {
  [RECEIVE_IMAGES]: (state, action) => {
    return state.set('images', fromJS(action.payload))
  },
  [SET_CURRENT_IMAGE_INDEX]: (state, action) => {
    return state.set('currentImageIndex', action.index);
  }
}


const initialState = new Map(fromJS({
  images: [],
  currentImageIndex: 0
}));
export default function imagesReducer (state = initialState, action) {
  if(!action) action = {};
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
