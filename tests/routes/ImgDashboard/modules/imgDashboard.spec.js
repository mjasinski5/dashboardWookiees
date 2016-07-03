import {
  setupImgDashboard,
  setupRotationInterval,
} from 'routes/ImgDashboard/modules/imgDashboard';

import * as imagesFunctions from 'routes/ImgDashboard/modules/images';
import * as intervalsFunctions from 'routes/ImgDashboard/modules/intervals';

import { List, Map, fromJS } from 'immutable';

describe('(Action Creator) setupImgDashboard', () => {
  let _globalState
  let _dispatchSpy
  let _getStateSpy
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    _globalState = {
    }

    _dispatchSpy = sinon.spy((action) => {
      if(typeof action === 'function') return Promise.resolve();
    })
    _getStateSpy = sinon.spy(() => {
      return _globalState
    })
  })

  afterEach(() => {
    sandbox.restore();
  })

  it('Should call proper functions', () => {
    const _fetchIfNecessary = sandbox.spy(imagesFunctions, 'fetchIfNecessary')
    const _setRotationIntervalIfNecessary = sandbox.spy(intervalsFunctions, 'setRotationIntervalIfNecessary')

    return setupImgDashboard()(_dispatchSpy, _getStateSpy)
      .then(() => {
        _dispatchSpy.should.have.been.calledTwice;
        _fetchIfNecessary.should.have.calledOnce;
        _setRotationIntervalIfNecessary.should.have.calledOnce;

      })

    });

  it('setupRotationInterval should call proper functions', () => {
    const _createRotationInterval = sandbox.spy(intervalsFunctions, 'createRotationInterval');
    const _setInterval2 = sandbox.spy(intervalsFunctions, 'setInterval2');

    return setupRotationInterval()(_dispatchSpy, _getStateSpy)
      .then(() => {
        _createRotationInterval.should.have.calledOnce;
      })
  });

})
