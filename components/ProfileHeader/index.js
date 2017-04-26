/**
 * Created by danielhollcraft on 4/8/17.
 */

import React, {
  PropTypes,
} from 'react';

import { config } from 'config'
import {Image} from 'react-bootstrap'

import './index.scss'

const ProfileHeader = ({color}) => {
  return (
    <div className="profile-header">
      <Image
        className="profile-photo"
        src={require("../../images/profile-photo.png")}
        alt="Daniel Hollcraft"
        circle
        style={{borderColor: color}}
      />
      <h1 style={{color}}>{config.siteTitle}</h1>
      <h3 style={{color}}>Full-stack Javascript Developer</h3>
    </div>
  );
};

ProfileHeader.propTypes = {
  color: PropTypes.string
};
ProfileHeader.defaultProps = {};

export default ProfileHeader;
