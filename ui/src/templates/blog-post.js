import React from "react"
import './index.scss'

export default ({ data }) => {
  const post = data.markdownRemark;
  return (
    <section>
      <div className="container">
        <header className="major">
          <h2 className="blog-title">
            {post.frontmatter.title}
          </h2>
          <p className="blog-date">{post.frontmatter.date}</p>
        </header>
        <article>
          <section
            className="blog-text"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>

      </div>
    </section>
  )
}

export const query = graphql`
  query BlogPostQuery($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
      }
    }
  }
`
