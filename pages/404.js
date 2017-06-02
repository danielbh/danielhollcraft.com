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
      <p>Whoops. This is awkward.</p>
    </div>
  );
};

NotFound.propTypes = {};
NotFound.defaultProps = {};

export default NotFound;
