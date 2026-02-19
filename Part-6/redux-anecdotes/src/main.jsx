import ReactDOM from "react-dom/client";
// import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import App from "./App";
import store from "./store";

/* These were moved to store.js*/
// import anecdoteReducer from "./reducers/anecdoteReducer";
// import filterReducer from "./reducers/filterReducer";

/* This was moved to its own file store.js */
// const reducer = combineReducers({
//   filter: filterReducer,
//   anecdote: anecdoteReducer,
// });

// const store = createStore(anecdoteReducer);
/* Store was moved to its own file store.js */
// const store = createStore(reducer);

// console.log(store.getState());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
