import React from 'react'
import classes from './ImgDashboard.scss'
import ImageScreen from './../ImageScreen';

export default class ImgDashboard extends React.Component {

  static propTypes = {
    fetchImages: React.PropTypes.func.isRequired,
    setCurrentImageIndex: React.PropTypes.func.isRequired,
    currentImageIndex: React.PropTypes.number,
    images: React.PropTypes.array
  }
  componentDidMount() {
    this.props.fetchImages();
  }
  render() {
    return (
      <div>
        <ImageScreen currentImageIndex={this.props.currentImageIndex} switchTime={this.props.switchTime} images={this.props.images} setCurrentImageIndex={this.props.setCurrentImageIndex}/>
      </div>
    )
  }
}
