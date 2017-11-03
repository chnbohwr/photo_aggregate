import React, { Component } from 'react';
import path from './path.json';
import './PhotoAnimate.less';

export default class PhotoAnimate extends Component {
  state = {
    ...path
  }
  componentDidMount() {

  }
  render() {
    return (
      <div id="photoAnimate">
        <div id="container">
          <div id="leftSide"></div>
          <div id="rightSide"></div>
        </div>
      </div>
    );
  }
}
