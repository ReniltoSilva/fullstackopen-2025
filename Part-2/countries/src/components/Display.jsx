import Part from "./Part";
import Info from "./Info";

//Display countries according to conditions
const Display = ({ parts, onSelected }) => {
  //If more than 10 countries
  if (parts.length > 10) {
    return <Part name={"Too many matches, specify another filter!"} />;

    //If between 2 and 10 countries
  } else if (parts.length > 1 && parts.length <= 10) {
    return (
      <>
        {parts.map((country) => (
          <Part
            name={country.name.common}
            details={country}
            onSelected={onSelected}
          />
        ))}
      </>
    );

    //If just one country
  } else if (parts.length === 1) {
    return (
      <>
        {parts.map((country) => (
          <Info
            name={country.name.common}
            capital={country.capital[0]}
            area={country.area}
            language={Object.values(country.languages)}
            flag={country.flags.svg}
          />
        ))}
      </>
    );
  }
};

export default Display;
