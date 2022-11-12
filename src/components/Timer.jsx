import React, { Component } from "react";

class Timer extends Component {
  constructor(props) {
    super(props);

    const saved = localStorage.getItem("autostart");
    const currAutostart = saved ? JSON.parse(saved) : false;

    this.state = {
      time: props.time,
      step: props.step,
      autostart: currAutostart,
      progressBar: props.progressBar,
      pause: true,
      onTick: props.onTick,
      onTimeStart: props.onTimeStart,
      onTimePause: props.onTimePause,
      onTimeEnd: props.onTimeEnd,
    };
  }
  componentDidMount() {
    const { autostart } = this.state;
    if (autostart) {
      this.timerOn();
    }
  }

  componentWillUnmount() {}

  autostartSwitch = (e) => {
    this.setState({ autostart: e.target.checked }, () => {
      // console.log(this.state.autostart);
      this.currAutostart = this.state.autostart;
      localStorage.setItem("autostart", JSON.stringify(this.state.autostart));
    });
  };

  timerOn = () => {
    this.pause = !this.pause;
    let interval;

    if (this.state.step === 1 || this.state.step < 0) {
      this.setState({
        step: this.props.step,
        progressBar: this.props.progressBar,
        time: this.props.time,
      });
    }

    if (this.pause) {
      this.state.onTimeStart();
      this.interval = setInterval(() => {
        const { step, progressBar, time } = this.state;

        if (this.state.step === 1 || this.state.step < 0) {
          clearInterval(this.interval);
          this.state.onTimeEnd();
        }

        this.setState({
          step: step - 1,
          progressBar: progressBar - progressBar / step,
          time: time - 1,
        });
        document.querySelector(".progress").style.width = `${
          progressBar - progressBar / step
        }px `;
      }, 1000);
    } else {
      this.state.onTimePause();
      clearInterval(this.interval);
    }
  };

  componentDidUpdate() {
    this.state.onTick(this.state.time);
  }

  render() {
    let { step, autostart } = this.state;
    return (
      <div className="wrapper">
        <div className="container">
          <label htmlFor="autostart">
            автострарт
            <input
              type="checkbox"
              checked={autostart}
              onChange={(e) => this.autostartSwitch(e)}
            />
          </label>

          <div className="timer">
            {step
              ? (step - (step %= 60)) / 60 + (9 < step ? ":" : ":0") + step
              : "0.00"}
          </div>

          <div className="progress__container">
            <div className="progress"></div>
          </div>

          <button className="btn__timer" onClick={this.timerOn}>
            start/pause
          </button>
        </div>
      </div>
    );
  }
}

export default Timer;
