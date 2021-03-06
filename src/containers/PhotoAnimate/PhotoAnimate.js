import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import inside from 'point-in-polygon';
import Random from 'random-js';
import path from './path.json';

import './PhotoAnimate.less';

export default class PhotoAnimate extends Component {

  config = {
    maxSeeds: 400,
    randomMaxX: 400,
    randomMaxY: 620,
  }

  nowLeftSeeds = 0
  nowRightSeeds = 0

  state = {
    leftPhotos: [],
    rightPhotos: []
  }

  createPhoto = (pathPoints) => {
    let x1 = 0; let y1 = 0; let x2 = 0; let y2 = 0;
    const uuid = Random.uuid4(Random.engines.nativeMath);
    while (!inside([x1, y1], pathPoints)) {
      x1 = Random.integer(0, this.config.randomMaxX)(Random.engines.nativeMath);
      y1 = Random.integer(0, this.config.randomMaxY)(Random.engines.nativeMath);
    }
    x2 = Random.integer(-300, 500)(Random.engines.nativeMath);
    y2 = Random.integer(-300, 700)(Random.engines.nativeMath);
    const transitionStyle = {
      entering: { transform: `translate(${x2}px, ${y2}px)`, opacity: 0 },
      entered: { transform: `translate(${x1}px, ${y1}px)`, opacity: 1 },
      exiting: { opacity: 1 },
      edited: { opacity: 0 }
    };
    return (
      <Transition timeout={10} key={uuid}>
        {state => <img className="photo" style={transitionStyle[state]} alt="goodimg" src="http://fakeimg.pl/40" />}
      </Transition>
    );
  }


  generateLeftPhoto = () => {
    const photo = this.createPhoto(path.pathLeft);
    this.nowLeftSeeds += 1;
    this.setState({
      leftPhotos: [...this.state.leftPhotos, photo],
    });
    if (this.nowLeftSeeds > this.config.maxSeeds) {
      clearInterval(this.leftInterval);
    }
  }

  generateRightPhoto = () => {
    const photo = this.createPhoto(path.pathRight);
    this.nowRightSeeds += 1;
    this.setState({
      rightPhotos: [...this.state.rightPhotos, photo],
    });
    if (this.nowRightSeeds > this.config.maxSeeds) {
      clearInterval(this.rightInterval);
    }
  }

  componentDidMount() {
    this.leftInterval = setInterval(this.generateLeftPhoto, 30);
    this.rightInterval = setInterval(this.generateRightPhoto, 35);
  }

  render() {
    return (
      <div id="photoAnimate">
        <div id="container">
          <div id="leftSide">
            <TransitionGroup>
              {this.state.leftPhotos}
            </TransitionGroup>
          </div>
          <div id="rightSide">
            <TransitionGroup>
              {this.state.rightPhotos}
            </TransitionGroup>
          </div>
        </div>
      </div>
    );
  }
}
