/**
 * Created by danielhollcraft on 4/29/17.
 * Modified from: https://github.com/qrohlf/trianglify/blob/gh-pages-src/js/components/Hero.jsx
 */
import React, {
  Component,
  PropTypes,
  Addons
} from 'react';

import ReactDOM from 'react-dom'
import update from 'immutability-helper';
import Trianglify from 'trianglify';
import TrianglifyCanvas from './components/TrianglifyCanvas';

import './index.scss'

export default class Background extends Component {

  constructor(props) {
    super(props);
    // Copy Trianglify.defaults instead of referencing it. Prevents heisenbugs
    this.state = update(Trianglify.defaults, {});
    this.state.height = window.innerHeight;
    this.state.width = window.innerWidth;
    this.state.x_colors = ["#ffffd9","#edf8b1","#7fcdbb","#41b6c4","#1d91c0","#225ea8","#253494"];
    this.state.cell_size = 60;
    this.state.resize_timer = null;
    this.state.seed = "Daniel Hollcraft"; // Seed with my own name!
  }

  debounceResize() {
    clearTimeout(this.state.resize_timer);
    this.setState({resize_timer: setTimeout(this.handleResize.bind(this), 100)});
  }

  handleResize(e) {
    this.resize()
  }

  componentDidMount() {
    window.addEventListener('resize', this.debounceResize.bind(this));
    this.resize()
  }

  resize() {
    this.setState({
      height: ReactDOM.findDOMNode(this).offsetHeight,
      width: ReactDOM.findDOMNode(this).offsetWidth
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.debounceResize.bind(this));
  }

  render() {
    return(
      <div className="background" style={{backgroundColor: this.props.color}}>
        <TrianglifyCanvas
          height={this.state.height + 10}
          width={this.state.width + 10}
          x_colors={this.state.x_colors}
          variance={this.state.variance}
          cell_size={this.state.cell_size}
          seed={this.state.seed}/>
      </div>
    );
  }
}

Background.propTypes = {
  color: PropTypes.string
};

Background.defaultProps = {
  color: "#2765ac"
};
