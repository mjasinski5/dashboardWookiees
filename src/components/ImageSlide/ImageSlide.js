import React from 'react'
//import classes from './ImageScreen.scss'

export const ImageSlide = (props) => (
  <div>
    <img src={props.imageUrl} />
  </div>
)

ImageSlide.propTypes = {
  imageUrl: React.PropTypes.string
}

export default ImageSlide
