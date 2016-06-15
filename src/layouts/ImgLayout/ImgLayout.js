import React from 'react'
import HeaderImg from '../../components/HeaderImg';
import classes from './ImgLayout.scss'
import '../../styles/core.scss'

export const ImgLayout = ({ children }) => (
  <div className='container text-center'>
    <HeaderImg />
    <div className={classes.mainContainer}>
      {children}
    </div>
  </div>
)

ImgLayout.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default ImgLayout
