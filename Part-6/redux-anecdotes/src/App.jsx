import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const anecdotes = useSelector((state) => state); /*useSelector to read data*/
  console.log(anecdotes, "from App.jsx");
  const dispatch = useDispatch(); /* useDispatch to send actions */

  const vote = (id) => {
    dispatch({ type: "INCREASE_COUNT", payload: { id } });
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

      <h2>create new</h2>

      <form>
        <div>
          <input />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default App;
