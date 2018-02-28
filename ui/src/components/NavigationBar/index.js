/**
 * Created by danielhollcraft on 4/5/17.
 */
import React, { PropTypes } from 'react';
import { config } from 'config'
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import FontAwesome from 'react-fontawesome';
import { IndexLink } from 'react-router'; // eslint-disable-line
import {
  Navbar,
  Nav,
  NavItem,
  Image
} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap';

import './index.scss'

const NavigationBar = (props) => {
  return (
    <Navbar className="navbar"  collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <IndexLink to="/">
            <Image
              className='logo'
              src={require('../../../images/logo.png')}
              alt="daniel_hollcraft_logo"
            />
          </IndexLink>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight
             className="nav-links">
          <LinkContainer to="/blog/">
            <NavItem eventKey={1}>
              <FontAwesome name="pencil" className='icon'/>
              Blog
            </NavItem>
          </LinkContainer>
          <LinkContainer to='/services/'>
            <NavItem eventKey={2}>
              <FontAwesome name="rocket" className='icon' />
              Services
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/portfolio/">
            <NavItem eventKey={3}>
              <FontAwesome name="cubes" className='icon' />
              Portfolio
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/contact/">
            <NavItem eventKey={4}>
              <FontAwesome name="envelope" className='icon' />
              Contact
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
NavigationBar.propTypes = {};
NavigationBar.defaultProps = {};

export default NavigationBar;
