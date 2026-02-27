import { useSelector, useDispatch } from "react-redux";
import { createList } from "../reducers/anecdoteReducer";
import { setNotificationWithTimeout } from "../helper_func/setNotificationWithTimeout";

import { increaseVote } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((reduce) => {
    return reduce.anecdote.filter((item) =>
      item.content.includes(reduce.filter),
    );
  });
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(increaseVote(anecdote.id));
    dispatch(createList(anecdote.id));

    // dispatch(createDisplayNotification(`You voted for: ${anecdote.content}`));
    // setTimeout(() => {
    //   dispatch(clearNotification());
    // }, 5000);

    setNotificationWithTimeout(dispatch, `You voted for: ${anecdote.content}`);
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
