import { createSlice } from "@reduxjs/toolkit";
import { current } from "@reduxjs/toolkit";
import noteService from "../services/notes";

// const initialState = [
//   {
//     content: "reducer defines how redux store works",
//     important: true,
//     id: 1,
//   },
//   {
//     content: "state of store can contain any data",
//     important: false,
//     id: 2,
//   },
// ];

// const generateId = () => Number((Math.random() * 1000000).toFixed(0));

// const noteReducer = (state = initialState, action) => {
//   console.log("ACTION: ", action);
//   switch (action.type) {
//     case "NEW_NOTE":
//       return [...state, action.payload];
//     case "TOGGLE_IMPORTANCE": {
//       const id = action.payload.id;
//       const noteToChange = state.find((n) => n.id === id);
//       const changedNote = {
//         ...noteToChange,
//         important: !noteToChange.important,
//       };
//       return state.map((note) => (note.id !== id ? note : changedNote));
//     }
//     default:
//       return state;
//   }
// };

// export const createNote = (content) => {
//   /* This is an action creator,
//   they go inside the functions */
//   return {
//     type: "NEW_NOTE",
//     payload: {
//       content,
//       important: false,
//       id: generateId(),
//     },
//   };
// };

// export const toggleImportanceOf = (id) => {
//   /* This is an action creator,
// they go inside the functions */
//   return {
//     type: "TOGGLE_IMPORTANCE",
//     payload: { id },
//   };
// };

// export default noteReducer;

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      // const content = action.payload;
      // state.push({
      //   content,
      //   important: false,
      //   id: generateId(),
      // });
      state.push(action.payload);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };

      // console.log(current(state));

      return state.map((note) => (note.id !== id ? note : changedNote));
    },
    setNotes(state, action) {
      return action.payload;
    },
  },
});

export const { createNote, toggleImportanceOf, setNotes } = noteSlice.actions;

/*Both "initializeNotes" and "appendNote" are 
actions creatores that we are using to abstract 
the backendend call away from the function components*/
export const initializeNotes = () => {
  /* "initializeNotes" is an action creator. If this action creator
returns a function, Redux allows us to automatically pass 
the "dispatch" and "getState" methods from redux's store as arguments
to the function, ex: "return async (dispatch)" */
  return async (dispatch) => {
    const notes = await noteService.getAll();
    dispatch(setNotes(notes));
  };
};

export const appendNote = (content) => {
  return async (dispatch) => {
    const newNote = await noteService.createNew(content);
    dispatch(createNote(newNote));
  };
};

export default noteSlice.reducer;
