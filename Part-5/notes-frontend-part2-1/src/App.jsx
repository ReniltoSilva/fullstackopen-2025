import { useState, useEffect } from "react";
import axios from "axios";
import noteServices from "./services/notes";
import loginServices from "./services/login";
import Note from "./components/Note";
import Footer from "./components/Footer";
import Notification from "./components/Notification";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    // axios.get("http://localhost:3001/notes").then((response) => {
    //   setNotes(response.data);
    // });

    noteServices.getAll().then((initialNotes) => setNotes(initialNotes));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteServices.setToken(user.token);
    }
  }, []);

  const addNote = (e) => {
    e.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      // id: String(notes.length + 1),
    };

    noteServices.create(noteObject).then((returnedNotes) => {
      setNotes(notes.concat(returnedNotes));
      setNewNote("");
    });

    // axios.post("http://localhost:3001/notes", noteObject).then((response) => {
    //   setNotes(notes.concat(response.data));
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

    // axios.put(url, changedNote).then((response) => {
    //   setNotes(notes.map((note) => (note.id === id ? response.data : note)));
    // });
    // console.log(`importance of ${id} needs to be toggled`);
  };

  const handleNoteChange = (e) => {
    setNewNote(e.target.value);
  };

  const notesToShow = showAll ? notes : notes.filter((note) => note.important);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginServices.login({ username, password });
      // console.log("USER INFO RETURNED", user);
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteServices.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch {
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username} //What does this do and why?
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
    </form>
  );

  const logout = () => {
    window.localStorage.removeItem("loggedNoteappUser");
    setUser(null);
    console.log("user logged out");
  };

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input value={newNote} onChange={handleNoteChange} />
      <button type="submit">save</button>
    </form>
  );

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
          <p>{user.name} logged in</p>
          {noteForm()}
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
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
      <Footer />
    </div>
  );
};

export default App;
