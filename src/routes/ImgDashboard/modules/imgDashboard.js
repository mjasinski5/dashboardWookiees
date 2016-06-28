import { fetchIfNecessary } from './images';
import { setRotationIntervalIfNecessary } from './intervals'

export function setupImgDashboard() {
  return (dispatch, getState) => {
    return dispatch(fetchIfNecessary())
      .then(() => dispatch(setRotationIntervalIfNecessary()));
  }
}
