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
    setupImgDashboard: React.PropTypes.func.isRequired,
    deleteRotationInterval: React.PropTypes.func.isRequired,
    triggerViewMode: React.PropTypes.func.isRequired,
    viewMode: React.PropTypes.string,
    setNextImageIndex: React.PropTypes.func.isRequired,
    setPreviousImageIndex: React.PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <ImageScreen setPreviousImageIndex={this.props.setPreviousImageIndex} setNextImageIndex={this.props.setNextImageIndex} viewMode={this.props.viewMode} triggerViewMode={this.props.triggerViewMode} deleteRotationInterval={this.props.deleteRotationInterval} setupImgDashboard={this.props.setupImgDashboard} fetchImages={this.props.fetchIfNecessary} setRotationInterval={this.props.setRotationInterval} currentImageIndex={this.props.currentImageIndex} switchTime={this.props.switchTime} images={this.props.images} setCurrentImageIndex={this.props.setCurrentImageIndex}/>
      </div>
    )
  }
}
