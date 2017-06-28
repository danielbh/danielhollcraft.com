/**
 * Created by danielhollcraft on 4/29/17.
 * Modified from: https://github.com/qrohlf/trianglify/blob/gh-pages-src/js/components/Hero.jsx
 */
import React, {
  Component,
  PropTypes,
  Addons
} from 'react';

// TODO: Decide if to use trianglify. The following code makes it work, but I am disatisfied with how slow it loads in production (even with Cloud Front).
// import ReactDOM from 'react-dom'
// import update from 'immutability-helper';
// import Trianglify from 'trianglify';
// import TrianglifyCanvas from './components/TrianglifyCanvas';

import './index.scss'

export default class Background extends Component {

  // constructor(props) {
  //   super(props);
  //   // Copy Trianglify.defaults instead of referencing it. Prevents big issues according to github.com/qrohlf
  //   this.state = update(Trianglify.defaults, {});
  //   this.state.resize_timer = null;
  // }
  //
  // debounceResize() {
  //   clearTimeout(this.state.resize_timer);
  //   this.setState({resize_timer: setTimeout(this.handleResize.bind(this), 100)});
  // }
  //
  // handleResize() {
  //   this.resize()
  // }
  //
  // componentDidMount() {
  //   window.addEventListener('resize', this.debounceResize.bind(this));
  //   this.resize()
  // }
  //
  // resize() {
  //   this.setState({
  //     height: ReactDOM.findDOMNode(this).offsetHeight,
  //     width: window.innerWidth
  //   });
  // }
  //
  // componentWillUnmount() {
  //   window.removeEventListener('resize', this.debounceResize.bind(this));
  // }

  render() {
    return(
      <div className="background">
        {/*<TrianglifyCanvas*/}
          {/*height={this.state.height + 10}*/}
          {/*width={this.state.width + 10}*/}
          {/*x_colors={['#23395B', '#225F65', '#23395B', '#819595']}*/}
          {/*variance={1}*/}
          {/*cell_size={50}*/}
          {/*seed="Daniel Hollcraft"/>*/}
      </div>
    );
  }
}

Background.propTypes = {
};

Background.defaultProps = {
};
