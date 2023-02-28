import React, {Component} from "react";
import "./App.css";
import CityList from "./components/CityList";
import WeatherDetails from "./components/WeatherDetails";
import logo from './assests/icons8-sun-behind-cloud-48.png';
import HeaderFile from "./components/headerFile";
class App extends React.Component {
  state = {
    currentCityID: "kolkata,india",
    time: new Date()
  };

  onCitySelect = e => {
    this.setState({ currentCityID: e.target.value });
  };

  componentDidMount(){
    // this.update = setInterval(() => {
    //   this.setState({time:new Date()});
    // }, 1* 1000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.update)
  // }

  render() {
    return (
      <div className="App">
        <HeaderFile />
        <div style={{ margin: "50px auto" }}>
          <CityList
            currentCity={this.state.currentCity}
            onCitySelect={this.onCitySelect}
          />
        </div>
        <div style={{ margin: "50px auto" }}>
          <WeatherDetails currentCityID={this.state.currentCityID} />
        </div>
      </div>
    );
  }
}

export default App;
