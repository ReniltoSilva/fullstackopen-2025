import { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Display from "./components/Display";
import Info from "./components/Info";
import countryServices from "./services/countries";

function App() {
  const [entry, setEntry] = useState("");
  const [country, setCountry] = useState([]);
  const [newCountry, setNewCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  //Fetch Country API
  useEffect(() => {
    countryServices.getAllCountries().then((response) => {
      console.log(response);
      setCountry(response);
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
    setSelectedCountry(null);
  };

  return (
    <>
      <h3>Search Countries</h3>
      <input onChange={handleEntry} />

      <Display parts={newCountry} onSelected={setSelectedCountry} />

      {selectedCountry ? (
        <Info
          name={selectedCountry.name.common}
          capital={selectedCountry.capital?.[0]}
          area={selectedCountry.area}
          language={Object.values(selectedCountry.languages || {})}
          flag={selectedCountry.flags.svg}
        />
      ) : null}

      {newCountry.length === 1 ? (
        <Weather name={newCountry.map((item) => item.name.common).join()} />
      ) : null}
    </>
  );
}

export default App;
