import { useEffect, useState } from "react";
import countryServices from "../services/countries";

const Weather = ({ name }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await countryServices.getWeather(name);
        setWeather(res.data);
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    };

    fetchWeather();
  }, [name]);

  if (!weather) {
    return <p>Loading weather...</p>;
  } else
    return (
      <>
        <h2>Weather in {name}</h2>
        <p>Temperature {weather.current.temp_c.toFixed(0)} °C</p>
        <img src={weather.current.condition.icon} />
        <p>Wind {weather.current.wind_kph} kph</p>
      </>
    );
};

export default Weather;
