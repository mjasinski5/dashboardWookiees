import {
  triggerViewMode,
  deleteRotationInterval,
  default as dashboardReducer
} from 'routes/ImgDashboard/modules/imgDashboard';
import { default as indexImgDashboard } from 'routes/ImgDashboard/modules/index';

import * as functions from 'routes/ImgDashboard/modules/imgDashboard';

import { List, Map, fromJS } from 'immutable';

describe('(Action Creator) triggerViewMode', () => {
  let _globalState
  let _dispatchSpy
  let _getStateSpy

  beforeEach(() => {
    _globalState = {
      imgDashboard: new Map(fromJS(dashboardReducer(undefined, {})))
    }
    _dispatchSpy = sinon.spy((action) => {
      _globalState = {
        ..._globalState,
        imgDashboard: dashboardReducer(_globalState.imgDashboard, action)
      }
    })
    _getStateSpy = sinon.spy(() => {
      return _globalState
    })
  })


})

describe('(imgDashboardReducer) initial state', () => {
  it('Should be initialized with initial state', () => {
    let state = dashboardReducer(undefined, {})

    expect(state.get('interval')).to.equal(undefined);
    expect(state.get('images')).to.equal(new List());
    expect(state.get('currentImageIndex')).to.equal(-1);
  })
})
