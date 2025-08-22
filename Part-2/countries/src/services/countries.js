import axios from "axios";

const weatherAPI = import.meta.env.VITE_SOME_API_KEY;

//Fetch all countries API
const getAllCountries = () => {
  const request = axios.get(
    "https://studies.cs.helsinki.fi/restcountries/api/all"
  );

  return request.then((response) => response.data);
};

//Fetch weather API
const getWeather = (name) => {
  const request = axios.get(
    `http://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${name}&aqi=no`
  );

  return request.then((res) => res);
};

export default { getWeather, getAllCountries };
