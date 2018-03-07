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
          <section className="blog-preview">
            <article key={node.id}>
              <Link to={node.frontmatter.path}><h3>{node.frontmatter.title}</h3></Link>
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
    allMarkdownRemark(filter: {fileAbsolutePath: {regex: "blog/posts/.*\\.md$/"}}) {
      edges {
        node {
          id
          frontmatter {
            title
            path
          }
          excerpt(pruneLength: 300)
        }
      }
    }
  }
`
