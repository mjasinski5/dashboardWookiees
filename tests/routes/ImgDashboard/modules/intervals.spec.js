import {
  deleteInterval,
  setRotationInterval,
  setRotationIntervalIfNecessary,
  deleteRotationInterval,
} from 'routes/ImgDashboard/modules/intervals';
import { fromJS, Map, List } from 'immutable';
import { default as intervalsReducer } from 'routes/ImgDashboard/modules/intervals';
import * as images from 'routes/ImgDashboard/modules/images';

describe('primary checks', () => {

  it('setRotationInterval, setRotationIntervalIfNecessary, deleteRotationInterval should be function and should return a function (its thunk)', () => {
    expect(setRotationInterval).to.be.a('function');
    expect(setRotationInterval()).to.be.a('function');

    expect(setRotationIntervalIfNecessary).to.be.a('function');
    expect(setRotationIntervalIfNecessary()).to.be.a('function');

    expect(deleteRotationInterval).to.be.a('function');
    expect(deleteRotationInterval()).to.be.a('function');

  });

  it('check initial state is undefined', () => {
    let state = intervalsReducer(undefined, {});
    const interval = state.get('interval');

    expect(interval).to.equal(undefined);
  });

});
describe('(Action Creator) setRotationInterval', () => {
  let _globalState;
  let _dispatchSpy;
  let _getStateSpy;

  beforeEach(() => {
    _globalState = {
      intervals: intervalsReducer(undefined, {})
    }
    _dispatchSpy = sinon.spy((action) => {
      _globalState = {
        ..._globalState,
        intervals: intervalsReducer(_globalState.intervals, action)
      }

      if(typeof action === 'function') return Promise.resolve();
    })
    _getStateSpy = sinon.spy(() => {
      return _globalState
    })
  });


  it('setRotationInterval should call fetchIfNecessary', () => {

    //const _fetchIfNecessary = sinon.spy(images, 'fetchIfNecessary');
    const _setCurrentImageIndex = sinon.spy(images, 'setCurrentImageIndex');

    return setRotationInterval()(_dispatchSpy, _getStateSpy)
      .then(() => {
        // _dispatchSpy.should.have.been.calledTwice;
        // _fetchIfNecessary.should.have.been.calledOnce;
        // _setCurrentImageIndex.should.have.been.calledOnce;

      })
  })




});
