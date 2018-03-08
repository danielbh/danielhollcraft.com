import React from 'react'
import Link from "gatsby-link";

const ListLink = ({ to, className, children, exact }) =>
  <li>
    <Link to={to}
      className={className}
    >
      {children}
    </Link>
  </li>

ListLink.defaultProps = {
  exact: true
}

export default ListLink
