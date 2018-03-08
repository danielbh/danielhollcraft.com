import React from 'react'
import Link from 'gatsby-link'

const NavigationBar = ({ toggleSideBar }) => (
  <div id="titleBar">
    <span
      onClick={toggleSideBar}
      className="toggle"
    ></span>
    <span className="title">
      <Link to="/">Daniel Hollcraft</Link>
    </span>
  </div>
)

export default NavigationBar
