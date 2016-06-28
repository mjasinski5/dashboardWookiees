import {
  triggerViewMode,
  setViewMode
} from 'routes/ImgDashboard/modules/viewMode';
import * as functions from 'routes/ImgDashboard/modules/imgDashboard';
import { default as viewModeReducer } from 'routes/ImgDashboard/modules/viewMode';
import { fromJS, Map, List } from 'immutable';

describe('(Action Creator) triggerViewMode', () => {
  let _globalState;
  let _dispatchSpy;
  let _getStateSpy;

  beforeEach(() => {
    _globalState = {
      viewMode: viewModeReducer(undefined, {})
    }
    _dispatchSpy = sinon.spy((action) => {
      _globalState = {
        ..._globalState,
        viewMode: viewModeReducer(_globalState.viewMode, action)
      }
    })
    _getStateSpy = sinon.spy(() => {
      return _globalState
    })
  })


  it('triggerViewMode should be function and should return a function (its thunk)', () => {
    expect(triggerViewMode).to.be.a('function');
    expect(triggerViewMode()).to.be.a('function');
  });

  it('should call deleteRotationInterval when set to staticMode', () => {

    const _deleteRotationInterval = sinon.spy(functions, 'deleteRotationInterval');

    return triggerViewMode('staticMode')(_dispatchSpy, _getStateSpy)
      .then(() => {
        _dispatchSpy.should.have.been.calledTwice;
        _deleteRotationInterval.should.have.been.calledOnce;
      })

  });

  it('should call setRotationIntervalIfNecessary when set to rotation', () => {
    _globalState = viewModeReducer({
      viewerMode: 'staticMode'
    }, {});

    const _setRotationIntervalIfNecessary = sinon.spy(functions, 'setRotationIntervalIfNecessary');

    return triggerViewMode('rotation')(_dispatchSpy, _getStateSpy)
      .then(() => {
        _dispatchSpy.should.have.been.calledTwice;
        _setRotationIntervalIfNecessary.should.have.been.calledOnce;
      })

  });


  it('should set proper viewMode when setViewMode is triggered', () => {
    let state = viewModeReducer(undefined, {});
    expect(state).to.equal('rotation'); // default state

    state = viewModeReducer(state, setViewMode('staticMode'));
    expect(state).to.equal('staticMode');

    state = viewModeReducer(state, setViewMode('staticMode'));
    expect(state).to.equal('staticMode');


  });



})
