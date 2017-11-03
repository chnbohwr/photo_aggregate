import React, { Component } from 'react';
import inside from 'point-in-polygon';
import './PointMaker.less';

export default class PointMaker extends Component {

  state = {
    pathPoints: [],
    pointInArea: false,
    minX: 99999,
    minY: 99999,
  }

  clickArea = (e) => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;
    if (x < this.state.minX) {
      this.setState({ minX: x });
    }
    if (y < this.state.minY) {
      this.setState({ minY: y });
    }
    const pathPoints = [...this.state.pathPoints, [x, y]];
    const pointInArea = inside(this.state.resultPoints, this.state.pathPoints);
    this.setState({
      pathPoints,
      pointInArea
    });
  }

  clear = () => {
    this.setState({ pathPoints: [], resultPoints: [] });
  }

  get transformPath() {
    return this.state.pathPoints.map(pointArr => [pointArr[0] - this.state.minX, pointArr[1] - this.state.minY]);
  }

  render() {
    return (
      [
        <div id="pointMaker" onClick={this.clickArea} >
          {
            this.state.pathPoints.map((position, index) => <div key={index} className="position" style={{ top: position[1], left: position[0] }} />)
          }
        </div>,
        <button onClick={this.clear}> clear button</button>,
        <div>{JSON.stringify(this.transformPath)}</div>
      ]
    );
  }
}
