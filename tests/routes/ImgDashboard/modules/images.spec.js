import {
  setNextImageIndex,
  setPreviousImageIndex,
  fetchIfNecessary,
  fetchImages,
  transformImageData
} from 'routes/ImgDashboard/modules/images';
import { fromJS, Map, List } from 'immutable';
import { default as imagesReducer } from 'routes/ImgDashboard/modules/images';



describe('primary checks IMAGES', () => {

  it('setNextImageIndex, setPreviousImageIndex, fetchIfNecessary, fetchImages should be function and should return a function (its thunk)', () => {

    expect(setNextImageIndex).to.be.a('function');
    expect(setNextImageIndex()).to.be.a('function');

    expect(setPreviousImageIndex).to.be.a('function');
    expect(setPreviousImageIndex()).to.be.a('function');

    expect(fetchIfNecessary).to.be.a('function');
    expect(fetchIfNecessary()).to.be.a('function');

    expect(fetchImages).to.be.a('function');
    expect(fetchImages()).to.be.a('function');

  });

  it('check initial state', () => {
    let state = imagesReducer(undefined, {});

    const images = state.get('images');
    const currentImageIndex = state.get('currentImageIndex');

    expect(images).to.equal(fromJS([]));
    expect(currentImageIndex).to.equal(0);

  });

});
