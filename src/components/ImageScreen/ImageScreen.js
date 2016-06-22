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
    console.log('unount');
    this.props.deleteRotationInterval();
  }

  onChangeHandler(el) {

    console.log('setViewMode', el.target.value);
    this.props.triggerViewMode(el.target.value)
  }

  render() {
    const imgSrc = this.props.images[this.props.currentImageIndex];

    return (
      <div>
      <HeaderImg setNextImageIndex={this.props.setNextImageIndex} viewMode={this.props.viewMode} onChangeHandler={this.onChangeHandler.bind(this)}/>
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
  setupImgDashboard: React.PropTypes.func.isRequired,
  deleteRotationInterval: React.PropTypes.func.isRequired,
  triggerViewMode: React.PropTypes.func.isRequired,
  viewMode: React.PropTypes.string,
  setNextImageIndex: React.PropTypes.func.isRequired
}


export default ImageScreen;
