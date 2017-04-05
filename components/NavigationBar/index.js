/**
 * Created by danielhollcraft on 4/5/17.
 */
import React, {
  PropTypes,
} from 'react';
import { config } from 'config'

import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router'; // eslint-disable-line

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
    <Navbar className="nav-bar" fluid fixedTop >
      <Navbar.Header>
        <Navbar.Brand>
            <LinkContainer to={prefixLink('/')}>
              <Nav>
                <Image
                  className='logo'
                  src={require('../../images/logo.png')}
                  alt="daniel_hollcraft_logo"
                />
              </Nav>
            </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight
             className="nav-items">
          <LinkContainer to={prefixLink('/projects/')}>
            <NavItem eventKey={1}>
              <FontAwesome name="rocket" className='icon' />
              Projects
            </NavItem>
          </LinkContainer>
          <LinkContainer to={prefixLink('/blog/')}>
            <NavItem eventKey={2}>
              <FontAwesome name="bookmark" className='icon'/>
              Blog
            </NavItem>
          </LinkContainer>
          <LinkContainer to="/contact/">
            <NavItem eventKey={3}>
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
