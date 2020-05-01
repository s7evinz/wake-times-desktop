import React, { Component } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Clock from './components/Clock';
import classNames from 'classnames';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timeList: [],
      menuActive: false,
      resetModal: false,
    };
    this.latestTime = 0;
  }

  handleReset = () => {
    this.setState(state => ({
      resetModal: !state.resetModal,
    }));
  }

  confirmReset = () => {
    this.setState({
      timeList: [],
      menuActive: false,
      resetModal: false,
    });
    this.latestTime = 0;
  }

  // mobile hamburger
  handleMenu = () => {
    this.setState(state => ({
      menuActive: !state.menuActive
    }));
  }

  reportTime = () => {
    const date = new Date();
    const timeStr = date.toLocaleTimeString([], { timeStyle: 'short' });

    // https://usefulangle.com/post/98/javascript-text-to-speech
    // Google 'javascript text to speech'
    const synth = window.speechSynthesis;
    const utter = new SpeechSynthesisUtterance();
    utter.text = timeStr;
    console.log(timeStr);
    synth.speak(utter);
  }

  addTime = () => {
    const date = new Date();
    const time = date.getTime();
    const timeDiff = time - this.latestTime;

    // only add if time diff is greater than the specified milliseconds
    if (timeDiff > 55000) {
      this.latestTime = time;
      const timeStr = date.toLocaleTimeString();
      const timeList = this.state.timeList.concat([timeStr]);

      
      this.setState({
        timeList: timeList
      });

      const audio = new Audio('sound/pin-drop.mp3');
      audio.play();
      // const synth = window.speechSynthesis;
      // const utter = new SpeechSynthesisUtterance();
      // utter.text = 'Time recorded.';
      // synth.speak(utter);
    }
  }

  render() {
    const {
      timeList,
      menuActive,
      resetModal,
    } = this.state;

    return (
      <div className="App">
        <Navbar
          menuActive={menuActive}
          onMenuClick={this.handleMenu}
          onReset={this.handleReset}
          isEmpty={!timeList.length}
        />
        <TapArea 
          timeList={timeList} 
          addTime={this.addTime} 
          reportTime={this.reportTime}
        />
        <ResetModal
          isActive={resetModal}
          onCancel={this.handleReset}
          onConfirm={this.confirmReset}
        />
      </div>
    );
  }
}

class TapArea extends Component {
  constructor(props) {
    super(props);
    this.clickCount = 0;
  }

  resetClickCount() {
    this.clickCount = 0;
  }

  handleDoubleClick = (e) => {
    e.preventDefault();
    this.clickCount++;
    this.props.addTime();
    
    if (this.clickCount === 2) {
      this.props.reportTime();
    }

    setTimeout(() => {
      this.resetClickCount();
    }, 420);
  }

  render() {

    return (
      <div className="app-content">
        {/* <div onClick={this.props.addTime} className="app-tap-area"> */}
        <div onMouseUp={this.handleDoubleClick} className="app-tap-area">
          <Clock />
          <TimeList timeList={this.props.timeList} />
        </div>
      </div>
    );
  }
}

function TimeList(props) {
  const {
    timeList,
  } = props;
  
  return (
    <div className="content">
      <ul className="app-warm-text">
        {timeList.map((timeStr, i) => {
          return <li key={i}>{timeStr}</li>
        })}
      </ul>
    </div>
  );
}

function ResetModal(props) {
  const modalClasses = classNames({
    'modal': true,
    'is-active': props.isActive,
  });
  
  return (
    <div className={modalClasses}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title app-warm-text">Confirm Reset</p>
          <button className="delete" aria-label="close" onClick={props.onCancel}></button>
        </header>
        <section className="modal-card-body">
          Are you sure to clear the time list?
        </section>
        <footer className="modal-card-foot">
          <button className="button is-danger" onClick={props.onConfirm}>Sure</button>
          <button className="button" onClick={props.onCancel}>Cancel</button>
        </footer>
      </div>
    </div>
  );
}

export default App;
