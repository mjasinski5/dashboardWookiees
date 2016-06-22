import React from 'react'
import { IndexLink, Link } from 'react-router'
import classes from './Header.scss'

export const Header = () => (
  <div>
    <h2>DashboardJS</h2>
    <Link to='/'> Home </Link>
    <Link to='/img'> ImgHome </Link>

  </div>
)

export default Header
