import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import { ListLink } from '../components'
import avatar from '../assets/images/profile-photo.png'
import './sass/main.scss'
import 'prismjs/themes/prism.css'
import 'prismjs/themes/prism-solarizedlight.css'

export default ({ children }) => (
  <div id="content">
    <div id="titleBar"><a href="#header" className="toggle"></a><span className="title"><a href="#">Daniel Hollcraft</a></span></div>
    <section id="header">
      <header>
        <span className="image avatar"><img src={avatar} alt="" /></span>
        <h1 id="logo"><a href="#">Daniel Hollcraft</a></h1>
        <p>Web Developer<br />
          Frontend | React | Node.js
        </p>
      </header>
      <nav id="nav">

        <ul>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/portfolio">Portfolio</ListLink>
          {/* <ListLink to="/blog">Blog</ListLink> */}
          {/*<ListLink to="/contact">Contact</ListLink> */}
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
            <li>&copy; Daniel Hollcraft. All rights reserved.</li><li>Theme: <a href="http://html5up.net">HTML5 UP</a></li>
          </ul>
        </div>
      </section>
    </div>
  </div>
)


// export default ({ data,  children }) => (
//   <div style={{ margin: '0 auto', maxWidth: 650, padding: '1.25rem 1rem' }}>
//     <Helmet
//       title={data.site.siteMetadata.title}
//       meta={[
//         { name: 'description', content: 'Sample' },
//         { name: 'keywords', content: 'sample, something' },
//       ]}
//     />
//     <header style={{ marginBottom: '1.5rem' }}>
//       <Link to="/" style={{ textShadow: 'none', backgroundImage: 'none' }}>
//         <h3 style={{ display: 'inline' }}>{data.site.siteMetadata.title}</h3>
//       </Link>
//       <ul style={{ listStyle: 'none', float: 'right' }}>
//         <ListLink to="/">Home</ListLink>
//         <ListLink to="/about/">About</ListLink>
//         <ListLink to="/contact/">Contact</ListLink>
//       </ul>
//     </header>
//     {children()}
//   </div>
// )

// export const query = graphql`
//   query AboutQuery {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
