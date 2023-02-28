import React, { Component } from "react";
import './../App.css'
import logo from "../assests/gps-icon.svg"
class CityList extends React.Component {
  // state = {
  //   value:'kolkata'
  // }
  render() {
    // function handleSearch(e) {
    //   // here you can get the inputValue
    //    console.log(e)
    // }  
    // handleChange = (e) => {
    //   this.setState({ value: e.target.value });
    // };
    return (
      <div>
        {/* <select
          value={this.props.currentCity}
          onChange={this.props.onCitySelect}
        >
          <option value="1566083">Ho Chi Minh</option>
          <option value="1880252">Singapore</option>
          <option value="1735161">Kuala Lumpur</option>
          <option value="1850147">Tokyo</option>
          <option value="8131587">Athens</option>
        </select> */}
        {/* <input onKeyUp={this.props.onCitySelect} /> */}
        <div class="input-group flex-nowrap" >
          <input type="text" class="form-control" placeholder="Search City" aria-label="Username" aria-describedby="addon-wrapping" onBlur={this.props.onCitySelect}/>
          <span class="input-group-text" id="addon-wrapping" >
            Search
          </span>
          &nbsp;&nbsp;
          {/* <span class="input-group-text" id="addon-wrapping" >
            <img src={logo} width="25px" height="25px" color="blue"/>
          </span> */}
        </div>
      </div>
    );
  }
}

export default CityList;
