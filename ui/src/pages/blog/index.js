import React from 'react'

export default ({ data }) => {
  return (
    <section>
      <div className="container">
        <header className="major">
          <h2>Blog</h2>
        </header>
        <div className="features">
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <article key={node.id}>
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
  query BlogListQuery {
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "blog/posts/.*\\.md$/"}}) {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
          excerpt
        }
      }
    }
  }
`
