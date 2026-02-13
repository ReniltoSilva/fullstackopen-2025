import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";

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
      <Notes />
    </div>
  );
};

export default App;
