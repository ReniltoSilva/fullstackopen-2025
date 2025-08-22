//Child component of Display
const Info = ({ name, capital, area, language, flag }) => {
  return (
    <>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area}</p>
      <h3>Languages</h3>
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

export default Info;
