import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import VisibilityFilter from "./components/VisibilityFilter";

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
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  );
};

export default App;
