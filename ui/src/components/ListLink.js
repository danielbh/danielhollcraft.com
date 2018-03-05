import React from 'react'
import Link from "gatsby-link";

const ListLink = ({ to, className, children }) =>
  <li>
    <Link to={to} exact activeClassName="active" className={className}>
      {children}
    </Link>
  </li>

export default ListLink
