import React, { Component } from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import 'prismjs/themes/prism-twilight.css'
import { ListLink, NavigationBar } from '../components'
import avatar from '../assets/images/profile-photo.png'
import './sass/main.scss'

export default class extends Component {
  constructor() {
    super()
    this.state = {
      // This will only work if the viewport is narrow enough.
      sideBarOpen: false
    }

    this.toggleSideBar = this.toggleSideBar.bind(this)
    this.closeSideBar = this.closeSideBar.bind(this)
  }

  toggleSideBar() {
    this.setState({ sideBarOpen: !this.state.sideBarOpen })
  }

  // Manages side-effect of not being visible by CSS but open.
  // Unfortunately neccessary.
  closeSideBar() {
    this.setState({ sideBarOpen: false })
  }

  render() {
    const { data, children } = this.props
    const { sideBarOpen } = this.state
    return (
      <div id="content" className={sideBarOpen && 'header-visible'}>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: 'description', content: 'Software engineer. Expert in JavaScript technologies.' },
            { name: 'keywords', content: 'sample, something' },
          ]}
        />
        <NavigationBar toggleSideBar={this.toggleSideBar} />
        <section id="header">
          <header>
            <span className="image avatar"><img src={avatar} alt="" /></span>
            <h1 id="logo"><Link to="/">Daniel Hollcraft</Link></h1>
          </header>
          <nav id="nav">
            <ul onClick={this.closeSideBar}>
              <ListLink to="/">Home</ListLink>
              <ListLink to="/portfolio">Portfolio</ListLink>
              <ListLink to="/blog">Blog</ListLink>
              <ListLink to="/contact">Contact</ListLink>
            </ul>
          </nav>
          <footer>
            <ul className="icons">
              <li><a href="https://github.com/danielbh" className="icon fa-github"><span className="label">Github</span></a></li>
              <li><a href="https://www.linkedin.com/in/daniel-hollcraft/" className="icon fa-linkedin"><span className="label">Linkedin</span></a></li>
            </ul>
          </footer>
        </section>
        <div id="wrapper">
          <div id="main">
            {children()}
          </div>
          <section id="footer">
            <div className="container">
              <ul className="copyright">
                <li>&copy; Daniel Hollcraft 2019.</li><li>Derivative work of: <a href="https://html5up.net/read-only">HTML5 UP</a></li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    )
  }
}

export const query = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
