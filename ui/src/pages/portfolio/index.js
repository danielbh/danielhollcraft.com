import React from 'react'
import './index.scss'

export default ({ data }) => {
  return (
    <section>
      <div className="container">
        <header className="major">
          <h2>Portfolio</h2>
        </header>
        <div className="features">
          {data.allMarkdownRemark.edges.map(({ node }) => {
            const { frontmatter } = node
            const {
              previewImage,
              appStore,
              googlePlay,
              web,
              source
            } = frontmatter
            return (
              <article key={node.id}>
                <img className="image" src={`${previewImage.childImageSharp.responsiveSizes.src}`} alt="" />
                <div className="inner">
                  <h4 className="project-title">{node.frontmatter.title}</h4>
                  <p>{node.excerpt}</p>
                  <ul className="actions">
                    {appStore && <li><a href={appStore} className="button">App Store</a></li>}
                    {googlePlay && <li><a href={googlePlay} className="button">Google Play</a></li>}
                    {web && <li><a href={web} className="button">Web</a></li>}
                    {source && <li><a href={source} className="button">Source</a></li>}
                  </ul>
                </div>
              </article>
            )
           })
          }
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  query PortfolioListQuery {
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "portfolio/projects/.*\\.md$/"}}) {
    edges {
      node {
        id
        frontmatter {
          web
          source
          appStore
          googlePlay
          previewImage {
            childImageSharp {
              responsiveSizes(maxWidth: 870) {
                src
              }
            }
          }
          title
          path
        }
        excerpt
      }
    }
  }
}
`
