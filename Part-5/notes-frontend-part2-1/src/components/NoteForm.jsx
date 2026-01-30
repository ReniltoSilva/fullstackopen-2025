import { useState } from "react";

const NoteForm = ({ createNote }) => {
  /*2 - NoteForm was called and will run the jsx, the value in form
    will be set to 'newNote' and 'addNote' will be called on
    submit. addNote will run and call createNote(which is addNote from App.jsx),
    passing an object as argument.*/
  const [newNote, setNewNote] = useState("");

  const addNote = (e) => {
    e.preventDefault();
    createNote({
      content: newNote,
      important: true,
    });

    /* With async/await */
    // const response = await noteServices.create(createNote);
    // setNotes(notes.concat(response));
    setNewNote("");

    /* With promises */
    // noteServices.create(noteObject).then((returnedNotes) => {
    //   console.log(returnedNotes);
    //   setNotes(notes.concat(returnedNotes));
    //   setNewNote("");
    // });
  };

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={addNote}>
        <label>
          content
          <input
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Write note content here"
            id="note-input"
          />
        </label>
        <button type="submit">save</button>

        {/* input field example for test*/}
        <input value={newNote} />
      </form>
    </div>
  );
};

export default NoteForm;
