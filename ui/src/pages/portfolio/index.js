/**
 * Created by danielhollcraft on 5/3/17.
 */
import React, {
  PropTypes,
} from 'react';

import {
  PortfolioProject
} from '../../components'

const PortfolioIndex = ({projects}) => {
  return (
    <div>{projects.map((p, i) => <PortfolioProject key={i} {...p}/>)}</div>
  );
};

PortfolioIndex.propTypes = {
  projects: PropTypes.array
};
PortfolioIndex.defaultProps = {};

export default PortfolioIndex;
