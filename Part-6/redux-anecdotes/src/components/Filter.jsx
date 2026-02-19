import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    const content = e.target.value;
    dispatch(filterChange(content));
  };

  return (
    <>
      <form>
        <label>
          Filter
          <input name="filter" onChange={handleChange} />
        </label>
      </form>
    </>
  );
};

export default Filter;
