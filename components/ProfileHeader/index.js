/**
 * Created by danielhollcraft on 4/8/17.
 */

import React, {
  PropTypes,
} from 'react';

import { config } from 'config'
import {Image} from 'react-bootstrap'

import './index.scss'

const ProfileHeader = ({color, subheading}) => {
  return (
    <div className="profile-header">
      <Image
        className="profile-photo"
        src={require("../../images/profile-photo.png")}
        alt="Daniel Hollcraft"
        circle
        style={{borderColor: color}}
      />
      <p className="heading">{config.siteTitle}</p>
      <p className="subheading">{subheading}</p>
    </div>
  );
};

ProfileHeader.propTypes = {
  color: PropTypes.string,
  subheading: PropTypes.string
};

ProfileHeader.defaultProps = {
  subheading: config.tagline
};

export default ProfileHeader;
