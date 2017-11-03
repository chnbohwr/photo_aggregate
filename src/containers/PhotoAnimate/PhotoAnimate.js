import React, { Component } from 'react';
import Transition from 'react-transition-group/Transition';
import inside from 'point-in-polygon';
import path from './path.json';

import './PhotoAnimate.less';

export default class PhotoAnimate extends Component {

  config = {
    seeds: 200,
    randomMaxX: 400,
    randomMaxY: 620,
  }

  constructor() {
    super();
    this.state = {
      leftPhotos: Array.from(new Array(this.config.seeds)).map(() => this.generatePosition(path.pathLeft)),
      rightPhotos: Array.from(new Array(this.config.seeds)).map(() => this.generatePosition(path.pathRight)),
    };
  }


  generatePosition = (pathPoints) => {
    let x = 0;
    let y = 0;
    while (!inside([x, y], pathPoints)) {
      x = Math.floor(Math.random() * this.config.randomMaxX);
      y = Math.floor(Math.random() * this.config.randomMaxY);
    }
    return <img className="photo" alt="goodimg" src="http://fakeimg.pl/100" style={{ transform: `translate(${x}px, ${y}px)` }} />;
  }

  render() {
    return (
      <div id="photoAnimate">
        <div id="container">
          <div id="leftSide">
            {this.state.leftPhotos}
          </div>
          <div id="rightSide">
            {this.state.rightPhotos}
          </div>
        </div>
      </div>
    );
  }
}
