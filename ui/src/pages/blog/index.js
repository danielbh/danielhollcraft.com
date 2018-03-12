import React from 'react'
import Link from 'gatsby-link'
import './index.scss'

export default ({ data }) => {
  return (
    <section>
      <div className="container">
        <header className="major">
          <h2>Blog</h2>
        </header>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <section key={node.id} className="blog-preview">
            <article >
              <Link to={node.frontmatter.path}><h3>{node.frontmatter.title}</h3></Link>
              <h4>{node.frontmatter.date}</h4>
              <p>{node.excerpt}</p>
            </article>
          </section>
        ))}
      </div>
    </section>
  )
}

export const query = graphql`
  query BlogListQuery {
    allMarkdownRemark(
      filter: {fileAbsolutePath: {regex: "/blog/.*\\.md$/"}},
      sort: {fields: [frontmatter___date], order: DESC}
      ) {
      edges {
        node {
          id
          frontmatter {
            date
            title
            path
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`
