import React, {Component} from 'react';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: props.countFrom,
    };
  }

  componentDidMount() {
    console.log('mounted');
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
  }

  toggleClock = () => {
    this.setState(state => ({
      showClock: !state.showClock
    }));
  }

  render() {
    return <span>{this.state.timeLeft}</span>
  }
}

export default Countdown;