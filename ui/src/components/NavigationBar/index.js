/**
 * Created by danielhollcraft on 4/5/17.
 */
import React, {
  PropTypes,
} from 'react';

import FontAwesome from 'react-fontawesome';
import Link from 'gatsby-link'
import {
  Navbar,
  Nav,
  NavItem,
  Image
} from 'react-bootstrap'

import './index.scss'

const NavigationBar = (props) => {
  return (
    <Navbar className="navbar"  collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
            <Image
              className='logo'
              src={require('../../../images/logo.png')}
              alt="daniel_hollcraft_logo"
            />
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight
             className="nav-links">
            <NavItem eventKey={1}>
              <FontAwesome name="pencil" className='icon'/>
              Blog
            </NavItem>
            <NavItem eventKey={2}>
              <FontAwesome name="rocket" className='icon' />
              Services
            </NavItem>
            <NavItem eventKey={3}>
              <FontAwesome name="cubes" className='icon' />
              Portfolio
            </NavItem>
            <NavItem eventKey={4}>
              <FontAwesome name="envelope" className='icon' />
              Contact
            </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
NavigationBar.propTypes = {};
NavigationBar.defaultProps = {};

export default NavigationBar;
