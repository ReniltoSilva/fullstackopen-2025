import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

// const toggleImportance = (id) => {
//     // store.dispatch({
//     //   type: "TOGGLE_IMPORTANCE",
//     //   payload: { id },
//     // });

//     /* We simply call the action creator here*/
//     dispatch(toggleImportanceOf(id));
//   };

/* This component is called presentational component,
more concerned with the look of the UI, receives data and callbacks
exclusively via props from their parent component, and
rarely manage their own state. */
const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong> {note.important ? "important" : ""}</strong>
    </li>
  );
};

const Notes = () => {
  const dispatch = useDispatch();

  const notes = useSelector((state) => state);

  (console.log(notes), "from Notes component");
  return (
    <ul>
      {notes.map((note) => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

export default Notes;
