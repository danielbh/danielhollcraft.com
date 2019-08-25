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
              source,
              title
            } = frontmatter
            return (
              <article key={node.id}>
                <img className="image" alt="" />
                <div key={node.id} className="inner">
                  <h3 className="project-title">{title}</h3>
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
  allMarkdownRemark(
    filter: {fileAbsolutePath: {regex: "portfolio/projects/.*\\.md$/"}},
    sort: { fields: [frontmatter___priority], order: DESC }
    ) {
    edges {
      node {
        id
        frontmatter {
          priority
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
