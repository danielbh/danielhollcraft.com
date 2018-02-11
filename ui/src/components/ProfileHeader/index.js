/**
 * Created by danielhollcraft on 4/8/17.
 */

import React, {
  PropTypes,
} from 'react';

import {Image} from 'react-bootstrap'

import FontAwesome from 'react-fontawesome'

import './index.scss'


export const config = graphql`
  query SiteMetadataLookup($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
}
`


const ProfileHeader = ({color, subheading}) => {
  return (
    <div className="profile-header">
      <Image
        className="profile-photo"
        src={require("../../../images/profile-photo.png")}
        alt="Daniel Hollcraft"
        circle
        style={{borderColor: color}}
      />
      <p className="heading">{config.title}</p>
      <p className="subheading">{subheading}</p>

      {/*<div className="social-links">*/}
        {/*<a href={config.githubProfile} >*/}
          {/*<FontAwesome name="github" size='2x' className="social-link" />*/}
        {/*</a>*/}
        {/*<a href={config.linkedinProfile} >*/}
          {/*<FontAwesome name="linkedin-square" size='2x' className="social-link"/>*/}
        {/*</a>*/}
      {/*</div>*/}
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
