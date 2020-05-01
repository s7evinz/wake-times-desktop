import React, {Component} from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      showClock: false,
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  toggleClock = () => {
    this.setState(state => ({
      showClock: !state.showClock
    }));
  }

  render() {
    // const clockFace = (
    //   <span className="is-size-2 app-clock-face">
    //     {this.state.date.toLocaleTimeString()}
    //   </span>
    // );
    // const showButton = (
    //   <div className="app-show-time-btn">
    //     <button className="button is-medium app-warm-text">
    //       Show Time
    //     </button>
    //   </div>
    // );
    // const clockContent = this.state.showClock ? clockFace : showButton;
    
    return (
      <div className="app-clock has-text-centered">
        <h2 className="is-size-4 app-warm-text">
          {this.state.date.toLocaleTimeString()}
        </h2>
      </div>
    );
  }
}

export default Clock;