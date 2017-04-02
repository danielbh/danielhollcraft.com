import React from 'react'
import { Container } from 'react-responsive-grid'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import Headroom from 'react-headroom'
import normalize from 'normalize.css'
import '../css/markdown-styles'
import '../css/index'

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
        {/*<Headroom*/}
          {/*wrapperStyle={{*/}
            {/*marginBottom: rhythm(1),*/}
          {/*}}*/}
          {/*style={{*/}
            {/*background: '#252525'*/}
          {/*}}*/}
        {/*>*/}
          {/*<Container*/}
            {/*style={{*/}
              {/*maxWidth: 960,*/}
              {/*paddingTop: 0,*/}
              {/*padding: `${rhythm(1)} ${rhythm(3/4)}`,*/}
            {/*}}*/}
          {/*>*/}
            {/*<Link*/}
              {/*to={prefixLink('/')}*/}
              {/*style={{*/}
                {/*color: 'white',*/}
                {/*textDecoration: 'none',*/}
              {/*}}*/}
            {/*>*/}
              {/*Your Brand!*/}
            {/*</Link>*/}
          {/*</Container>*/}
        {/*</Headroom>*/}
        {/*<Container*/}
          {/*style={{*/}
            {/*maxWidth: 960,*/}
            {/*padding: `${rhythm(1)} ${rhythm(3/4)}`,*/}
            {/*paddingTop: 0,*/}
          {/*}}*/}
        {/*>*/}
          {this.props.children}
        {/*</Container>*/}
      </div>
    )
  },
})
