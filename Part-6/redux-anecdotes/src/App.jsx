import { useSelector, useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

import { useEffect } from "react";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  /*These are now moved away, they are being used
  inside component when they are required */
  // const anecdotes = useSelector((state) => state); /*useSelector to read data*/
  // const dispatch = useDispatch(); /* useDispatch to send actions */

  // const vote = (id) => {
  //   dispatch({ type: "INCREASE_COUNT", payload: { id } });
  // };

  /*------------------------------------------------------------
  This function was sent to AnecdoteForm.jsx component 

  // const addAnedocte = (e) => {
  //   e.preventDefault();
  //   // console.log(e.target.anecdote.value);
  //   const content = e.target.anecdote.value;
  //   dispatch({ type: "ADD_ANECDOTE", payload: { content } });

  //   e.target.anecdote.value = "";
  // };

---------------------------------------------------------------*/

  const dispatch = useDispatch();

  useEffect(() => {
    // anecdotesService
    //   .getAll()
    //   .then((anecdotes) => dispatch(setAnecdotes(anecdotes)));
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      {/* 
      This was extracted into its own component <AnecdoteList />
      
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))} */}
      {/* 
      This was extracted into its own component <AnecdoteForm />
      
      <h2>create new</h2>
      <form onSubmit={addAnedocte}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form> 
      */}
      <Notification />
      <Filter />
      <br />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
