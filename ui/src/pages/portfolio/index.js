import React from 'react'

export default ({ data }) => {
  return (
    <section>
      <div className="container">
        <header className="major">
          <h2>Portfolio</h2>
        </header>
        <div className="features">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <article key={node.id}>
              <a href="#" className="image"><img src={`${node.frontmatter.previewImage.childImageSharp.responsiveSizes.src}`
              } alt="" /></a>
              <div className="inner">
                <h4>{node.frontmatter.title}</h4>
                <p>{node.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export const query = graphql`
  query IndexQuery {
  allMarkdownRemark(filter: {fileAbsolutePath: {regex: "portfolio/projects/.*\\.md$/"}}) {
    edges {
      node {
        id
        frontmatter {
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
