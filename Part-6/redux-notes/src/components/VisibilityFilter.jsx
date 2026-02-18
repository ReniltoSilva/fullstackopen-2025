import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <label>
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange("ALL"))}
        />
        all
      </label>

      <label>
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange("IMPORTANT"))}
        />
        important
      </label>

      <label>
        <input
          type="radio"
          name="filter"
          onChange={() => dispatch(filterChange("NONIMPORTANT"))}
        />
        nonimportant
      </label>
    </div>
  );
};

export default VisibilityFilter;
