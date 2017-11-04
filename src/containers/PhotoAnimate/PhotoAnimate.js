import React, { Component } from 'react';
import { Transition, TransitionGroup } from 'react-transition-group';
import inside from 'point-in-polygon';
import Random from 'random-js';
import path from './path.json';

import './PhotoAnimate.less';

export default class PhotoAnimate extends Component {

  config = {
    seeds: 200,
    randomMaxX: 400,
    randomMaxY: 620,
  }

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
        {state => <img className="photo" style={transitionStyle[state]} alt="goodimg" src="http://fakeimg.pl/100" />}
      </Transition>
    );
  }


  qqq = () => {
    const photo = this.createPhoto(path.pathLeft);
    this.setState({
      leftPhotos: [...this.state.leftPhotos.slice(-200), photo],
    });
  }

  rrr = () => {
    const photo = this.createPhoto(path.pathRight);
    this.setState({
      rightPhotos: [...this.state.rightPhotos.slice(-200), photo],
    });
  }

  componentDidMount() {
    setInterval(this.qqq, 510);
    setInterval(this.rrr, 520);
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
