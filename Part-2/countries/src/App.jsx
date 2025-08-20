import { useState, useEffect } from "react";
// import "./App.css";
import axios from "axios";

function App() {
  const [entry, setEntry] = useState("");
  const [country, setCountry] = useState([]);
  const [newCountry, setNewCountry] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setCountry(response.data);
        console.log(response.data);
      });
  }, []);

  //Save value to "entry" and use it to filter "country"
  const handleEntry = (e) => {
    const value = e.target.value;
    setEntry(value);

    if (value) {
      const sortCountries = country.filter((item) =>
        item.name.common.toLowerCase().includes(value.toLowerCase())
      );

      setNewCountry(sortCountries);
    } else setNewCountry([]);
  };

  return (
    <>
      <p>Search Countries</p>
      <input onChange={handleEntry} />
      <Display parts={newCountry} />
      {/* {newCountry.length === 1 ? <Info details={newCountry.map((item) => item)} /> : } */}
    </>
  );
}

const Display = ({ parts }) => {
  if (parts.length > 10) {
    return <Part name={"Too many matches, specify another filter!"} />;
  } else if (parts.length > 1 && parts.length <= 10) {
    return (
      <>
        {parts.map((item) => (
          <Part name={item.name.common} />
        ))}
      </>
    );
  } else if (parts.length === 1) {
    // return <Info name={parts.name} />;
    return (
      <>
        {parts.map((item) => (
          <Info
            name={item.name.common}
            capital={item.capital[0]}
            area={item.area}
            language={Object.values(item.languages)}
            flag={item.flags.svg}
          />
        ))}
      </>
    );
  }
};

const Part = ({ name }) => {
  return <p>{name}</p>;
};

const Info = ({ name, capital, area, language, flag }) => {
  console.log(name, capital, area, language, flag);
  return (
    <>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h2>Languages</h2>
      <>
        {language.map((item) => (
          <ul>
            <li>{item}</li>
          </ul>
        ))}
      </>
      <img src={flag} alt={`The flag of ${name}`} width="270px" />
    </>
  );
};

export default App;
