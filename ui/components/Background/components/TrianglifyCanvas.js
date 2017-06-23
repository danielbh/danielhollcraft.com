/**
 * Created by danielhollcraft on 6/21/17.
 * Modified from: https://github.com/qrohlf/trianglify/blob/gh-pages-src/js/components/TrianglifyCanvas.jsx
 */
import ReactDOM from 'react-dom'
import React from 'react'
import Trianglify from 'trianglify';

export default class TrianglifyCanvas extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.renderCanvas();
  }

  shouldComponentUpdate(nextProps, nextState) {
    for(var key in nextProps) {
      if (this.props[key] !== nextProps[key]) {
        return true;
      }
    }
    return false;
  }

  componentDidUpdate() {
    this.renderCanvas();
  }

  renderCanvas() {
    let canvas = ReactDOM.findDOMNode(this);
    Trianglify(this.props).canvas(canvas);
  }

  render() {
    return <canvas />;
  }
}

TrianglifyCanvas.defaultProps = {
  ...Trianglify.defaults
};