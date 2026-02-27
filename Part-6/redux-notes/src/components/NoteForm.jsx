import { useDispatch } from "react-redux";

import { appendNote } from "../reducers/noteReducer";

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote = async (event) => {
    event.preventDefault();
    const content = event.target.note.value;
    event.target.note.value = "";

    // const newNote = await noteService.createNew(content);
    /* We simply call the action creator here*/
    // dispatch(createNote(newNote));
    dispatch(appendNote(content));
  };

  return (
    <>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">Add</button>
      </form>
    </>
  );
};

export default NoteForm;
