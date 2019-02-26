import React from "react";
import Info from "./components/Info";
import Weather from "./components/Weather";
import Form from "./components/Form";


const API_KEY = "64237467862233ead9212588fc1db7c1";

class App extends React.Component{

  state = {
    temp:undefined,
    city:undefined,
    country:undefined,
    pressure:undefined,
    sunset:undefined,
    error:undefined,
  }
  gettingWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;

    if (city) {
      const API_URL= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${API_KEY}`);
      const data = await API_URL.json();

      var sunset = data.sys.sunset;
      var date = new Date();
      date.setTime(sunset);
      var sunset_data = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

      this.setState({
        temp: data.main.temp,
        city: data.name,
        country: data.sys.country,
        pressure: data.main.pressure,
        sunset: sunset_data,
        error:undefined
      });
    } else {
      this.setState({
        temp:undefined,
        city:undefined,
        country:undefined,
        pressure:undefined,
        sunset:undefined,
        error:"Enter city please!"
      });
    }
  }

  render(){
    return(
    <div className='wrapper'>
    <div className='main'>
        <div className='container'>
          <div className='row'>
            <div className="col-sm-5 info">
              <Info />
            </div>
            <div  className="col-sm-7 form">
              <Form weatherMethod={this.gettingWeather}  />
              <Weather
                temp={this.state.temp}
                city={this.state.city}
                country={this.state.country}
                pressure={this.state.pressure}
                sunset={this.state.sunset}
                error={this.state.error}
               />
             </div>
          </div>
        </div>
    </div>
  </div>
    );
  }
}

export default App;
