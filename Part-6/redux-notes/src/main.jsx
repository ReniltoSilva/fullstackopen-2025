import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import { createStore, combineReducers } from "redux";

import App from "./App";
import store from "./store";

/* Now this was moved to it's own file  store.js */
// import { configureStore } from "@reduxjs/toolkit";
// import filterReducer from "./reducers/filterReducer";
// import noteReducer from "./reducers/noteReducer";

/* BY using 'configureStore' 
we don't need toe combineReducer function
to create the store's reducer */
// const reducer = combineReducers({
//   notes: noteReducer,
//   filter: filterReducer,
// });

/* This was replaced by 'configureStore' below */
// const store = createStore(reducer);

/* Now this was moved to it's own file  store.js */
// const store = configureStore({
//   reducer: {
//     notes: noteReducer,
//     filter: filterReducer,
//   },
// });

// console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
