/**
 * Created by danielhollcraft on 6/2/17.
 */
import React, {
  PropTypes,
} from 'react';

const NotFound = (props) => {
  return (
    <div className="not-found">
      <h1>404 NOT FOUND</h1>
      <h4>Whoops. This is awkward.</h4>
    </div>
  );
};

NotFound.propTypes = {};
NotFound.defaultProps = {};

export default NotFound;
