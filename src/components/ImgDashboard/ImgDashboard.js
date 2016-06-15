import React from 'react'
import classes from './ImgDashboard.scss'
import ImageScreen from './../ImageScreen';

export default class ImgDashboard extends React.Component {

  static propTypes = {
    fetchImages: React.PropTypes.func.isRequired,
    fetchIfNecessary: React.PropTypes.func.isRequired,
    setRotationIntervalIfNecessary: React.PropTypes.func.isRequired,
    setCurrentImageIndex: React.PropTypes.func.isRequired,
    setRotationInterval: React.PropTypes.func.isRequired,
    currentImageIndex: React.PropTypes.number,
    images: React.PropTypes.array,
    setupImgDashboard: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <ImageScreen setupImgDashboard={this.props.setupImgDashboard} fetchImages={this.props.fetchIfNecessary} setRotationInterval={this.props.setRotationInterval} currentImageIndex={this.props.currentImageIndex} switchTime={this.props.switchTime} images={this.props.images} setCurrentImageIndex={this.props.setCurrentImageIndex}/>
      </div>
    )
  }
}
