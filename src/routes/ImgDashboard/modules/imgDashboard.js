import { fetchIfNecessary } from './images';
import { setRotationIntervalIfNecessary, createRotationInterval, setInterval2 } from './intervals'

export function setupImgDashboard() {
  return (dispatch, getState) => {
    return dispatch(fetchIfNecessary())
      .then(() => dispatch(setRotationIntervalIfNecessary()));
  }
}

export function setupRotationInterval() {
  return (dispatch, getState) => {
    const interval = createRotationInterval(dispatch); // to change..
    dispatch(setInterval2(interval));
    return Promise.resolve();
  }
}
