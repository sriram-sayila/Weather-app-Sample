import React from "react";
import "../App.css";
import logo from '../assests/icons8-sun-behind-cloud-48.png'

class HeaderFile extends React.Component {
    state = {
        currentCityID: "kolkata,india",
        time: new Date()
      };
  componentDidMount(){
    this.update = setInterval(() => {
      this.setState({time:new Date()});
    }, 1* 1000);
  }

  componentWillUnmount() {
    clearInterval(this.update)
  }

  render() {
    return (
      <div >
        <div className="setHeader">
        <img src={logo} width="55px" height="55px"/>
        <h1>Weather Report</h1>
        <strong className="setTimerColor">{this.state.time.toLocaleTimeString()}</strong>
        </div>
        
      </div>
    );
  }
}

export default HeaderFile;
