import { createNote } from "../reducers/noteReducer";
import { useDispatch } from "react-redux";

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote = (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";

    /* We simply call the action creator here*/
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">Add</button>
    </form>
  );
};

export default NoteForm;
