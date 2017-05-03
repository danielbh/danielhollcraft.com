/**
 * Created by danielhollcraft on 5/3/17.
 */
import React, {
  PropTypes,
} from 'react';

import {
  PortfolioProject
} from '../../components'

const PortfolioIndex = ({projectDataArray}) => {

  const projects = projectDataArray.map((p, i) => <PortfolioProject key={i} {...p}/>);
  return (
    <div>{projects}</div>
  );
};

PortfolioIndex.propTypes = {
  projectDataArray: PropTypes.array
};
PortfolioIndex.defaultProps = {};

export default PortfolioIndex;
