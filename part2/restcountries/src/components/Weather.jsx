import axios from 'axios';
import { useEffect, useState } from 'react';

const Weather = ({ country }) => {
  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  const [weather, setWeather] = useState(null);

  const capital = country.capital ? country.capital : null;
  const latlng = country.capitalInfo?.latlng;
  console.log(latlng);

  useEffect(() => {
    if (!latlng || latlng.length < 2) return;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=${API_KEY}`,
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [latlng]);

  if (!latlng) return <p>Weather data not available for this country</p>;

  if (!weather) return <p>Loading weather data...</p>;

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>Temperature: {weather.main.temp} Celsius</p>
      <img src={iconUrl} alt={weather.weather[0].description} />
      <p>Wind: {weather.wind.speed} m/s</p>
    </>
  );
};

export default Weather;
