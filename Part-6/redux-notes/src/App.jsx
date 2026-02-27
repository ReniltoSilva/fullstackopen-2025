import { useEffect } from "react";
import { useDispatch } from "react-redux";

import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";
// import { setNotes } from "./reducers/noteReducer";
// import noteService from "./services/notes";
import { initializeNotes } from "./reducers/noteReducer";

// store.dispatch({
//   type: "NEW_NOTE",
//   payload: {
//     content: "the app state is in redux store",
//     important: true,
//     id: 1,
//   },
// });

// store.dispatch({
//   type: "NEW_NOTE",
//   payload: {
//     content: "state changes are made with actions",
//     important: false,
//     id: 2,
//   },
// });

// store.dispatch({
//   type: "TOGGLE_IMPORTANCE",
//   payload: {
//     id: 2,
//   },
// });

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // noteService.getAll().then((notes) => dispatch(setNotes(notes)));
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
