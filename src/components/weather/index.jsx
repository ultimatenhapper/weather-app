import React, { useEffect, useState } from "react";
import Search from "../search";

function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState([]);

  const fetchWeatherData = async (params) => {
    try {
      setLoading(true);

      if (!process.env.REACT_APP_OPENWEATHER_API_KEY) {
        throw new Error("OpenWeather API key is not defined.");
      }
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
      );

      const data = await response.json();
      if (data) {
        setLoading(false);
        console.log(data);
        setWeatherData(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleSearch = () => {
    fetchWeatherData(search);
  };

  function kelvinACelsius(kelvin) {
    if (kelvin) return `${Math.floor(kelvin - 273.15)} °C`;
  }

  useEffect(() => {
    fetchWeatherData("Viveiro");
  }, []);

  const getCurrentDate = () => {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
        handleSearch={handleSearch}
      />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="city-name">
            <h2>
              {weatherData?.name}, <span>{weatherData?.sys?.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{getCurrentDate()}</span>
          </div>
          <div className="temperature">
            {kelvinACelsius(weatherData?.main?.temp)}
          </div>
          <p className="description">
            {weatherData && weatherData.weather && weatherData.weather[0]
              ? weatherData.weather[0].description
              : ""}
          </p>
          <div className="weather-info">
            <div className="column">
              <div>
                <p className="wind">{weatherData?.wind?.speed}</p>
                <p>Wind speed</p>
              </div>
            </div>
            <div className="column">
              <div>
                <p className="humidity">{weatherData?.main?.humidity}%</p>
                <p>Humidity</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;
