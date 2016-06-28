import { connect } from 'react-redux'
import { setPreviousImageIndex, setNextImageIndex, setupImgDashboard, fetchImages, setCurrentImageIndex, fetchIfNecessary } from '../modules/imgDashboard'
import { triggerViewMode } from '../modules/viewMode';
import { deleteRotationInterval, setRotationInterval, setRotationIntervalIfNecessary } from '../modules/intervals';

import ImgDashboard from 'components/ImgDashboard'

const mapActionCreators = {
  fetchImages,
  fetchIfNecessary,
  setCurrentImageIndex,
  setRotationInterval,
  deleteRotationInterval,
  setRotationIntervalIfNecessary,
  setupImgDashboard,
  deleteRotationInterval,
  triggerViewMode,
  setNextImageIndex,
  setPreviousImageIndex
}

const mapStateToProps = (state) => ({
  images: state.imgDashboard.imgDashboard.get('images') ? state.imgDashboard.imgDashboard.get('images').toJS() : [],
  currentImageIndex: state.imgDashboard.imgDashboard.get('currentImageIndex') ? state.imgDashboard.imgDashboard.get('currentImageIndex') : 0,
  switchTime: state.imgDashboard.imgDashboard.get('switchTime') ? state.imgDashboard.imgDashboard.get('switchTime').toJS() : '0',
  viewMode: state.imgDashboard.viewModeReducer,
})

/*  Note: mapStateToProps is where you should use `reselect` to create selectors, ie:

    import { createSelector } from 'reselect'
    const counter = (state) => state.counter
    const tripleCount = createSelector(counter, (count) => count * 3)
    const mapStateToProps = (state) => ({
      counter: tripleCount(state)
    })

    Selectors can compute derived data, allowing Redux to store the minimal possible state.
    Selectors are efficient. A selector is not recomputed unless one of its arguments change.
    Selectors are composable. They can be used as input to other selectors.
    https://github.com/reactjs/reselect    */

export default connect(mapStateToProps, mapActionCreators)(ImgDashboard)
