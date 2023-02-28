import React, { Component } from "react";
import axios from "axios";
import Moment from "react-moment";
import image from '../assests/earth.svg'

const weather_api_key = "5d2d6cb3ae56318ea2467e70a93bba70";

class WeatherDetails extends Component {
  state = {
    weatherData: null,
    time: new Date(),
    windDirection:null,
    myLocation : {
      set : false,
      latitude : 0,
      longitude : 0
    }
  };
  constructor() {
    super();
    // this.state = {time: new Date()}
  }

  setWeatherData = data => {
    this.setState({ weatherData: data });
  };

  componentDidMount() {
    // lat={lat}&lon={lon}
    // axios
    //   .post(
    //     `https://api.openweathermap.org/data/2.5/weather?q=${this.props.currentCityID
    //     }&appid=${weather_api_key}&units=metric`
    //   )
    //   .then(res => {
    //     const windDirectionIndex = Math.round((res.data.wind.deg - 11.25) / 22.5);
    //     const windNames = [
    //       'North', 'North Northeast', 'Northeast', 'East Northeast', 'East',
    //       'East Southeast', 'Southeast', 'South Southeast', 'South', 'South Southwest',
    //       'Southwest', 'West Southwest', 'West', 'West Northwest', 'Northwest', 'North Northwest'
    //     ];
    //     this.setState({windDirection:windNames[windDirectionIndex - 1]})
    //     console.log(windNames[windDirectionIndex - 1],windDirectionIndex,res.data.wind.deg)
    //     this.setState({ weatherData: res.data });
    //   });

    this.update = setInterval(() => {
      this.setState({ time: new Date() });
    }, 1 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.update)
  }

  componentWillReceiveProps(nextProps) {
    axios
      .post(
        `https://api.openweathermap.org/data/2.5/weather?q=${nextProps.currentCityID
        }&appid=${weather_api_key}&units=metric`
      )
      .then(res => {
        const windDirectionIndex = Math.round((res.data.wind.deg - 11.25) / 22.5);
        const windNames = [
          'North', 'North Northeast', 'Northeast', 'East Northeast', 'East',
          'East Southeast', 'Southeast', 'South Southeast', 'South', 'South Southwest',
          'Southwest', 'West Southwest', 'West', 'West Northwest', 'Northwest', 'North Northwest'
        ];
        this.setState({windDirection:windNames[windDirectionIndex - 1]})
        console.log(windNames[windDirectionIndex - 1],windDirectionIndex,res.data.wind.deg)
        this.setState({ weatherData: res.data })
      });
  }
  
  
  //Loads in the background
  componentWillMount() {
    this.getLocation();
  }

  getLocation(){
    
    //get the built in location variable
    const geolocation = navigator.geolocation;

    //get the location
    geolocation.getCurrentPosition(
        //if success, this is called using the position as the data variable
        (position) => {
            console.log( position.coords.latitude );
            console.log( position.coords.longitude );

            //Set the myLocation variable with set to true, latittude, and longitude
            const newLocation = {
              set : true,
              latitude : position.coords.latitude,
              longitude : position.coords.longitude
            }
            this.setState({ myLocation : newLocation });
            this.getWeatherDetails(newLocation);
        }, 
        //if failure, this is called with error variable message printed
        (error) => {
            console.log( error.message );
        }
    );
  }
  getWeatherDetails(location){
  axios
  .post(
    `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${weather_api_key}&units=metric`
  )
  .then(res => {
    const windDirectionIndex = Math.round((res.data.wind.deg - 11.25) / 22.5);
    const windNames = [
      'North', 'North Northeast', 'Northeast', 'East Northeast', 'East',
      'East Southeast', 'Southeast', 'South Southeast', 'South', 'South Southwest',
      'Southwest', 'West Southwest', 'West', 'West Northwest', 'Northwest', 'North Northwest'
    ];
    this.setState({windDirection:windNames[windDirectionIndex - 1]})
    console.log(windNames[windDirectionIndex - 1],windDirectionIndex,res.data.wind.deg)
    this.setState({ weatherData: res.data });
  });

}

  render() {
    if (this.state.weatherData === null) {
      return (
        <div>
          <h1>Loading...</h1>
        </div>
      );
    }

    return (
      <div className="setPaddingCard">
        {/* <h1>
          Current Weather : {this.state.weatherData.main.temp} degree celcius !
        </h1> */}

        <div>
          <h4 className="_header">{this.state.weatherData.name}</h4>
          <div>
          </div>
          <div className="temperature">
            <span data-deg="°">{this.state.weatherData.main.temp} Celsius</span>
          </div>
          <div className="_last">
            <strong>last update at:</strong>
            <span><Moment unix format="DD/MM/YYYY hh:mm">{this.state.weatherData.dt}</Moment></span>
          </div>
          <div className="city-card__city-name" title="Washington">

            <div className="city-card__sky-state city-card__sky-state--city-name">
              {this.state.weatherData.description}
            </div>
          </div>
          <div className="city-card__info">
            <div className="info-list">
              <div className="info-list-item">
                <strong>Wind:</strong>
                <span >{this.state.windDirection}</span>
              </div>
              <div className="info-list-item">
                <strong>Wind speed:</strong> {this.state.weatherData.wind.speed} Mil/h
              </div>
              <div className="info-list-item">
                <strong>Humidity:</strong>
                <span >{this.state.weatherData.main.humidity}%</span>
              </div>
              <div className="info-list-item">
                <strong>Pressure:</strong> {this.state.weatherData.main.pressure} hPa
              </div>
            </div>
            <div className="info-list">
              <div className="info-list-item">
                <strong>Cloudiness:</strong> {this.state.weatherData.weather[0].main}
              </div>
              <div className="info-list-item">
                <strong>Sunrise:</strong> <Moment unix format="DD/MM/YYYY HH:MM">{this.state.weatherData.sys.sunrise}</Moment>
              </div>
              <div className="info-list-item">
                <strong>Sunset:</strong> <Moment unix format="DD/MM/YYYY HH:MM">{this.state.weatherData.sys.sunset}</Moment></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherDetails;
