import * as React from 'react';
import * as ReactDom from 'react-dom';
import Ring from './ring';
import { getEventPosition } from './utils/canvas';

export default class RadialBarChart extends React.Component {

  componentDidMount() {
    this.ctx = this.canvas.getContext('2d');
    this.canvas.addEventListener('mousemove', this.onMove);
    this.canvas.addEventListener('click', this.onClick);
    this.ring = new Ring({
      width: 600,
      height: 360,
      list: [
        { name: '问题1', percent: 0.85 },
        { name: '问题2', percent: 0.5 },
        { name: '问题3', percent: 0.5 },
        { name: '问题4', percent: 0.4 },
        { name: '问题5', percent: 0.3 },
        { name: '问题6', percent: 0.2 },
      ],
    });
    this.ring.drawInit(this.ctx);
    window.addEventListener('resize', this.resize);
    this.resize();
  }

  componentWillUnmount() {
    this.canvas.removeEventListener('mousemove', this.onMove, false);
    this.canvas.removeEventListener('click', this.onClick, false);
    window.removeEventListener('resize', this.resize, false);
  }

  onClick = (e) => {
    const { onClick } = this.props;
    const ringInfo = this.ring.updateRing({ event: 'onClick', eventPosition: getEventPosition(e) }, this.ctx);
    if (onClick && ringInfo) onClick(e, ringInfo);
  }

  onMove = (e) => {
    const { onHover } = this.props;
    const ringInfo = this.ring.updateRing({ event: 'onMove', eventPosition: getEventPosition(e) }, this.ctx);
    if (onHover && ringInfo) onHover(e, ringInfo);
  }

  resize = () => {
    const $parentNode = ReactDom.findDOMNode(this).parentNode;
    this.canvas.width = $parentNode.clientWidth;
    this.canvas.height = $parentNode.clientHeight;
    this.ring.updateRing({ width: $parentNode.clientWidth, height: $parentNode.clientHeight }, this.ctx);
  }

  render() {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%', display: 'inline-block' }}>
        <canvas ref={(canvas) => { this.canvas = canvas; }}/>
      </div>
    );
  }
}
