import React from 'react'
import ImageSlide from './../ImageSlide'
//import classes from './ImageScreen.scss'
import HeaderImg from '../HeaderImg';

class ImageScreen extends React.Component {

  getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  setUpInterval() {
    this.interval = setInterval(() => {
      const length = this.props.images.length;
      const randomNumber = this.getRandomInt(0, length - 1);

      this.props.setCurrentImageIndex(randomNumber);

    }, 4000);
  }

  cleanUpIntervals() {
    clearInterval(this.interval);

  }

  componentDidMount() {
    this.setUpInterval();
  }

  componentWillUnmount() {
    this.cleanUpIntervals();
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
  currentImageIndex: React.PropTypes.number
}


export default ImageScreen;
