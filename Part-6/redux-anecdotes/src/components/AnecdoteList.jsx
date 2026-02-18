import { useSelector, useDispatch } from "react-redux";
import { createList } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((reduce) => {
    return reduce.anecdote.filter((item) =>
      item.content.includes(reduce.filter),
    );
  });
  const dispatch = useDispatch();

  const vote = (id) => {
    dispatch(createList(id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
