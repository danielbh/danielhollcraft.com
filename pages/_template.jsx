import React from 'react'
import NavigationBar from '../components/NavigationBar'

import { rhythm } from '../utils/typography'

module.exports = React.createClass({
  propTypes () {
    return {
      children: React.PropTypes.any,
    }
  },
  render () {
    return (
      <div>
          <NavigationBar/>
          {this.props.children}
      </div>
    )
  },
})
