import { useState, useEffect, useRef } from "react";

import noteServices from "./services/notes";
import loginServices from "./services/login";
import Note from "./components/Note";
import Footer from "./components/Footer";
import Togglable from "./components/Toggable";
import NoteForm from "./components/NoteForm";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";

const App = () => {
  // const [newNote, setNewNote] = useState(""); //Moved to NoteForm.jsx
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const noteFormRef = useRef();

  useEffect(() => {
    if (user === null) return;
    /* Here we use promisse because with async/await 
    we would have to create a function to use them,
    cause useEffect doesn't accept async/await - 'useEffect( async () => {...}' */
    noteServices.getAll().then((initialNotes) => setNotes(initialNotes));

    /* async/await function */
    // const getAllNotes = async () => {
    //   const response = await noteServices.getAll();
    //   setNotes(response);
    // };
    // getAllNotes();
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteServices.setToken(user.token);
    }
  }, []);

  const addNote = async (objFromNoteForm) => {
    await noteFormRef.current.toggleVisibility();

    /*3 - addNote is called from component file NoteForm.jsx with new obj,
    this obj will be sent to backend to the backend, then the new obj(note) 
    will be added to other notes.*/
    const response = await noteServices.create(objFromNoteForm);
    setNotes(notes.concat(response));

    /* With promises */
    // noteServices.create(objFromNoteForm).then((returnedNotes) => {
    //   console.log(returnedNotes);
    //   setNotes(notes.concat(returnedNotes));
    //   setNewNote("");
    // });
  };

  const toggleImportanceOf = (id) => {
    // id is being passed by each individual note when their button is pressed
    // const url = `http://localhost:3001/notes/${id}`; //This is one single note, not the entire lilst of notes
    const note = notes.find((n) => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteServices
      .update(id, changedNote)
      .then((returnedNotes) => {
        setNotes(notes.map((note) => (note.id === id ? returnedNotes : note)));
        console.log(returnedNotes);
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);

        setNotes(notes.filter((n) => n.id !== id));
      });
  };

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginServices.login({ username, password });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      noteServices.setToken(user.token);

      setUser(user);
    } catch {
      setErrorMessage("wrong credentials");

      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const loginForm = () => {
    return (
      <Togglable buttonLabel="Login">
        <LoginForm
          // username={username}
          // password={password}
          // handleUsernameChange={({ target }) => setUsername(target.value)}
          // handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    );

    /* Old form */
    // <form onSubmit={handleLogin}>
    //   <div>
    //     <label>
    //       username
    //       <input
    //         type="text"
    //         value={username} //What does this do and why?
    //         onChange={({ target }) => setUsername(target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label>
    //       password
    //       <input
    //         type="password"
    //         value={password}
    //         onChange={({ target }) => setPassword(target.value)}
    //       />
    //     </label>
    //   </div>
    //   <button type="submit">login</button>
    // </form>
  };

  const logout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
    setNotes([]);
  };

  // const noteForm = () => (
  // <form onSubmit={addNote}>
  //   <input value={newNote} onChange={handleNoteChange} />
  //   <button type="submit">save</button>
  // </form>

  // <Togglable buttonLabel="New note">
  //   <NoteForm
  //     // onSubmit={addNote}
  //     // value={newNote}
  //     handleChange={addNote}
  //   />
  // </Togglable>
  // );

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />

      {/* If !user doesn't exist true, returns loginForm(). 
      If it's false, the whole operation becomes falsy 
      and returns nothing*/}
      {/* If first condition is true, returns the result
      of the second component*/}
      {!user && loginForm()}
      {user && (
        <div>
          <p style={{ fontSize: "18px" }}>Welcome, {user.name}!</p>
          <Togglable buttonLabel="New note" ref={noteFormRef}>
            {/*1 - Passing addNote() to component to be called from component*/}
            <NoteForm createNote={addNote} />
          </Togglable>
          <button onClick={logout}>Log out</button>
        </div>
      )}

      {/* <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">login</button>
      </form> */}

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "Important" : "all"}
        </button>
      </div>

      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        ))}
      </ul>

      {/* <form onSubmit={addNote}> */}
      {/* <input value={newNote} onChange={handleNoteChange} /> */}
      {/* <button type="submit">save</button> */}
      {/* </form> */}

      <Footer />
    </div>
  );
};

export default App;
