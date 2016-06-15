import React from 'react'
import ImageSlide from './../ImageSlide'
//import classes from './ImageScreen.scss'
import HeaderImg from '../HeaderImg';

class ImageScreen extends React.Component {


  componentDidMount() {
    console.log('12');
    this.props.setupImgDashboard();

  }

  // componentDidUpdate(prevState, nextState) {
  //   console.log('rev', prevState, nextState);
  //   // if(prevState.images.length)
  //   //   this.props.setRotationInterval();
  //
  // }

  componentWillUnmount() {
    //this.cleanUpIntervals();
  }


  render() {
    const imgSrc = this.props.images[this.props.currentImageIndex];

    return (
      <div>
      <HeaderImg />
      <div>
        {this.props.images && this.props.images.length === 0 ? 'Loading...' : <ImageSlide imageUrl={imgSrc} /> }
      </div>
      </div>
    )
  }
}

ImageScreen.propTypes = {
  images: React.PropTypes.array,
  currentImageIndex: React.PropTypes.number,
  setRotationInterval:  React.PropTypes.func.isRequired,
  fetchImages: React.PropTypes.func.isRequired,
  setupImgDashboard: React.PropTypes.func.isRequired
}


export default ImageScreen;
