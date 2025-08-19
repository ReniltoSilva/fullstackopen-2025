const Filter = ({ text, filterPerson }) => {
  // console.log({ text, filterPerson });
  return (
    <>
      <p>Filter shown with</p>
      <input type={text} onChange={filterPerson} />
    </>
  );
};

export default Filter;
