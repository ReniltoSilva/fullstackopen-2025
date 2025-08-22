//Child component of Display
const Part = ({ name, onSelected, details }) => {
  return (
    <p>
      {name}{" "}
      {name.includes("Too many") ? null : (
        <button onClick={() => onSelected(details)}>Show</button>
      )}
    </p>
  );
};

export default Part;
