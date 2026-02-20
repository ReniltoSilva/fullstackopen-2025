import { useSelector, useDispatch } from "react-redux";
import { createList } from "../reducers/anecdoteReducer";
import { createNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((reduce) => {
    return reduce.anecdote.filter((item) =>
      item.content.includes(reduce.filter),
    );
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(createNotification(`You voted for: ${anecdote.content}`));
    dispatch(createList(anecdote.id));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
